# Mohamed CRM

Arabic-first CRM for **clients → bons → detail lines → payments**, with automatic totals (supplies / payments / balance). UI follows **acwafront** dashboard patterns (Somar Sans, tables, dialogs).

**Stack:** Next.js 16, React 19, Tailwind 4, next-intl, Prisma, SQLite (local, no Docker).

---

## Requirements

- **Node.js** 20+ (24 recommended in `package.json`)
- **npm** 10+

---

## How to run (first time)

1. **Clone the repo**

   ```bash
   git clone https://github.com/Ziadd-Zamel/mohamed-crm.git
   cd mohamed-crm
   ```

2. **Environment**

   This repository includes a committed **`.env`** for local dev. After clone you do **not** need to copy `.env.example` unless you prefer your own values.

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | SQLite file (`file:./dev.db` under `prisma/`) |
   | `NEXT_PUBLIC_APP_URL` | App URL (default `http://localhost:3000`) |
   | `NEXTAUTH_*` | Scaffold for future auth (unused for now) |

   > **Production:** change `NEXTAUTH_SECRET` and do not reuse dev secrets.

3. **Install & database**

   ```bash
   npm install
   npm run db:push
   ```

   Optional empty seed (creates admin user only, no demo clients):

   ```bash
   npm run db:seed
   ```

4. **Start dev server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   - Arabic (default): [http://localhost:3000/ar](http://localhost:3000/ar)
   - English: [http://localhost:3000/en](http://localhost:3000/en)

   Main areas: **Dashboard** `/`, **Clients** `/clients`.

---

## How to run (every day)

```bash
npm run dev
```

---

## Useful scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run db:push` | Apply Prisma schema to SQLite |
| `npm run db:seed` | Seed admin user; clears CRM demo data |
| `npm run db:clear` | Delete all clients, bons, lines, payments |
| `npm run db:studio` | Prisma Studio (inspect DB) |
| `npm run lint` | Biome + ESLint |

---

## Project layout

```text
src/app/[locale]/(dashboard)/   # Dashboard + Clients routes
src/Components/features/        # Clients UI, tables, dialogs
src/Components/layout/dashboard # Sidebar shell
prisma/schema.prisma            # Client, Bon, BonLine, Payment
locales/ar.json, en.json        # Translations
```

---

## Auth & Docker

- **Login is not enabled** yet — the app is a single CRM dashboard.
- **Docker / Postgres are optional**; local setup uses SQLite only (`docker-compose.yml` is not required).

---

## Deploy note

SQLite and a committed `.env` are fine for **local** use. For a server that stays up when your PC is off, deploy to **Vercel** (or a VPS) and switch Prisma to a hosted database (e.g. Postgres) with env vars set on the host — not the dev `.env` file in git.