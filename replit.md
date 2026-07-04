# TradeFX

A trading platform web application for traders to manage their portfolio, track performance, and view compound growth. Features a dark-themed UI with sidebar navigation.

## Run & Operate

- `pnpm --filter @workspace/tradefx run dev` — run the frontend (port 5173, served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (runtime-managed by Replit, no manual setup needed)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7, Tailwind CSS v4, shadcn/ui, Wouter (routing), TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/tradefx/src/` — React frontend source
  - `App.tsx` — root component, routing
  - `context/AppContext.tsx` — global app state
  - `components/Header.tsx`, `Sidebar.tsx` — layout shell
  - `pages/Profile.tsx` — trader profile page
  - `components/ui/` — shadcn/ui component library
- `artifacts/api-server/src/` — Express API source
  - `routes/` — route handlers
  - `app.ts` — Express app setup
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/db/src/schema/` — Drizzle ORM schema definitions
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not hand-edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not hand-edit)

## Architecture decisions

- OpenAPI-first: all API contracts defined in `lib/api-spec/openapi.yaml`, codegen produces typed hooks and Zod validators
- Frontend reads `PORT` and `BASE_PATH` from env vars (injected by the artifact workflow system)
- API server mounts all routes under `/api` prefix
- Database schema is empty by default — define tables in `lib/db/src/schema/` then run `pnpm --filter @workspace/db run push`

## Product

TradeFX is a trader dashboard with:
- **Profile page** — trader info, level/XP system, trading stats (total trades, win rate, profit factor, PnL)
- **Sidebar** — navigation for Dashboard, Portfolio, Compound, Journal, Calendar
- Dark theme with teal/green accent colors targeting forex/crypto traders

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, re-run codegen before using updated types: `pnpm --filter @workspace/api-spec run codegen`
- `DATABASE_URL` is runtime-managed by Replit; do not set it manually as a secret

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `.local/skills/react-vite/SKILL.md` for frontend build conventions
- See `.local/skills/pnpm-workspace/references/openapi.md` for OpenAPI + codegen workflow
