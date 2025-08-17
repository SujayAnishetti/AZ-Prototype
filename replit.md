# Clinical Trials Portal

## Overview

This is a full-stack web application for managing and displaying clinical trials data, built for AstraZeneca. The application provides a modern, responsive interface for browsing clinical trials with advanced filtering and search capabilities. It features a React frontend with a comprehensive design system, an Express.js backend API, and PostgreSQL database integration through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using modern React with TypeScript, implementing a component-based architecture:

- **Framework**: React 18 with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing with dynamic route parameters
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Authentication**: Client-side authentication with localStorage session management
- **UI Framework**: Custom design system built on Radix UI primitives with Tailwind CSS
- **Component Library**: Comprehensive shadcn/ui component library for consistent design patterns
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular structure with reusable components, custom hooks, and a well-organized file structure separating UI components, pages, and utilities. Key pages include:
- **Trial Detail Pages**: Individual clinical trial information with tabbed content
- **Authentication Pages**: Login and registration with form validation
- **Dashboard**: Patient-specific interface with study information and tools
- **Appointment Booking**: Calendar-based scheduling system with approval workflow

### Backend Architecture
The server-side implements a RESTful API architecture:

- **Framework**: Express.js with TypeScript for robust server-side development
- **API Design**: RESTful endpoints following standard HTTP conventions
- **Data Layer**: Abstracted storage interface allowing for flexible data persistence strategies
- **Development Storage**: In-memory storage implementation with sample data for development
- **Error Handling**: Centralized error handling middleware for consistent API responses
- **Request Logging**: Comprehensive request/response logging for debugging and monitoring

### Data Storage Solutions
The application is designed for PostgreSQL integration with flexible storage abstractions:

- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database**: PostgreSQL with Neon serverless integration for scalable cloud deployment
- **Schema Management**: Code-first approach with Drizzle migrations and type generation
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Storage Interface**: Abstract storage layer supporting multiple implementations (memory, database)

### Authentication and Authorization
The application includes a complete authentication system for user management:

- **User Schema**: Defined user entity with username/password authentication
- **Session Management**: localStorage-based session handling with user information storage
- **Login/Signup**: Complete login and registration flow with form validation
- **Authentication Guards**: Route protection requiring authentication for sensitive features
- **Conditional Navigation**: Header and navigation visibility based on authentication status
- **User Workflow**: Trial discovery → detail pages → eligibility check → login/signup → appointment booking → dashboard access

### Design System and Styling
Comprehensive design system built for healthcare/pharmaceutical branding:

- **CSS Framework**: Tailwind CSS with custom AstraZeneca brand colors and design tokens
- **Component System**: Complete shadcn/ui integration with customized theming
- **Typography**: Professional font stack including Inter and custom Google Fonts
- **Responsive Design**: Mobile-first responsive design patterns throughout
- **Accessibility**: ARIA-compliant components and keyboard navigation support

### Development Experience
Optimized development workflow and tooling:

- **Type Safety**: Full TypeScript coverage across client, server, and shared code
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Development Server**: Vite dev server with HMR and Express integration
- **Build Process**: Optimized production builds with code splitting and asset optimization
- **Path Aliases**: Configured import aliases for clean, maintainable code organization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for frontend state management
- **Express.js**: Web framework for Node.js backend API development
- **TypeScript**: Type safety across the entire application stack

### Database and ORM
- **Drizzle ORM**: Modern TypeScript ORM for database operations and migrations
- **Drizzle Kit**: CLI tools for schema management and database migrations
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for cloud deployment
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Design System
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **Lucide React**: Modern icon library with consistent design language
- **class-variance-authority**: Utility for creating type-safe CSS class variants

### Development and Build Tools
- **Vite**: Fast build tool and development server with React plugin support
- **esbuild**: Fast JavaScript bundler for production server builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **@replit/vite-plugins**: Replit-specific development tools and error handling

### Form Management and Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for form schema integration
- **Zod**: TypeScript-first schema validation library

### Additional Utilities
- **wouter**: Lightweight React router alternative
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **cmdk**: Command palette component for enhanced user interaction
- **embla-carousel-react**: Touch-friendly carousel component library