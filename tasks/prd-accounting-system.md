# Product Requirements Document: Accounting System

## Introduction/Overview

The accounting system is a password-protected web application that allows MPDEE Creative to manage client invoices, track payments, and send professional invoices via email. The system will be accessible at `/accounts` and provide a comprehensive solution for small business accounting needs.

**Problem Statement:** Currently, MPDEE Creative lacks a centralized system for managing invoices, client information, and payment tracking. This leads to manual processes, potential errors, and difficulty in maintaining professional client relationships.

**Goal:** Create a secure, user-friendly accounting system that streamlines invoice creation, client management, and payment tracking while maintaining the professional brand image of MPDEE Creative.

## Goals

1. **Secure Access:** Implement password-protected admin access using environment variables
2. **Client Management:** Create a comprehensive client database with contact information and billing details
3. **Invoice Creation:** Build a template-based invoice system with line item management
4. **Payment Tracking:** Track invoice status (draft, sent, paid, overdue) with payment dates
5. **Email Integration:** Send professional PDF invoices via Google SMTP
6. **Data Export:** Provide PDF and CSV export functionality for invoices and reports
7. **Recurring Invoices:** Support for automated recurring invoice generation
8. **Professional UI:** Maintain consistent design with the existing MPDEE Creative website

## User Stories

1. **As an admin user, I want to log into the accounting system** so that I can securely access my business data
2. **As an admin user, I want to add new clients** so that I can maintain a database of customer information
3. **As an admin user, I want to edit client information** so that I can keep contact details up to date
4. **As an admin user, I want to create draft invoices** so that I can build invoices before sending them
5. **As an admin user, I want to add line items to invoices** so that I can detail the services provided
6. **As an admin user, I want to send invoices via email** so that clients receive professional PDF invoices
7. **As an admin user, I want to track payment status** so that I can monitor which invoices are paid
8. **As an admin user, I want to create recurring invoices** so that I can automate billing for regular clients
9. **As an admin user, I want to export invoice data** so that I can maintain records and generate reports
10. **As an admin user, I want to view invoice history** so that I can track all business transactions

## Functional Requirements

### Authentication & Security
1. The system must require admin login at `/accounts` route
2. The system must use environment variables for admin credentials (ADMIN_USERNAME, ADMIN_PASSWORD)
3. The system must implement session management with secure cookies
4. The system must redirect unauthenticated users to login page
5. The system must provide logout functionality

### Database & Data Management
6. The system must use a SQLite database for local development and PostgreSQL for production
7. The system must create and manage the following database tables:
   - `clients` (id, name, email, phone, billing_address, notes, created_at, updated_at)
   - `invoices` (id, client_id, invoice_number, status, total_amount, sent_date, due_date, paid_date, created_at, updated_at)
   - `invoice_items` (id, invoice_id, description, quantity, rate, total, created_at)
8. The system must implement proper database migrations
9. The system must provide data backup functionality

### Client Management
10. The system must allow creating new clients with required fields (name, email)
11. The system must allow editing existing client information
12. The system must allow deleting clients (with confirmation)
13. The system must display a list of all clients with search functionality
14. The system must store client billing address and notes
15. The system must prevent deletion of clients with existing invoices

### Invoice Management
16. The system must allow creating new invoices with client selection
17. The system must generate unique invoice numbers automatically
18. The system must allow adding multiple line items to invoices
19. The system must calculate invoice totals automatically
20. The system must support invoice status tracking (draft, sent, paid, overdue)
21. The system must allow editing draft invoices
22. The system must prevent editing of sent/paid invoices
23. The system must display invoice history with filtering options

### Email Integration
24. The system must integrate with Google SMTP using environment variables
25. The system must generate PDF invoices using a professional template
26. The system must send invoices as PDF attachments via email
27. The system must use the admin email (matt.mpdee@gmail.com) as sender
28. The system must include invoice details in email body
29. The system must update invoice status to "sent" after successful email delivery

### Recurring Invoices
30. The system must support creating recurring invoice templates
31. The system must allow setting recurrence frequency (weekly, monthly, quarterly, yearly)
32. The system must automatically generate invoices based on recurrence schedule
33. The system must allow manual triggering of recurring invoice generation

### Export Functionality
34. The system must export individual invoices as PDF
35. The system must export invoice lists as CSV
36. The system must export client lists as CSV
37. The system must include all relevant data in exports

### User Interface
38. The system must match the existing MPDEE Creative design aesthetic
39. The system must be responsive and mobile-friendly
40. The system must provide clear navigation between different sections
41. The system must display success/error messages for user actions
42. The system must include confirmation dialogs for destructive actions

## Non-Goals (Out of Scope)

1. **Multi-user authentication** - Single admin account only
2. **Advanced reporting** - Basic export functionality only
3. **Payment processing** - No direct payment collection
4. **Tax calculations** - Manual tax entry only
5. **Inventory management** - Service-based invoicing only
6. **Email tracking** - No read receipts or delivery confirmation
7. **Advanced analytics** - Basic invoice/client lists only
8. **API endpoints** - Internal use only, no external API

## Design Considerations

- **Consistent Branding:** Use existing MPDEE Creative color scheme and typography
- **Minimal Design:** Clean, professional interface matching current website
- **Responsive Layout:** Mobile-first design approach
- **Accessibility:** WCAG 2.1 AA compliance for form elements and navigation
- **Loading States:** Provide feedback during data operations
- **Error Handling:** Clear error messages and recovery options

## Technical Considerations

- **Framework:** Next.js 15 with TypeScript and App Router
- **Styling:** Tailwind CSS for consistent design
- **Database:** SQLite for development, PostgreSQL for production
- **ORM:** Prisma for database management and migrations
- **Authentication:** NextAuth.js or custom session management
- **PDF Generation:** React-PDF or jsPDF for invoice generation
- **Email:** Nodemailer with Google SMTP
- **Environment Variables:** Secure credential management
- **File Storage:** Local storage for PDFs, cloud storage for production

## Success Metrics

1. **Functionality:** All core features working without errors
2. **Performance:** Page load times under 2 seconds
3. **Security:** No unauthorized access to accounting data
4. **Usability:** Complete invoice workflow in under 5 minutes
5. **Reliability:** 99% uptime for production deployment
6. **Data Integrity:** No data loss during operations

## Open Questions

1. **Invoice Numbering:** Should invoice numbers follow a specific format (e.g., INV-2024-001)?
2. **Due Date Defaults:** What should be the default payment terms (net 30, net 15, etc.)?
3. **PDF Template:** Should the PDF template include MPDEE Creative branding/logo?
4. **Backup Strategy:** How frequently should database backups be performed?
5. **Recurring Invoice Limits:** Should there be limits on how many recurring invoices can be active?
6. **Email Templates:** Should there be different email templates for different invoice types?

## Implementation Priority

### Phase 1 (MVP)
- Authentication system
- Basic client management
- Simple invoice creation and editing
- PDF generation and email sending

### Phase 2 (Enhanced)
- Recurring invoices
- Advanced client management
- Export functionality
- Payment tracking improvements

### Phase 3 (Polish)
- UI/UX improvements
- Performance optimizations
- Advanced features and integrations 