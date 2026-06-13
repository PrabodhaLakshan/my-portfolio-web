# W.M. Prabodha Lakshan Portfolio

A personal portfolio and content dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Auth.js, Vercel Blob, and YouTube.

## Features

- Responsive dark cyber-modern public portfolio
- Blob-managed profile, projects, skills, education, experience, certificates, services, and settings
- Credentials-based admin authentication with protected `/admin` routes
- Full create, update, and delete workflows
- Contact form with a read/unread admin inbox
- Project videos from direct Vercel Blob uploads or YouTube links
- Zod validation, animations, theme support, and toast feedback
- Vercel-ready build and environment configuration

This portfolio does not use a traditional database. Vercel Blob stores
`portfolio-data.json` and uploaded files. YouTube is used for large project demo
videos, while small videos can be uploaded directly to Vercel Blob. Admin login
uses server-side environment variables.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set:

   ```env
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@portfolio.dev
   ADMIN_PASSWORD=Admin@12345
   BLOB_READ_WRITE_TOKEN=
   PORTFOLIO_DATA_BLOB_PATH=portfolio-data.json
   ```

3. Start development:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Admin Login

- URL: `http://localhost:3000/login`
- Email: `admin@portfolio.dev`
- Development password: `Admin@12345`

Change the admin credentials before deploying to production.

## Verification

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Import this repository into Vercel and connect a Vercel Blob store.
2. Add `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `BLOB_READ_WRITE_TOKEN`, and `PORTFOLIO_DATA_BLOB_PATH` in Project Settings.
3. Set `NEXTAUTH_URL` to the final HTTPS production URL.
4. Deploy. The first successful admin write creates `portfolio-data.json`.

Run `npm install`, `npm run dev`, and `npm run build` with the same environment
variables locally. Without a Blob token, the public site renders the bundled
default data, but admin writes and uploads intentionally fail.
