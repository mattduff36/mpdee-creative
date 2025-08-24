# Product Requirements Document: Remove Accounts System

## 1. Executive Summary

### 1.1 Project Overview
Remove the entire accounts system and all related functionality from the MPDEE Creative website. The accounts functionality has been moved to a separate dedicated site, and this site should now focus solely on MPDEE Creative's audio production services.

### 1.2 Business Objective
- Streamline the MPDEE Creative website to focus exclusively on audio production services
- Remove unnecessary complexity and maintenance overhead
- Ensure the site serves its primary purpose as a service showcase and lead generation tool
- Maintain clean, professional presentation of MPDEE Creative services

### 1.3 Success Criteria
- All accounts-related functionality completely removed
- Site loads faster without unnecessary code and database queries
- Clean, focused user experience for audio production services
- No broken links or references to removed functionality
- Database schema simplified to remove accounting-related tables

## 2. Current State Analysis

### 2.1 Existing Accounts System Components

#### 2.1.1 Frontend Components
- **Route Structure**: `/src/app/accounts/` directory with subdirectories:
  - `/accounts/page.tsx` - Main accounts dashboard
  - `/accounts/login/page.tsx` - Login page
  - `/accounts/clients/` - Client management
  - `/accounts/invoices/` - Invoice management
  - `/accounts/expenses/` - Expense management
  - `/accounts/layout.tsx` - Accounts layout wrapper

- **React Components**: `/src/components/accounts/` directory:
  - `Navigation.tsx` - Accounts navigation
  - `LoginForm.tsx` - Login form component
  - `ClientForm.tsx` - Client management form
  - `InvoiceForm.tsx` - Invoice creation/editing form

#### 2.1.2 Backend API Routes
- **Authentication**: `/src/app/api/auth/` directory:
  - `/auth/login/route.ts` - Login endpoint
  - `/auth/logout/route.ts` - Logout endpoint
  - `/auth/check/route.ts` - Session validation

- **Data Management**: `/src/app/api/` directory:
  - `/clients/` - Client CRUD operations
  - `/invoices/` - Invoice management
  - `/expenses/` - Expense tracking
  - `/stats/` - Dashboard statistics

#### 2.1.3 Database Schema
- **Models to Remove**:
  - `Client` - Client information
  - `Invoice` - Invoice records
  - `InvoiceItem` - Invoice line items
  - `Expense` - Expense tracking
  - `BankStatementImport` - CSV import functionality
  - `BankTransaction` - Transaction processing
  - `InvoiceStatus` enum
  - `BusinessArea` enum
  - `TransactionStatus` enum

#### 2.1.4 Supporting Libraries
- **Authentication**: `/lib/auth.ts` - JWT-based authentication
- **Database**: `/lib/db.ts` - Prisma client setup
- **Types**: `/lib/types.ts` - TypeScript interfaces
- **PDF Generation**: `/lib/pdf.tsx` - Invoice PDF creation
- **Email**: `/lib/email.ts` - Email notifications

### 2.2 Dependencies and References
- Navigation links to accounts functionality
- Environment variables for authentication
- Database connection strings
- Prisma migrations and schema
- Package dependencies (bcryptjs, jose, etc.)

## 3. Requirements

### 3.1 Functional Requirements

#### 3.1.1 Removal Tasks
1. **Delete Frontend Routes**
   - Remove entire `/src/app/accounts/` directory
   - Remove all account-related page components
   - Clean up any navigation references

2. **Delete API Routes**
   - Remove `/src/app/api/auth/` directory
   - Remove `/src/app/api/clients/` directory
   - Remove `/src/app/api/invoices/` directory
   - Remove `/src/app/api/expenses/` directory
   - Remove `/src/app/api/stats/` directory

3. **Delete Components**
   - Remove `/src/components/accounts/` directory
   - Remove all account-related React components

4. **Delete Supporting Libraries**
   - Remove `/lib/auth.ts`
   - Remove `/lib/db.ts`
   - Remove `/lib/pdf.tsx`
   - Remove `/lib/email.ts`
   - Clean up `/lib/types.ts` to remove account-related types

5. **Database Cleanup**
   - Remove Prisma schema models
   - Generate and run migration to drop tables
   - Remove database connection logic

#### 3.1.2 Cleanup Tasks
1. **Navigation Updates**
   - Remove any links to accounts functionality
   - Update main navigation to focus on services
   - Ensure no broken internal links

2. **Environment Variables**
   - Remove authentication-related environment variables
   - Remove database connection strings
   - Clean up any unused configuration

3. **Package Dependencies**
   - Remove unused npm packages:
     - `@prisma/client`
     - `prisma`
     - `bcryptjs`
     - `jose`
     - Any PDF generation libraries
     - Email service libraries

4. **Configuration Files**
   - Remove Prisma configuration
   - Clean up Next.js configuration if needed
   - Remove any middleware related to authentication

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance
- Site should load faster without database queries
- Reduced bundle size from removed dependencies
- Improved initial page load times

#### 3.2.2 Security
- Remove all authentication endpoints
- Eliminate potential security vulnerabilities from unused code
- Clean up any session management

#### 3.2.3 Maintainability
- Simplified codebase focused on core functionality
- Reduced complexity and maintenance overhead
- Clear separation of concerns

## 4. Technical Specifications

### 4.1 File Removal List

#### 4.1.1 Directories to Remove
```
src/app/accounts/
src/app/api/auth/
src/app/api/clients/
src/app/api/invoices/
src/app/api/expenses/
src/app/api/stats/
src/components/accounts/
lib/auth.ts
lib/db.ts
lib/pdf.tsx
lib/email.ts
prisma/
```

#### 4.1.2 Files to Modify
```
src/components/Navigation.tsx - Remove accounts links
src/app/layout.tsx - Remove any auth middleware
lib/types.ts - Remove account-related types
package.json - Remove unused dependencies
next.config.js - Remove any Prisma-related config
```

### 4.2 Database Migration
1. Create Prisma migration to drop all account-related tables
2. Remove Prisma schema file
3. Remove Prisma client from the project

### 4.3 Environment Variables to Remove
```
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
ADMIN_USERNAME
ADMIN_PASSWORD
NEXTAUTH_SECRET
```

### 4.4 Dependencies to Remove
```json
{
  "@prisma/client": "latest",
  "prisma": "latest",
  "bcryptjs": "latest",
  "jose": "latest"
}
```

## 5. Implementation Plan

### 5.1 Phase 1: Preparation
1. **Backup Current State**
   - Create git branch for this work
   - Document current functionality
   - Backup database schema

2. **Analysis**
   - Audit all references to accounts functionality
   - Identify all dependencies
   - Plan migration strategy

### 5.2 Phase 2: Core Removal
1. **Remove Frontend Components**
   - Delete accounts routes
   - Remove React components
   - Update navigation

2. **Remove Backend APIs**
   - Delete API routes
   - Remove authentication logic
   - Clean up middleware

### 5.3 Phase 3: Database Cleanup
1. **Schema Migration**
   - Create Prisma migration to drop tables
   - Remove schema file
   - Clean up database connections

2. **Remove Supporting Libraries**
   - Delete auth, db, pdf, email libraries
   - Clean up types

### 5.4 Phase 4: Final Cleanup
1. **Dependencies**
   - Remove unused npm packages
   - Clean up package.json

2. **Configuration**
   - Remove environment variables
   - Clean up configuration files

3. **Testing**
   - Verify no broken links
   - Test site functionality
   - Performance testing

## 6. Risk Assessment

### 6.1 High Risk
- **Data Loss**: Ensure proper backup before database changes
- **Broken Links**: Comprehensive audit of all internal references
- **Deployment Issues**: Test thoroughly in staging environment

### 6.2 Medium Risk
- **Performance Regression**: Monitor site performance after changes
- **SEO Impact**: Ensure no important pages are accidentally removed
- **User Experience**: Verify smooth transition for existing users

### 6.3 Low Risk
- **Code Complexity**: Simplified codebase reduces maintenance burden
- **Security**: Removal of authentication reduces attack surface

## 7. Testing Strategy

### 7.1 Functional Testing
- Verify all remaining pages load correctly
- Test navigation and internal links
- Ensure no 404 errors from removed routes

### 7.2 Performance Testing
- Measure page load times before and after
- Check bundle size reduction
- Verify no database queries on remaining pages

### 7.3 User Experience Testing
- Test site navigation flow
- Verify contact forms work
- Check mobile responsiveness

## 8. Deployment Plan

### 8.1 Pre-Deployment
1. Complete all testing in staging environment
2. Backup production database
3. Prepare rollback plan

### 8.2 Deployment Steps
1. Deploy to staging for final verification
2. Deploy to production during low-traffic period
3. Monitor for any issues
4. Verify site functionality

### 8.3 Post-Deployment
1. Monitor site performance
2. Check for any broken links
3. Verify analytics tracking
4. Update documentation

## 9. Success Metrics

### 9.1 Performance Metrics
- **Page Load Time**: Target 20% improvement
- **Bundle Size**: Target 30% reduction
- **First Contentful Paint**: Target 15% improvement

### 9.2 Quality Metrics
- **Zero 404 Errors**: No broken internal links
- **100% Uptime**: No deployment-related downtime
- **Clean Console**: No JavaScript errors

### 9.3 Business Metrics
- **Lead Generation**: Maintain or improve contact form submissions
- **User Engagement**: Maintain or improve time on site
- **SEO Performance**: Maintain search engine rankings

## 10. Timeline

### 10.1 Week 1: Analysis and Planning
- Complete audit of existing functionality
- Create detailed removal plan
- Set up development environment

### 10.2 Week 2: Core Removal
- Remove frontend components
- Remove backend APIs
- Update navigation

### 10.3 Week 3: Database and Cleanup
- Database migration
- Remove supporting libraries
- Clean up dependencies

### 10.4 Week 4: Testing and Deployment
- Comprehensive testing
- Performance optimization
- Production deployment

## 11. Conclusion

This PRD outlines a comprehensive plan to remove the accounts system from the MPDEE Creative website, transforming it into a focused, streamlined platform for audio production services. The removal will improve performance, reduce complexity, and create a better user experience for potential clients.

The implementation should be approached methodically with proper testing and backup procedures to ensure a smooth transition and maintain the site's professional reputation.
