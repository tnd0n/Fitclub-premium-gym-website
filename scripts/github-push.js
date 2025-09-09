#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.argv[2];
const REPO_NAME = process.argv[3];
const COMMIT_MESSAGE = process.argv[4] || 'Initial commit: FitClub Premium Website';

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

if (!GITHUB_USERNAME || !REPO_NAME) {
  console.error('❌ Usage: node github-push.js <username> <repository-name> [commit-message]');
  console.error('📝 Example: node github-push.js john-doe fitclub-premium-website');
  process.exit(1);
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const git = simpleGit();

async function createGitIgnore() {
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity
`;

  fs.writeFileSync('.gitignore', gitignoreContent);
  console.log('✅ Created .gitignore file');
}

async function createRepository() {
  try {
    console.log(`🔍 Checking if repository ${GITHUB_USERNAME}/${REPO_NAME} exists...`);
    
    try {
      await octokit.repos.get({
        owner: GITHUB_USERNAME,
        repo: REPO_NAME,
      });
      console.log(`✅ Repository ${GITHUB_USERNAME}/${REPO_NAME} already exists`);
      return `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`;
    } catch (error) {
      if (error.status === 404) {
        console.log(`📝 Creating new repository: ${REPO_NAME}...`);
        
        const response = await octokit.repos.createForAuthenticatedUser({
          name: REPO_NAME,
          description: 'FitClub Premium Fitness Website - Modern React + Express.js fitness platform with dark theme',
          private: false,
          auto_init: false,
        });
        
        console.log(`✅ Successfully created repository: ${response.data.html_url}`);
        return response.data.clone_url;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('❌ Error creating repository:', error.message);
    throw error;
  }
}

async function initializeGitAndPush(repoUrl) {
  try {
    console.log('🔧 Initializing Git repository...');
    
    // Check if .git exists
    if (!fs.existsSync('.git')) {
      await git.init();
      console.log('✅ Git repository initialized');
    } else {
      console.log('✅ Git repository already exists');
    }

    // Create .gitignore if it doesn't exist
    if (!fs.existsSync('.gitignore')) {
      await createGitIgnore();
    }

    // Configure Git user (using GitHub username)
    await git.addConfig('user.name', GITHUB_USERNAME);
    await git.addConfig('user.email', `${GITHUB_USERNAME}@users.noreply.github.com`);
    console.log('✅ Git user configured');

    // Add all files
    await git.add('.');
    console.log('✅ Added all files to Git');

    // Check if there are any changes to commit
    const status = await git.status();
    if (status.files.length === 0 && !status.created.length && !status.modified.length) {
      console.log('ℹ️ No changes to commit');
    } else {
      // Commit changes
      await git.commit(COMMIT_MESSAGE);
      console.log(`✅ Committed changes: "${COMMIT_MESSAGE}"`);
    }

    // Add remote origin (with token authentication)
    const authenticatedUrl = repoUrl.replace('https://github.com/', `https://${GITHUB_TOKEN}@github.com/`);
    
    try {
      await git.removeRemote('origin');
    } catch (e) {
      // Remote doesn't exist, which is fine
    }
    
    await git.addRemote('origin', authenticatedUrl);
    console.log('✅ Remote origin configured');

    // Push to GitHub
    console.log('🚀 Pushing to GitHub...');
    await git.push('origin', 'main', { '--set-upstream': null });
    console.log('✅ Successfully pushed to GitHub!');

    console.log(`\n🎉 Your FitClub website is now available at:`);
    console.log(`📍 Repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`);
    console.log(`🌐 GitHub Pages: https://${GITHUB_USERNAME}.github.io/${REPO_NAME} (if enabled)`);

  } catch (error) {
    console.error('❌ Error during Git operations:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting GitHub deployment for FitClub Premium Website...\n');
    
    const repoUrl = await createRepository();
    await initializeGitAndPush(repoUrl);
    
    console.log('\n✅ Deployment completed successfully!');
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main();