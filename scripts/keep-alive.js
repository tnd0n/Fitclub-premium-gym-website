#!/usr/bin/env node

import https from 'https';
import http from 'http';

// Configuration
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://your-app-name.onrender.com';
const PING_INTERVAL = parseInt(process.env.PING_INTERVAL) || 14; // minutes
const HEALTH_ENDPOINT = '/api/classes'; // Use existing API endpoint

function pingWebsite() {
  const url = new URL(WEBSITE_URL + HEALTH_ENDPOINT);
  const client = url.protocol === 'https:' ? https : http;
  
  const startTime = Date.now();
  
  const req = client.get(url, (res) => {
    const duration = Date.now() - startTime;
    const timestamp = new Date().toISOString();
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`✅ ${timestamp} - Ping successful (${res.statusCode}) - ${duration}ms`);
    } else {
      console.log(`⚠️ ${timestamp} - Ping returned ${res.statusCode} - ${duration}ms`);
    }
  });
  
  req.on('error', (err) => {
    const timestamp = new Date().toISOString();
    console.log(`❌ ${timestamp} - Ping failed: ${err.message}`);
  });
  
  req.setTimeout(30000, () => {
    req.destroy();
    const timestamp = new Date().toISOString();
    console.log(`⏰ ${timestamp} - Ping timeout after 30 seconds`);
  });
}

function startKeepAlive() {
  console.log(`🚀 Starting keep-alive for ${WEBSITE_URL}`);
  console.log(`📡 Pinging every ${PING_INTERVAL} minutes`);
  console.log(`🎯 Health endpoint: ${HEALTH_ENDPOINT}`);
  console.log('---');
  
  // Initial ping
  pingWebsite();
  
  // Set up interval
  setInterval(pingWebsite, PING_INTERVAL * 60 * 1000);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Keep-alive stopped');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Keep-alive terminated');
  process.exit(0);
});

// Start the keep-alive service
startKeepAlive();