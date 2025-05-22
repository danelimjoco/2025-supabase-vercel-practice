# 2025-supabase-vercel-practice

## Available npm Commands

- `npm install`
  - Install all dependencies.

- `npm run dev`
  - Start the development server (usually at http://localhost:3000).

- `npm run build`
  - Build the application for production.

- `npm start`
  - Start the production server (after building).

- `npm run lint`
  - Run ESLint to check for code quality issues.

## Architecture Overview

This project is a minimal full-stack app using:
- **Next.js** (React) for the frontend, hosted on Vercel
- **Supabase** for the backend (Postgres database, API, and authentication)
- The frontend communicates directly with Supabase using the public API keys

**Relevant Links:**
- [Supabase Project Dashboard](https://supabase.com/dashboard/project/nvmfgfbwbmalupiblcpf)
- [Live Vercel App](https://2025-supabase-vercel-practice.vercel.app/)

## Enabling RLS for SELECT and INSERT

If Row Level Security (RLS) is enabled on your Supabase tables, you must add policies to allow anonymous access for development/testing. Example for the `companies` table:

```sql
-- Allow anyone to select from companies
CREATE POLICY "Allow select for all" ON companies
  FOR SELECT
  USING (true);

-- Allow anyone to insert into companies
CREATE POLICY "Allow insert for all" ON companies
  FOR INSERT
  WITH CHECK (true);
```

For production, restrict these policies to authenticated users.