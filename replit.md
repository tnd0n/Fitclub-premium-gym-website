# FitClub Premium Fitness Website

## Overview

FitClub is a modern fitness website application built with a full-stack architecture using React, TypeScript, Express.js, and PostgreSQL. The application provides a comprehensive fitness platform featuring class listings, trainer profiles, membership plans, booking functionality, and contact management. It's designed as a premium fitness club website with a dark theme aesthetic and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

The frontend is structured as a single-page application with component-based architecture. All components are organized in `/client/src/components/` with reusable UI components in `/client/src/components/ui/`. The application uses a dark theme with gradient accents and glass-morphism effects.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints under `/api/*` routes
- **Data Storage**: In-memory storage with interface abstraction for future database integration
- **Request Handling**: JSON middleware for request parsing and comprehensive error handling
- **Development**: Hot reload with Vite integration in development mode

The server implements a clean separation between routing (`/server/routes.ts`) and data access (`/server/storage.ts`) with a well-defined storage interface for scalability.

### Database Schema
The application uses Drizzle ORM for database operations with PostgreSQL. Key entities include:
- **Users**: Basic user authentication structure
- **Classes**: Fitness classes with scheduling, difficulty levels, and trainer assignments
- **Trainers**: Trainer profiles with specialties and certifications
- **Memberships**: Membership plans with features and pricing
- **Bookings**: User bookings for classes or trainer sessions
- **Contacts**: Contact form submissions

### UI/UX Design System
- **Theme**: Dark mode with neutral base colors and branded accent colors
- **Typography**: Multiple font families including DM Sans, Geist Mono, and Architects Daughter
- **Components**: Comprehensive component library with consistent styling patterns
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Animations**: Smooth transitions and hover effects with CSS transforms

### Data Flow
- Client-side components fetch data using React Query hooks
- API requests are handled through a centralized `apiRequest` function
- Form submissions use React Hook Form with Zod schema validation
- Real-time UI updates through React Query's caching and invalidation

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast build tool and development server

### Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store for Express

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI component library for accessibility
- **shadcn/ui**: Pre-built component system built on Radix UI
- **class-variance-authority**: Utility for managing CSS class variants
- **Lucide React**: Icon library for consistent iconography

### Form Management
- **React Hook Form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **Zod**: TypeScript-first schema validation

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment optimization for Replit platform

The application is configured for deployment on Replit with specialized plugins and development tooling for the platform.