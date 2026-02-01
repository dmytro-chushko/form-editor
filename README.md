# Form Builder

A Next.js application for building, publishing, and collecting submissions for custom forms. It includes an authenticated admin area with a drag-and-drop editor and a public-facing form experience.

## Features

- Authenticated admin area with form creation and editing
- Public shareable forms for submissions
- Results dashboard and export
- Email notifications for verification and sharing
- File uploads backed by Supabase storage

## Tech stack and how it is used

- Next.js 15 (App Router) for routing, server components, and API route handlers
- React 19 for UI composition
- TypeScript for type safety across the codebase
- Tailwind CSS v4 and shadcn/ui (Radix primitives) for UI components and styling
- Prisma + PostgreSQL for database access and migrations
- Auth.js (next-auth) with Prisma adapter for session-based auth
- Puck Editor for drag-and-drop form configuration
- TanStack Query for client-side data fetching and caching
- TanStack Table for data tables
- React Hook Form + Zod for form handling and validation
- Resend for transactional email delivery
- Supabase storage for file uploads
- ESLint + Prettier + Husky/lint-staged for code quality
- Docker + Docker Compose for containerized deployment

## Project structure

- `src/app` — routes and API handlers (App Router)
- `src/components` — UI and feature components
- `src/features` — domain modules (forms, results, profile, puck)
- `src/lib` — shared utilities and service clients
- `docker/` — Dockerfile and compose configuration

## Requirements

- Node.js 20+
- npm
- Docker Desktop (for containerized deployment)
- Make (optional, for `make` targets on Windows via Git Bash)

## Environment variables

Create a local `.env` file at the project root. Required keys used in this project:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `SESSION_COOKIE_NAME`
- `AUTH_SECRET`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `SUPABASE_URL`
- `SUPABASE_ANON_API_KEY`
- `SUPABASE_BUCKET`
- `ENCRYPTION_KEY`

Keep `.env` out of version control.

## Local development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3003`.

## Docker deployment

The Docker build uses BuildKit secrets for `DATABASE_URL` to run `prisma generate` during build.

Build and run with Make:

```bash
make build
make up-runtime
```

Common targets:

```bash
make up        # start services
make down      # stop services
make logs      # follow logs (all services)
make migrate   # run Prisma migrations in container
```

If you do not have `make`, use Docker Compose directly:

```bash
docker compose -f docker/docker-compose.yml --env-file .env build
docker compose -f docker/docker-compose.yml --env-file .env up -d
```

## Troubleshooting

- Missing env errors during build: ensure `.env` exists and `DATABASE_URL` is set.
- BuildKit secrets: Docker Desktop must support BuildKit for build-time secrets.
- Check container logs: `make logs` or `docker compose ... logs -f app`.
