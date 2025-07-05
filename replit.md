# Portfolio Analytics Platform

## Overview

This is a comprehensive financial portfolio analytics platform built with a modern full-stack architecture. The application provides real-time portfolio tracking, market analysis, news aggregation, economic calendar events, and options trading insights. It features a responsive design optimized for both desktop and mobile experiences.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints with structured error handling
- **Middleware**: Custom logging, JSON parsing, and error handling

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database interactions
- **Database**: PostgreSQL with Neon serverless adapter
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Portfolio Management
- Real-time portfolio position tracking
- Profit/loss calculations with percentage changes
- Add/edit/delete portfolio positions
- Portfolio summary statistics and performance metrics

### Market Data Integration
- Live stock quotes and market data
- Market movers tracking (top gainers/losers)
- Financial API integration (Alpha Vantage compatible)
- Real-time price updates and change calculations

### News and Information
- Market news aggregation with sentiment analysis
- Economic calendar with event impact ratings
- News article categorization and source tracking
- Time-based event scheduling and notifications

### Options Analysis
- Options play recommendations
- Strike price and expiration tracking
- Potential return calculations
- Risk assessment and recommendation levels

### User Interface
- Responsive design with mobile-first approach
- Desktop sidebar navigation and mobile bottom navigation
- Component-based architecture with reusable UI elements
- Dark/light theme support via CSS custom properties

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle business logic and data validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **External APIs**: Financial data fetched from third-party services
5. **Response Formatting**: Structured JSON responses with error handling
6. **Cache Management**: Query client handles caching and invalidation

## External Dependencies

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Replit Integration**: Development environment optimizations

### UI Libraries
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Consistent icon library
- **Class Variance Authority**: Type-safe component variants
- **Date-fns**: Date manipulation and formatting

### Backend Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Alpha Vantage API**: Financial market data (configurable)
- **Connect PG Simple**: PostgreSQL session store (if sessions needed)

## Deployment Strategy

### Development
- **Dev Server**: Vite development server with HMR
- **API Server**: Express server with TypeScript compilation via tsx
- **Database**: Local or cloud PostgreSQL instance
- **Environment**: NODE_ENV=development with debug logging

### Production
- **Build Process**: Vite builds static assets, ESBuild bundles server code
- **Asset Serving**: Express serves static files from dist/public
- **Database**: Production PostgreSQL with connection pooling
- **Process Management**: Single Node.js process serving both API and static assets

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **FINANCIAL_API_KEY**: External API authentication (optional)
- **NODE_ENV**: Environment mode (development/production)

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```