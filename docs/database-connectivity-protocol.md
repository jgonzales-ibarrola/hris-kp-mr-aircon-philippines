# 🏗️ Database Connectivity Protocol

This documentation outlines the protocol for managing database connections within our Next.js and Prisma stack. The goal is to prioritize **Local Development (PostgreSQL/pgAdmin)** to preserve **Supabase Free Tier** quotas and ensure high-speed development.

---

## 1. Environment Variable Hierarchy
We utilize the Next.js built-in environment variable priority to toggle between environments.

* **`.env` (Committed to Git):** Contains the "Safe" defaults. This file points to a standard local PostgreSQL instance. It serves as the baseline for any new developer joining the project.
* **`.env.local` (Git Ignored):** Contains project secrets and remote connection strings. This file **overrides** `.env`. Use this for Supabase credentials.

### Standard Configuration

**File: `.env`**
```bash
# Default: Local pgAdmin / Docker Postgres
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_app_db?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/my_app_db?schema=public"
```

**File: `.env.local`**
```bash
# Overrides: Remote Supabase (Comment out when not in use)
# DATABASE_URL="postgres://postgres.project:pass@aws-0-pooler.supabase.com:6543/postgres?pgbouncer=true"
# DIRECT_URL="postgres://postgres.project:pass@aws-0-supabase.com:5432/postgres"
```

---

## 2. Prisma Schema Configuration
To support both local (Direct) and Supabase (Pooled) connections, the `schema.prisma` must be configured with both `url` and `directUrl`.

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

> **IMPORTANT:** When working locally, `DATABASE_URL` and `DIRECT_URL` can point to the same local string. When using Supabase, `DATABASE_URL` **must** use port 6543 (Transaction Mode), and `DIRECT_URL` **must** use port 5432 (Session Mode) for migrations.

---

## 3. Workflow Rules

### A. Standard Development (Daily Work)
* **Rule:** Keep Supabase credentials commented out in `.env.local`.
* **Action:** Run `npx prisma migrate dev` to track changes in your local pgAdmin instance.
* **Benefit:** Zero latency and no impact on Supabase egress or storage limits.

### B. Pre-Deployment Sync (Staging)
* **Rule:** Only connect to Supabase when schema changes are finalized and ready for the team.
* **Action:** 1. Uncomment Supabase strings in `.env.local`.
    2. Run `npx prisma generate`.
    3. Run `npx prisma db push` to sync the remote schema without polluting the migration history of the cloud DB during testing.

### C. Production Deployment
* **Rule:** Never use `.env.local` for production. 
* **Action:** Credentials must be set via the CI/CD provider (e.g., Vercel Dashboard, GitHub Secrets).

---

## 4. Quick Comparison

| Scenario | Target DB | Primary Command | DATABASE_URL Port |
| :--- | :--- | :--- | :--- |
| **Feature Drafting** | Local (pgAdmin) | `prisma migrate dev` | 5432 |
| **UI/Logic Dev** | Local (pgAdmin) | `npm run dev` | 5432 |
| **Schema Testing** | Supabase | `prisma db push` | 6543 |
| **Production** | Supabase | Managed by CI/CD | 6543 |

---

## 5. Troubleshooting & Best Practices

* **Schema Drift:** If your local DB and Supabase get out of sync, prioritize the local migration files. They are the "Source of Truth."
* **Database Reset:** If you need to wipe your local data without affecting the team, run `npx prisma migrate reset`. **Double-check that your `.env.local` is pointing to `localhost` before running this.**
* **Supabase Pausing:** Remember that Supabase Free Tier projects pause after 1 week of inactivity. If the remote connection fails during a sync, check the Supabase Dashboard to resume the project.
