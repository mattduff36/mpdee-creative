# Task List: Accounting System Implementation

Based on PRD: `prd-accounting-system.md`

## Relevant Files

- `package.json` - Add new dependencies for database, authentication, PDF generation, and email
- `.env.local` - Environment variables for admin credentials and email configuration
- `prisma/schema.prisma` - Database schema definition for clients, invoices, and invoice items
- `prisma/migrations/` - Database migration files
- `lib/db.ts` - Database connection and Prisma client setup
- `lib/auth.ts` - Authentication utilities and session management
- `lib/email.ts` - Email service with Google SMTP integration
- `lib/pdf.ts` - PDF generation utilities for invoices
- `lib/types.ts` - TypeScript type definitions for the application
- `src/app/accounts/page.tsx` - Main accounts dashboard page
- `src/app/accounts/login/page.tsx` - Login page for authentication
- `src/app/accounts/layout.tsx` - Layout wrapper with authentication check
- `src/app/accounts/clients/page.tsx` - Client management page
- `src/app/accounts/clients/[id]/page.tsx` - Individual client details/edit page
- `src/app/accounts/invoices/page.tsx` - Invoice listing page
- `src/app/accounts/invoices/[id]/page.tsx` - Individual invoice details/edit page
- `src/app/accounts/invoices/new/page.tsx` - New invoice creation page
- `src/components/accounts/LoginForm.tsx` - Login form component
- `src/components/accounts/ClientForm.tsx` - Client creation/editing form
- `src/components/accounts/InvoiceForm.tsx` - Invoice creation/editing form
- `src/components/accounts/InvoiceItemForm.tsx` - Line item form component
- `src/components/accounts/Navigation.tsx` - Accounts section navigation
- `src/components/accounts/DataTable.tsx` - Reusable table component for clients/invoices
- `src/app/api/auth/login/route.ts` - Login API endpoint
- `src/app/api/auth/logout/route.ts` - Logout API endpoint
- `src/app/api/clients/route.ts` - Client CRUD API endpoints
- `src/app/api/clients/[id]/route.ts` - Individual client API endpoints
- `src/app/api/invoices/route.ts` - Invoice CRUD API endpoints
- `src/app/api/invoices/[id]/route.ts` - Individual invoice API endpoints
- `src/app/api/invoices/[id]/send/route.ts` - Invoice email sending endpoint
- `src/app/api/invoices/[id]/pdf/route.ts` - Invoice PDF generation endpoint

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Database migrations will be generated automatically by Prisma
- Environment variables must be configured in both `.env.local` and Vercel for production

## Tasks

- [x] 1.0 Set up project infrastructure and dependencies
  - [x] 1.1 Install required dependencies (Prisma, bcryptjs, nodemailer, react-pdf, date-fns)
  - [x] 1.2 Configure TypeScript types and update tsconfig.json if needed
  - [x] 1.3 Set up environment variables template in .env.example
  - [x] 1.4 Create lib directory structure for utilities
  - [x] 1.5 Update next.config.js for PDF generation and file handling

- [ ] 2.0 Implement authentication system with password protection
  - [ ] 2.1 Create authentication utilities in lib/auth.ts
  - [ ] 2.2 Implement session management with secure cookies
  - [ ] 2.3 Create login API endpoints (/api/auth/login, /api/auth/logout)
  - [ ] 2.4 Build login form component with validation
  - [ ] 2.5 Create login page at /accounts/login
  - [ ] 2.6 Implement authentication middleware for accounts routes
  - [ ] 2.7 Add logout functionality and redirect logic

- [ ] 3.0 Create database schema and data layer with Prisma
  - [ ] 3.1 Initialize Prisma in the project
  - [ ] 3.2 Define database schema for clients, invoices, and invoice_items tables
  - [ ] 3.3 Configure database connection for SQLite (dev) and PostgreSQL (prod)
  - [ ] 3.4 Create and run initial database migration
  - [ ] 3.5 Set up Prisma client and database utilities in lib/db.ts
  - [ ] 3.6 Create TypeScript types based on Prisma schema

- [ ] 4.0 Build client management system (CRUD operations)
  - [ ] 4.1 Create client API endpoints for CRUD operations
  - [ ] 4.2 Build client form component with validation
  - [ ] 4.3 Create client listing page with search functionality
  - [ ] 4.4 Implement client detail/edit page
  - [ ] 4.5 Add client deletion with confirmation dialog
  - [ ] 4.6 Implement client search and filtering
  - [ ] 4.7 Add validation to prevent deletion of clients with invoices

- [ ] 5.0 Develop invoice management system with line items
  - [ ] 5.1 Create invoice API endpoints for CRUD operations
  - [ ] 5.2 Build invoice form component with client selection
  - [ ] 5.3 Implement line item management (add, edit, remove)
  - [ ] 5.4 Add automatic invoice number generation
  - [ ] 5.5 Implement invoice status tracking (draft, sent, paid, overdue)
  - [ ] 5.6 Create invoice listing page with filtering
  - [ ] 5.7 Build individual invoice detail/edit page
  - [ ] 5.8 Add invoice total calculations and validation
  - [ ] 5.9 Implement business rules (no editing sent/paid invoices)

- [ ] 6.0 Implement PDF generation and email functionality
  - [ ] 6.1 Set up PDF generation utilities with professional template
  - [ ] 6.2 Create invoice PDF template matching MPDEE Creative branding
  - [ ] 6.3 Configure Google SMTP with Nodemailer
  - [ ] 6.4 Build email service for sending invoices
  - [ ] 6.5 Create API endpoint for PDF generation
  - [ ] 6.6 Create API endpoint for sending invoices via email
  - [ ] 6.7 Update invoice status after successful email sending
  - [ ] 6.8 Add error handling for email failures

- [ ] 7.0 Create user interface and navigation structure
  - [ ] 7.1 Create accounts layout with authentication wrapper
  - [ ] 7.2 Build navigation component for accounts section
  - [ ] 7.3 Create main accounts dashboard page
  - [ ] 7.4 Implement responsive design matching existing site
  - [ ] 7.5 Add loading states and error handling throughout UI
  - [ ] 7.6 Create reusable data table component
  - [ ] 7.7 Add confirmation dialogs for destructive actions
  - [ ] 7.8 Implement success/error toast notifications
  - [ ] 7.9 Add form validation and error display
  - [ ] 7.10 Test responsive design on mobile devices 