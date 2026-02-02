# mymo - Investment Portfolio Tracker

## Overview

mymo is a Turkish-language investment portfolio tracking application that allows users to monitor their investments across multiple asset classes including BIST stocks, cryptocurrencies, commodities, forex, and investment funds. The application provides a mobile-first interface with real-time market data, portfolio analytics, and transaction history.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom theme variables
- **Build Tool**: Vite with custom plugins for Replit integration
- **Animations**: Framer Motion for UI animations
- **Charts**: Recharts for portfolio visualization

The frontend follows a page-based architecture with shared components. Pages are located in `client/src/pages/` and include Dashboard, Portfolio, AddAsset, MarketData, Transactions, and Profile. The app uses a bottom navigation pattern optimized for mobile use.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful endpoints under `/api/` prefix
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

The server follows a modular structure:
- `server/index.ts`: Express app setup and middleware
- `server/routes.ts`: API route definitions
- `server/storage.ts`: Database access layer using repository pattern
- `server/db.ts`: Database connection pool configuration

### Data Models
The database schema (`shared/schema.ts`) includes:
- **users**: User authentication data
- **categories**: Asset categories (BIST, Crypto, Forex, etc.)
- **assets**: User portfolio holdings with purchase details
- **transactions**: Buy/sell transaction history
- **markets**: Cached market price data

All schemas use Drizzle-Zod for validation, ensuring type safety between frontend and backend.

### API Caching Strategy
The backend implements a 5-minute cache for market data API responses to avoid rate limiting from external data providers. This is handled in-memory in `server/routes.ts`.

### Build Configuration
- Development uses Vite's dev server with HMR
- Production builds use esbuild for the server and Vite for the client
- The build process bundles commonly used dependencies to optimize cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `/migrations`

### UI Framework
- **shadcn/ui**: Pre-configured component library using Radix UI
- **Tailwind CSS**: Utility-first CSS with custom theme configuration in `client/src/index.css`

### Market Data APIs (Planned)
The codebase includes placeholder structures for:
- **Finnhub**: For BIST and international stock data
- **CoinGecko**: For cryptocurrency prices (top 100 coins cached)
- **Exchange rate APIs**: For forex data

Currently, the app uses predefined static lists for BIST stocks and mock data for demonstration purposes.

### Third-Party Integrations
- **Framer Motion**: Animation library for UI transitions
- **Recharts**: Charting library for portfolio pie charts
- **date-fns**: Date manipulation utilities
- **Zod**: Schema validation shared between client and server