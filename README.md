# Shissho — Learning Management System Platform

A Learning Management System for a seamless learning experience, featuring role-based access control.

## Tech Stack

- Frontend: Next.js (Vercel) — https://shissho.vercel.app
- Backend: Strapi (Railway) — https://shissho-production.up.railway.app
- Database: PostgreSQL

## Roles

- **Admin** — full platform control, user role management, manages all courses/lessons.
- **Content Manager** — manages all courses/lessons.
- **Instructor** — manages own courses/lessons.
- **Student** — enrolls in courses, views lessons.

## Features Completed

- ✅ Authentication and Authorization
- ✅ Role-based access (backend-enforced via custom policies)
- ✅ Course & Lesson Management CRUD (role-restricted)
- ✅ Course enrollment + "My Courses"
- ✅ Sequential lesson viewing
- ✅ Admin Panel (user role management, platform stats)

## How to Run Locally

### Backend (Strapi)

```bash
cd server
npm install
npm run develop
```
Create a `.env` file in `server/` based on `.env.example`, with the following keys:

```dotenv
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate your own strings for these)
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
TRANSFER_TOKEN_SALT=
ENCRYPTION_KEY=

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=shissho
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_FILENAME=
```

Requires a local PostgreSQL instance running with a database matching `DATABASE_NAME`.

- Admin panel available at http://localhost:1337/admin

### Frontend (Next.js)

```bash
cd web
npm install
npm run dev
```
Create a `.env.local` file with:  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```bash
npm run dev
```
App available at http://localhost:3000
