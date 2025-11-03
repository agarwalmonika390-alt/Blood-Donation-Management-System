# Blood Donation Management System

## Overview

The Blood Donation Management System is a full-stack web application designed to manage blood donor information efficiently. The system enables healthcare administrators to register donors, search and filter by blood group, and maintain a comprehensive database of potential blood donors. Built with modern web technologies, it provides a clean, healthcare-appropriate interface for managing critical donor information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

The frontend follows a component-based architecture with the following key decisions:

- **UI Component Library**: shadcn/ui (Radix UI primitives) with Tailwind CSS for styling
  - **Rationale**: Provides accessible, customizable components that align with Material Design principles suitable for healthcare applications
  - **Theme System**: Custom HSL-based theming with CSS variables for light/dark mode support
  - **Typography**: Inter font family for professional readability in data-dense interfaces

- **State Management**: TanStack Query (React Query) for server state
  - **Rationale**: Simplifies data fetching, caching, and synchronization with the backend
  - **Configuration**: Disabled automatic refetching to reduce unnecessary network requests

- **Routing**: Wouter for lightweight client-side routing
  - **Rationale**: Minimal bundle size for a simple single-page application structure

- **Form Management**: React Hook Form with Zod for schema validation
  - **Rationale**: Type-safe form handling with declarative validation aligned with backend schemas

**Component Structure**:
- `StatCard`: Displays donor statistics (total donors, blood group counts)
- `DonorForm`: Registration form with blood group dropdown and phone validation
- `DonorTable`: Tabular display of all donors with edit/delete actions
- `SearchFilter`: Real-time search and blood group filtering
- `DeleteConfirmDialog`: Confirmation modal for delete operations
- `EditDonorDialog`: Modal form for updating donor information

### Backend Architecture

**Framework**: Node.js with Express

The backend implements a REST API with JSON file-based storage:

- **API Design**: RESTful endpoints following standard HTTP conventions
  - `GET /api/donors` - Retrieve all donors
  - `GET /api/donors/:id` - Retrieve single donor
  - `POST /api/donors` - Create new donor
  - `PUT /api/donors/:id` - Update existing donor
  - `DELETE /api/donors/:id` - Remove donor

- **Data Persistence**: JSON file storage (`donors.json`)
  - **Rationale**: Demonstrates CRUD operations clearly without database infrastructure requirements
  - **Trade-offs**: Simple and portable but not suitable for production scale or concurrent access
  - **Implementation**: File-based storage abstraction (`JsonFileStorage`) implements `IStorage` interface for potential future database migration

- **Data Validation**: Zod schemas shared between frontend and backend
  - **Rationale**: Single source of truth for data structure ensures consistency
  - **Location**: Shared schema definitions in `shared/schema.ts`

- **Database Schema Preparation**: Drizzle ORM schema defined for PostgreSQL
  - **Rationale**: While currently using JSON storage, the application is structured to support future migration to PostgreSQL via Drizzle ORM
  - **Schema**: Includes `donors` table with UUID primary keys, text fields for name/blood group/phone, and timestamp for record creation

### Design System

**Approach**: Material Design-inspired with healthcare sensibilities

- **Layout**: Centered container (max-width: 1280px) with single-column layout for optimal form completion
- **Component Patterns**:
  - Card-based sections with elevation for visual hierarchy
  - Statistics dashboard with metric cards
  - Elevated registration form card
  - Data table with clear action buttons
  - Consistent spacing using Tailwind primitives (2, 4, 6, 8, 12, 16, 20)

- **Color System**: Neutral base with HSL color tokens for theming
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation

### Development Tools

- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: TypeScript with strict mode enabled across all files
- **Code Quality**: ESBuild for server bundling, PostCSS for CSS processing
- **Development Environment**: Replit-specific plugins for runtime error handling and development banners

## External Dependencies

### Core Libraries

- **React Ecosystem**:
  - `react` & `react-dom`: UI rendering
  - `@tanstack/react-query`: Server state management
  - `react-hook-form`: Form state and validation
  - `wouter`: Lightweight routing

- **UI Components**: 
  - `@radix-ui/*`: Accessible component primitives (25+ components including Dialog, Select, Toast, etc.)
  - `tailwindcss`: Utility-first CSS framework
  - `class-variance-authority`: Component variant management
  - `lucide-react`: Icon library

- **Validation**: 
  - `zod`: Schema validation
  - `@hookform/resolvers`: React Hook Form + Zod integration
  - `zod-validation-error`: Human-readable error messages

- **Date Handling**: `date-fns` for timestamp formatting

### Backend Dependencies

- **Express Framework**: `express` for HTTP server
- **Database Tooling**: 
  - `drizzle-orm`: Type-safe ORM (prepared for future PostgreSQL integration)
  - `drizzle-kit`: Database migration tooling
  - `@neondatabase/serverless`: PostgreSQL driver for Neon (configured but not actively used)
  - `drizzle-zod`: Drizzle to Zod schema conversion

- **Development**: 
  - `tsx`: TypeScript execution for development server
  - `vite`: Build tool and development server
  - Replit-specific plugins for development environment integration

### Third-Party Services

**Note**: Currently configured but not actively integrated:
- Neon Database (PostgreSQL): Configuration exists in `drizzle.config.ts` expecting `DATABASE_URL` environment variable
- Session management infrastructure (`connect-pg-simple`) configured for future PostgreSQL session store

**Current State**: The application uses local JSON file storage and can be migrated to PostgreSQL by:
1. Provisioning a database and setting `DATABASE_URL`
2. Running `npm run db:push` to create tables
3. Updating storage implementation from `JsonFileStorage` to Drizzle-based queries