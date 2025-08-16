[1mdiff --git a/.gitignore b/.gitignore[m
[1mindex 0a404d5..d8441b1 100644[m
[1m--- a/.gitignore[m
[1m+++ b/.gitignore[m
[36m@@ -1,3 +1,21 @@[m
[32m+[m[32m# Dependencies[m[41m[m
[32m+[m[32mnode_modules/[m[41m[m
[32m+[m[41m[m
[32m+[m[32m# Next.js[m[41m[m
[32m+[m[32m.next/[m[41m[m
[32m+[m[32mout/[m[41m[m
[32m+[m[41m[m
[32m+[m[32m# Env files[m[41m[m
[32m+[m[32m.env*[m[41m[m
[32m+[m[41m[m
[32m+[m[32m# Logs[m[41m[m
[32m+[m[32mnpm-debug.log*[m[41m[m
[32m+[m[32myarn-debug.log*[m[41m[m
[32m+[m[32myarn-error.log*[m[41m[m
[32m+[m[41m[m
[32m+[m[32m# Local data samples[m[41m[m
[32m+[m[32msamples/[m[41m[m
[32m+[m[41m[m
 # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.[m
 [m
 # dependencies[m
[1mdiff --git a/LOCAL_SETUP.md b/LOCAL_SETUP.md[m
[1mnew file mode 100644[m
[1mindex 0000000..91254d9[m
[1m--- /dev/null[m
[1m+++ b/LOCAL_SETUP.md[m
[36m@@ -0,0 +1,175 @@[m
[32m+[m[32m### MPDEE Creative — Fresh Machine Setup Guide[m
[32m+[m
[32m+[m[32mThis guide gets a clean PC with a fresh Cursor install ready to work on this project.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 1) Prerequisites[m
[32m+[m
[32m+[m[32m- Node.js 20 LTS (recommended). Verify:[m
[32m+[m[32m```bash[m
[32m+[m[32mnode -v && npm -v[m
[32m+[m[32m```[m
[32m+[m[32m- Git (use Git Bash on Windows).[m
[32m+[m[32m- Package manager: npm (project uses `package-lock.json`).[m
[32m+[m[32m- Optional: Docker Desktop (for local Postgres), PostgreSQL client tools.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 2) Get the code onto the new machine[m
[32m+[m
[32m+[m[32m- Copy the project folder to your workspace (e.g., `D:/Websites/mpdee-creative`).[m
[32m+[m[32m- If you copied `node_modules` or `.next`, remove them:[m
[32m+[m[32m```bash[m
[32m+[m[32mrm -rf node_modules .next[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 3) Install dependencies[m
[32m+[m
[32m+[m[32m- Clean, lockfile-based install:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm ci[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mNotes:[m
[32m+[m[32m- `postinstall` runs `prisma generate` automatically.[m
[32m+[m[32m- If `npm ci` fails (lockfile mismatch), use:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm install[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 4) Environment variables[m
[32m+[m
[32m+[m[32mCreate `/.env.local` in the project root. Use `/.env.example` (included) as a starting point. Variables used by the app:[m
[32m+[m
[32m+[m[32m- Authentication[m
[32m+[m[32m  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`[m
[32m+[m[32m  - `NEXTAUTH_SECRET`[m
[32m+[m[32m- Database (Prisma - PostgreSQL)[m
[32m+[m[32m  - `POSTGRES_PRISMA_URL`[m
[32m+[m[32m  - `POSTGRES_URL_NON_POOLING`[m
[32m+[m[32m- Email (SMTP)[m
[32m+[m[32m  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`[m
[32m+[m[32m- Company/Invoice[m
[32m+[m[32m  - `COMPANY_NAME`, `COMPANY_EMAIL`, `COMPANY_PHONE`[m
[32m+[m[32m  - `INVOICE_PREFIX` (optional; defaults to `INV`)[m
[32m+[m
[32m+[m[32mExample (`.env.local`):[m
[32m+[m[32m```bash[m
[32m+[m[32m# Auth[m
[32m+[m[32mADMIN_USERNAME="admin"[m
[32m+[m[32mADMIN_PASSWORD="change-me"[m
[32m+[m[32mNEXTAUTH_SECRET="generate-a-long-random-string"[m
[32m+[m
[32m+[m[32m# Database (Local Postgres example)[m
[32m+[m[32mPOSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:5432/mpdee?schema=public&connection_limit=1&pgbouncer=false"[m
[32m+[m[32mPOSTGRES_URL_NON_POOLING="postgresql://postgres:postgres@localhost:5432/mpdee?schema=public"[m
[32m+[m
[32m+[m[32m# SMTP (Gmail example)[m
[32m+[m[32mSMTP_HOST="smtp.gmail.com"[m
[32m+[m[32mSMTP_PORT="587"[m
[32m+[m[32mSMTP_USER="you@gmail.com"[m
[32m+[m[32mSMTP_PASSWORD="app-specific-password"[m
[32m+[m
[32m+[m[32m# Company/Invoices[m
[32m+[m[32mCOMPANY_NAME="MPDEE Creative"[m
[32m+[m[32mCOMPANY_EMAIL="you@domain.com"[m
[32m+[m[32mCOMPANY_PHONE="+44 0000 000000"[m
[32m+[m[32mINVOICE_PREFIX="INV"[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 5) Database setup (local Postgres option)[m
[32m+[m
[32m+[m[32mRun Postgres with Docker (example):[m
[32m+[m[32m```bash[m
[32m+[m[32mdocker run --name mpdee-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mpdee -p 5432:5432 -d postgres:16[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mThen sync the schema:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpx prisma db push[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mIf you later add Prisma migrations:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpx prisma migrate dev[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mUseful checks:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpx prisma generate[m
[32m+[m[32mnpx prisma studio[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 6) Run the app[m
[32m+[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm run dev[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mOpen `http://localhost:3000`. Admin login is at `/accounts/login` using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.[m
[32m+[m
[32m+[m[32mBuild and start (optional):[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm run build[m
[32m+[m[32mnpm start[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 7) Tests (optional)[m
[32m+[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm test[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32mIf Jest reports missing modules, install these dev-only dependencies:[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm i -D babel-jest identity-obj-proxy[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 8) Tooling and configs[m
[32m+[m
[32m+[m[32m- Next.js: `next.config.js` (removes console in production; marks Prisma/bcryptjs as server externals).[m
[32m+[m[32m- TypeScript: `tsconfig.json` with path alias `@/* -> ./src/*`.[m
[32m+[m[32m- Tailwind: `tailwind.config.js` and `postcss.config.js` preconfigured.[m
[32m+[m[32m- Vercel: `vercel.json` (`framework: nextjs`).[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 9) Cursor/Editor tips[m
[32m+[m
[32m+[m[32m- Use the built-in NPM scripts pane to run `dev`, `build`, and `test`.[m
[32m+[m[32m- Ensure the terminal uses Git Bash on Windows.[m
[32m+[m[32m- Recommended extensions: Tailwind CSS IntelliSense.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 10) Troubleshooting[m
[32m+[m
[32m+[m[32m- Prisma cannot connect: verify `POSTGRES_PRISMA_URL` and that Postgres is running and reachable.[m
[32m+[m[32m- Emails not sending: verify `SMTP_*` values; Gmail often requires an app password and 2FA.[m
[32m+[m[32m- Blank pages in dev: clear `.next` and restart: `rm -rf .next && npm run dev`.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### Reference: Key scripts[m
[32m+[m
[32m+[m[32m```bash[m
[32m+[m[32mnpm run dev      # Start Next.js dev server[m
[32m+[m[32mnpm run build    # Build for production[m
[32m+[m[32mnpm start        # Start production server[m
[32m+[m[32mnpm test         # Run tests[m
[32m+[m[32m```[m
[32m+[m
[32m+[m
[1mdiff --git a/install.log b/install.log[m
[1mnew file mode 100644[m
[1mindex 0000000..6be28b7[m
[1m--- /dev/null[m
[1m+++ b/install.log[m
[36m@@ -0,0 +1 @@[m
[32m+[m[32mThe specified path is invalid.[m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex 6c1e138..9752527 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -15,6 +15,7 @@[m
         "@types/nodemailer": "^6.4.17",[m
         "autoprefixer": "^10.0.1",[m
         "bcryptjs": "^3.0.2",[m
[32m+[m[32m        "csv-parse": "^5.5.6",[m
         "date-fns": "^4.1.0",[m
         "html2canvas": "^1.4.1",[m
         "jose": "^6.0.12",[m
[36m@@ -32,14 +33,14 @@[m
         "@testing-library/jest-dom": "^6.0.0",[m
         "@testing-library/react": "^14.0.0",[m
         "@testing-library/user-event": "^14.0.0",[m
[31m-        "@types/node": "^20",[m
[31m-        "@types/react": "^18",[m
[32m+[m[32m        "@types/node": "20.19.10",[m
[32m+[m[32m        "@types/react": "18.3.23",[m
         "@types/react-dom": "^18",[m
         "eslint": "^8",[m
         "eslint-config-next": "15.4.2",[m
         "jest": "^29.0.0",[m
         "jest-environment-jsdom": "^29.0.0",[m
[31m-        "typescript": "^5"[m
[32m+[m[32m        "typescript": "5.9.2"[m
       }[m
     },[m
     "node_modules/@adobe/css-tools": {[m
[36m@@ -2505,9 +2506,9 @@[m
       "license": "MIT"[m
     },[m
     "node_modules/@types/node": {[m
[31m-      "version": "20.19.9",[m
[31m-      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.9.tgz",[m
[31m-      "integrity": "sha512-cuVNgarYWZqxRJDQHEB58GEONhOK79QVR/qYx4S7kcUObQvUwvFnYxJuuHUKm2aieN9X3yZB4LZsuYNU1Qphsw==",[m
[32m+[m[32m      "version": "20.19.10",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.10.tgz",[m
[32m+[m[32m      "integrity": "sha512-iAFpG6DokED3roLSP0K+ybeDdIX6Bc0Vd3mLW5uDqThPWtNos3E+EqOM11mPQHKzfWHqEBuLjIlsBQQ8CsISmQ==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "undici-types": "~6.21.0"[m
[36m@@ -4346,6 +4347,12 @@[m
       "devOptional": true,[m
       "license": "MIT"[m
     },[m
[32m+[m[32m    "node_modules/csv-parse": {[m
[32m+[m[32m      "version": "5.6.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/csv-parse/-/csv-parse-5.6.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-l3nz3euub2QMg5ouu5U09Ew9Wf6/wQ8I++ch1loQ0ljmzhmfZYrH9fflS22i/PQEvsPvxCwxgz5q7UB8K1JO4Q==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
     "node_modules/damerau-levenshtein": {[m
       "version": "1.0.8",[m
       "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex cf443e3..f6d5ed9 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -19,6 +19,7 @@[m
     "@types/nodemailer": "^6.4.17",[m
     "autoprefixer": "^10.0.1",[m
     "bcryptjs": "^3.0.2",[m
[32m+[m[32m    "csv-parse": "^5.5.6",[m
     "date-fns": "^4.1.0",[m
     "html2canvas": "^1.4.1",[m
     "jose": "^6.0.12",[m
[36m@@ -36,13 +37,13 @@[m
     "@testing-library/jest-dom": "^6.0.0",[m
     "@testing-library/react": "^14.0.0",[m
     "@testing-library/user-event": "^14.0.0",[m
[31m-    "@types/node": "^20",[m
[31m-    "@types/react": "^18",[m
[32m+[m[32m    "@types/node": "20.19.10",[m
[32m+[m[32m    "@types/react": "18.3.23",[m
     "@types/react-dom": "^18",[m
     "eslint": "^8",[m
     "eslint-config-next": "15.4.2",[m
     "jest": "^29.0.0",[m
     "jest-environment-jsdom": "^29.0.0",[m
[31m-    "typescript": "^5"[m
[32m+[m[32m    "typescript": "5.9.2"[m
   }[m
 }[m
[1mdiff --git a/prisma/migrations/20250814220129_init/migration.sql b/prisma/migrations/20250814220129_init/migration.sql[m
[1mnew file mode 100644[m
[1mindex 0000000..098beb0[m
[1m--- /dev/null[m
[1m+++ b/prisma/migrations/20250814220129_init/migration.sql[m
[36m@@ -0,0 +1,107 @@[m
[32m+[m[32m-- CreateEnum[m
[32m+[m[32mCREATE TYPE "public"."InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE');[m
[32m+[m
[32m+[m[32m-- CreateEnum[m
[32m+[m[32mCREATE TYPE "public"."BusinessArea" AS ENUM ('CREATIVE', 'DEVELOPMENT', 'SUPPORT');[m
[32m+[m
[32m+[m[32m-- CreateEnum[m
[32m+[m[32mCREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'ADDED', 'IGNORED');[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."clients" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "name" TEXT NOT NULL,[m
[32m+[m[32m    "email" TEXT NOT NULL,[m
[32m+[m[32m    "phone" TEXT,[m
[32m+[m[32m    "billing_address" TEXT,[m
[32m+[m[32m    "notes" TEXT,[m
[32m+[m[32m    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,[m
[32m+[m[32m    "updated_at" TIMESTAMP(3) NOT NULL,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."invoices" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "client_id" TEXT NOT NULL,[m
[32m+[m[32m    "invoice_number" TEXT NOT NULL,[m
[32m+[m[32m    "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'DRAFT',[m
[32m+[m[32m    "total_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,[m
[32m+[m[32m    "sent_date" TIMESTAMP(3),[m
[32m+[m[32m    "due_date" TIMESTAMP(3),[m
[32m+[m[32m    "paid_date" TIMESTAMP(3),[m
[32m+[m[32m    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,[m
[32m+[m[32m    "updated_at" TIMESTAMP(3) NOT NULL,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."invoice_items" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "invoice_id" TEXT NOT NULL,[m
[32m+[m[32m    "description" TEXT NOT NULL,[m
[32m+[m[32m    "quantity" DOUBLE PRECISION NOT NULL,[m
[32m+[m[32m    "rate" DOUBLE PRECISION NOT NULL,[m
[32m+[m[32m    "total" DOUBLE PRECISION NOT NULL,[m
[32m+[m[32m    "agency_commission" DOUBLE PRECISION NOT NULL DEFAULT 0,[m
[32m+[m[32m    "business_area" "public"."BusinessArea" NOT NULL DEFAULT 'CREATIVE',[m
[32m+[m[32m    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."expenses" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "description" TEXT NOT NULL,[m
[32m+[m[32m    "amount" DOUBLE PRECISION NOT NULL,[m
[32m+[m[32m    "category" TEXT NOT NULL,[m
[32m+[m[32m    "date" TIMESTAMP(3) NOT NULL,[m
[32m+[m[32m    "business_area" "public"."BusinessArea" NOT NULL DEFAULT 'CREATIVE',[m
[32m+[m[32m    "receipt_url" TEXT,[m
[32m+[m[32m    "notes" TEXT,[m
[32m+[m[32m    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,[m
[32m+[m[32m    "updated_at" TIMESTAMP(3) NOT NULL,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."bank_statement_imports" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "filename" TEXT,[m
[32m+[m[32m    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "bank_statement_imports_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateTable[m
[32m+[m[32mCREATE TABLE "public"."bank_transactions" ([m
[32m+[m[32m    "id" TEXT NOT NULL,[m
[32m+[m[32m    "import_id" TEXT NOT NULL,[m
[32m+[m[32m    "date" TIMESTAMP(3) NOT NULL,[m
[32m+[m[32m    "description" TEXT NOT NULL,[m
[32m+[m[32m    "amount" DOUBLE PRECISION NOT NULL,[m
[32m+[m[32m    "raw" JSONB,[m
[32m+[m[32m    "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING',[m
[32m+[m[32m    "expense_id" TEXT,[m
[32m+[m
[32m+[m[32m    CONSTRAINT "bank_transactions_pkey" PRIMARY KEY ("id")[m
[32m+[m[32m);[m
[32m+[m
[32m+[m[32m-- CreateIndex[m
[32m+[m[32mCREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");[m
[32m+[m
[32m+[m[32m-- CreateIndex[m
[32m+[m[32mCREATE UNIQUE INDEX "invoices_invoice_number_key" ON "public"."invoices"("invoice_number");[m
[32m+[m
[32m+[m[32m-- AddForeignKey[m
[32m+[m[32mALTER TABLE "public"."invoices" ADD CONSTRAINT "invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;[m
[32m+[m
[32m+[m[32m-- AddForeignKey[m
[32m+[m[32mALTER TABLE "public"."invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;[m
[32m+[m
[32m+[m[32m-- AddForeignKey[m
[32m+[m[32mALTER TABLE "public"."bank_transactions" ADD CONSTRAINT "bank_transactions_import_id_fkey" FOREIGN KEY ("import_id") REFERENCES "public"."bank_statement_imports"("id") ON DELETE CASCADE ON UPDATE CASCADE;[m
[1mdiff --git a/prisma/migrations/migration_lock.toml b/prisma/migrations/migration_lock.toml[m
[1mnew file mode 100644[m
[1mindex 0000000..044d57c[m
[1m--- /dev/null[m
[1m+++ b/prisma/migrations/migration_lock.toml[m
[36m@@ -0,0 +1,3 @@[m
[32m+[m[32m# Please do not edit this file manually[m
[32m+[m[32m# It should be added in your version-control system (e.g., Git)[m
[32m+[m[32mprovider = "postgresql"[m
[1mdiff --git a/prisma/schema.prisma b/prisma/schema.prisma[m
[1mindex a05e6d5..4c8cfaf 100644[m
[1m--- a/prisma/schema.prisma[m
[1m+++ b/prisma/schema.prisma[m
[36m@@ -89,4 +89,35 @@[m [menum BusinessArea {[m
   CREATIVE[m
   DEVELOPMENT[m
   SUPPORT[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/// Bank statement CSV imports and parsed transactions[m
[32m+[m[32mmodel BankStatementImport {[m
[32m+[m[32m  id           String            @id @default(cuid())[m
[32m+[m[32m  filename     String?[m
[32m+[m[32m  uploaded_at  DateTime          @default(now())[m
[32m+[m[32m  transactions BankTransaction[][m
[32m+[m
[32m+[m[32m  @@map("bank_statement_imports")[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mmodel BankTransaction {[m
[32m+[m[32m  id          String               @id @default(cuid())[m
[32m+[m[32m  import_id   String[m
[32m+[m[32m  date        DateTime[m
[32m+[m[32m  description String[m
[32m+[m[32m  amount      Float[m
[32m+[m[32m  raw         Json?[m
[32m+[m[32m  status      TransactionStatus    @default(PENDING)[m
[32m+[m[32m  expense_id  String?[m
[32m+[m
[32m+[m[32m  import      BankStatementImport  @relation(fields: [import_id], references: [id], onDelete: Cascade)[m
[32m+[m
[32m+[m[32m  @@map("bank_transactions")[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32menum TransactionStatus {[m
[32m+[m[32m  PENDING[m
[32m+[m[32m  ADDED[m
[32m+[m[32m  IGNORED[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/accounts/expenses/import/[id]/page.tsx b/src/app/accounts/expenses/import/[id]/page.tsx[m
[1mnew file mode 100644[m
[1mindex 0000000..138c9c5[m
[1m--- /dev/null[m
[1m+++ b/src/app/accounts/expenses/import/[id]/page.tsx[m
[36m@@ -0,0 +1,153 @@[m
[32m+[m[32m'use client';[m
[32m+[m
[32m+[m[32mimport { useEffect, useMemo, useState } from 'react';[m
[32m+[m[32mimport Navigation from '@/components/accounts/Navigation';[m
[32m+[m[32mimport Link from 'next/link';[m
[32m+[m[32mimport { useParams, useRouter } from 'next/navigation';[m
[32m+[m
[32m+[m[32minterface BankTransaction {[m
[32m+[m[32m  id: string;[m
[32m+[m[32m  date: string;[m
[32m+[m[32m  description: string;[m
[32m+[m[32m  amount: number;[m
[32m+[m[32m  status: 'PENDING' | 'ADDED' | 'IGNORED';[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default function ReviewImportPage() {[m
[32m+[m[32m  const params = useParams();[m
[32m+[m[32m  const router = useRouter();[m
[32m+[m[32m  const importId = params?.id as string;[m
[32m+[m[32m  const [transactions, setTransactions] = useState<BankTransaction[]>([]);[m
[32m+[m[32m  const [selected, setSelected] = useState<Record<string, boolean>>({});[m
[32m+[m[32m  const [categoryById, setCategoryById] = useState<Record<string, string>>({});[m
[32m+[m[32m  const [areaById, setAreaById] = useState<Record<string, 'CREATIVE' | 'DEVELOPMENT' | 'SUPPORT'>>({});[m
[32m+[m[32m  const [notesById, setNotesById] = useState<Record<string, string>>({});[m
[32m+[m[32m  const [isLoading, setIsLoading] = useState(true);[m
[32m+[m[32