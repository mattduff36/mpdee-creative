# Accounts System Documentation

## Overview
This document outlines the current accounts system functionality that will be removed from the MPDEE Creative website.

## Database Models and Relationships

### Core Models
1. **Client** - Customer/client information
   - Fields: id, name, email, phone, billing_address, notes, created_at, updated_at
   - Relations: One-to-many with Invoice

2. **Invoice** - Invoice management
   - Fields: id, client_id, invoice_number, status, total_amount, sent_date, due_date, paid_date, created_at, updated_at
   - Relations: Belongs to Client, One-to-many with InvoiceItem

3. **InvoiceItem** - Individual line items on invoices
   - Fields: id, invoice_id, description, quantity, rate, total, agency_commission, business_area, created_at
   - Relations: Belongs to Invoice

4. **Expense** - Expense tracking
   - Fields: id, description, amount, category, date, business_area, receipt_url, notes, created_at, updated_at

5. **BankStatementImport** - CSV import functionality
   - Fields: id, filename, uploaded_at
   - Relations: One-to-many with BankTransaction

6. **BankTransaction** - Parsed bank transactions
   - Fields: id, import_id, date, description, amount, raw, status, expense_id
   - Relations: Belongs to BankStatementImport

### Enums
- **InvoiceStatus**: DRAFT, SENT, PAID, OVERDUE
- **BusinessArea**: CREATIVE, DEVELOPMENT, SUPPORT
- **TransactionStatus**: PENDING, ADDED, IGNORED

## Frontend Routes and Components

### Account Routes (`/src/app/accounts/`)
- `/accounts/page.tsx` - Main accounts dashboard
- `/accounts/login/page.tsx` - Login page
- `/accounts/clients/` - Client management pages
- `/accounts/invoices/` - Invoice management pages
- `/accounts/expenses/` - Expense tracking pages
- `/accounts/layout.tsx` - Accounts layout wrapper

### Account Components (`/src/components/accounts/`)
- `Navigation.tsx` - Accounts-specific navigation
- `LoginForm.tsx` - Login form component
- `ClientForm.tsx` - Client management form
- `InvoiceForm.tsx` - Invoice form component

## API Endpoints

### Authentication (`/src/app/api/auth/`)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Session validation

### Client Management (`/src/app/api/clients/`)
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/[id]` - Get client details
- `PUT /api/clients/[id]` - Update client
- `DELETE /api/clients/[id]` - Delete client

### Invoice Management (`/src/app/api/invoices/`)
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/[id]` - Get invoice details
- `PUT /api/invoices/[id]` - Update invoice
- `DELETE /api/invoices/[id]` - Delete invoice
- `GET /api/invoices/[id]/pdf` - Generate PDF
- `POST /api/invoices/[id]/send` - Send invoice via email
- `PUT /api/invoices/[id]/status` - Update invoice status

### Expense Tracking (`/src/app/api/expenses/`)
- `GET /api/expenses` - List all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/[id]` - Get expense details
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense
- `/api/expenses/import/` - CSV import functionality

### Statistics (`/src/app/api/stats/`)
- `GET /api/stats` - Dashboard statistics

### Temporary (`/src/app/api/temp-test-pdf/`)
- PDF testing endpoints

## Supporting Libraries

### Authentication (`/lib/auth.ts`)
- JWT token management
- Password hashing with bcryptjs
- Session validation

### Database (`/lib/db.ts`)
- Prisma client setup
- Database connection utilities

### PDF Generation (`/lib/pdf.tsx`)
- Invoice PDF generation using jsPDF
- HTML to canvas conversion

### Email (`/lib/email.ts`)
- Email sending functionality using Nodemailer
- Invoice email templates

### Types (`/lib/types.ts`)
- TypeScript interfaces for all models
- Form data types
- API response types
- Authentication types

## Dependencies

### Core Dependencies
- `@prisma/client` - Database ORM
- `prisma` - Database schema management
- `bcryptjs` - Password hashing
- `jose` - JWT token handling
- `jspdf` - PDF generation
- `html2canvas` - HTML to canvas conversion
- `nodemailer` - Email sending
- `csv-parse` - CSV file parsing

### Development Dependencies
- `@types/bcryptjs` - TypeScript types for bcryptjs
- `@types/nodemailer` - TypeScript types for nodemailer

## Environment Variables
- `POSTGRES_PRISMA_URL` - Database connection URL
- `POSTGRES_URL_NON_POOLING` - Direct database connection
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password
- `NEXTAUTH_SECRET` - Authentication secret

## Configuration Files
- `next.config.js` - Next.js configuration (may contain Prisma references)
- `middleware.ts` - Authentication middleware
- `prisma/schema.prisma` - Database schema definition

## Notes
- All account-related functionality will be completely removed
- Database tables will be dropped via Prisma migration
- Dependencies will be removed and node_modules updated
- Navigation will be simplified to focus only on audio production services
- The site will become a static showcase without database dependencies
