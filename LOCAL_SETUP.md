### MPDEE Creative — Fresh Machine Setup Guide

This guide gets a clean PC with a fresh Cursor install ready to work on this project.

---

### 1) Prerequisites

- Node.js 20 LTS (recommended). Verify:
```bash
node -v && npm -v
```
- Git (use Git Bash on Windows).
- Package manager: npm (project uses `package-lock.json`).
- Optional: Docker Desktop (for local Postgres), PostgreSQL client tools.

---

### 2) Get the code onto the new machine

- Copy the project folder to your workspace (e.g., `D:/Websites/mpdee-creative`).
- If you copied `node_modules` or `.next`, remove them:
```bash
rm -rf node_modules .next
```

---

### 3) Install dependencies

- Clean, lockfile-based install:
```bash
npm ci
```

Notes:
- `postinstall` runs `prisma generate` automatically.
- If `npm ci` fails (lockfile mismatch), use:
```bash
npm install
```

---

### 4) Environment variables

Create `/.env.local` in the project root. Use `/.env.example` (included) as a starting point. Variables used by the app:

- Authentication
  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`
  - `NEXTAUTH_SECRET`
- Database (Prisma - PostgreSQL)
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
- Email (SMTP)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
- Company/Invoice
  - `COMPANY_NAME`, `COMPANY_EMAIL`, `COMPANY_PHONE`
  - `INVOICE_PREFIX` (optional; defaults to `INV`)

Example (`.env.local`):
```bash
# Auth
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="change-me"
NEXTAUTH_SECRET="generate-a-long-random-string"

# Database (Local Postgres example)
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:5432/mpdee?schema=public&connection_limit=1&pgbouncer=false"
POSTGRES_URL_NON_POOLING="postgresql://postgres:postgres@localhost:5432/mpdee?schema=public"

# SMTP (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="you@gmail.com"
SMTP_PASSWORD="app-specific-password"

# Company/Invoices
COMPANY_NAME="MPDEE Creative"
COMPANY_EMAIL="you@domain.com"
COMPANY_PHONE="+44 0000 000000"
INVOICE_PREFIX="INV"
```

---

### 5) Database setup (local Postgres option)

Run Postgres with Docker (example):
```bash
docker run --name mpdee-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mpdee -p 5432:5432 -d postgres:16
```

Then sync the schema:
```bash
npx prisma db push
```

If you later add Prisma migrations:
```bash
npx prisma migrate dev
```

Useful checks:
```bash
npx prisma generate
npx prisma studio
```

---

### 6) Run the app

```bash
npm run dev
```

Open `http://localhost:3000`. Admin login is at `/accounts/login` using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

Build and start (optional):
```bash
npm run build
npm start
```

---

### 7) Tests (optional)

```bash
npm test
```

If Jest reports missing modules, install these dev-only dependencies:
```bash
npm i -D babel-jest identity-obj-proxy
```

---

### 8) Tooling and configs

- Next.js: `next.config.js` (removes console in production; marks Prisma/bcryptjs as server externals).
- TypeScript: `tsconfig.json` with path alias `@/* -> ./src/*`.
- Tailwind: `tailwind.config.js` and `postcss.config.js` preconfigured.
- Vercel: `vercel.json` (`framework: nextjs`).

---

### 9) Cursor/Editor tips

- Use the built-in NPM scripts pane to run `dev`, `build`, and `test`.
- Ensure the terminal uses Git Bash on Windows.
- Recommended extensions: Tailwind CSS IntelliSense.

---

### 10) Troubleshooting

- Prisma cannot connect: verify `POSTGRES_PRISMA_URL` and that Postgres is running and reachable.
- Emails not sending: verify `SMTP_*` values; Gmail often requires an app password and 2FA.
- Blank pages in dev: clear `.next` and restart: `rm -rf .next && npm run dev`.

---

### Reference: Key scripts

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm start        # Start production server
npm test         # Run tests
```


