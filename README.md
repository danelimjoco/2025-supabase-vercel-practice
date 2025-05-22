# 2025-supabase-vercel-practice

## Overview

This project is a minimal full-stack demo using:
- **Next.js** (React) for the frontend, hosted on Vercel
- **Supabase** for the backend (Postgres database, API, and authentication)
- Dummy data loaded into Supabase for demonstration
- The frontend is live and directly connected to the Supabase database

### Rapid Iteration
- The project is set up for rapid prototyping: pushing changes to the `main` branch on GitHub will automatically trigger a redeploy on Vercel.
- This means you can update the UI or logic, push to GitHub, and see your changes live within seconds—perfect for fast iteration and user demos.

**Relevant Links:**
- [Live Vercel App](https://2025-supabase-vercel-practice.vercel.app/)

## File & Folder Structure

```
/2025-supabase-vercel-practice
├── app/
│   ├── components/
│   │   └── RevenuePlot.tsx      # Main chart and filter UI
│   ├── globals.css              # Tailwind and global styles
│   ├── layout.tsx               # App-wide layout, loads Montserrat font and CSS
│   └── page.tsx                 # Home page, renders title and RevenuePlot
├── lib/
│   └── supabase.ts              # Supabase client config for DB access
├── node_modules/                # Installed dependencies
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Exact dependency versions (auto-generated)
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript config
├── next-env.d.ts                # Next.js TypeScript types
├── .gitignore                   # Files/folders to ignore in git
```

### File-by-File Explanation

- **app/components/RevenuePlot.tsx**: Main UI component for the chart and company filter dropdown.
- **app/globals.css**: Tailwind CSS directives and any global styles.
- **app/layout.tsx**: Root layout for the app. Loads Montserrat font, imports global CSS, and wraps all pages.
- **app/page.tsx**: Home page. Renders the centered title and the `RevenuePlot` component.
- **lib/supabase.ts**: Configures and exports the Supabase client for use throughout the app.
- **node_modules/**: All installed dependencies.
- **package.json / package-lock.json**: Project dependencies, scripts, and lockfile for reproducible installs.
- **README.md**: Project documentation, overview, and usage instructions.
- **tsconfig.json**: TypeScript configuration for the project.
- **next-env.d.ts**: Next.js TypeScript environment types.
- **.gitignore**: Specifies files and folders to ignore in git.

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
