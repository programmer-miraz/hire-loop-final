<!-- BEGIN:nextjs-agent-rules -->
<!-- Heed deprecation notices. Breaking changes: APIs/conventions/file structure differ from training data. Read node_modules/next/dist/docs/ before writing code. Re-add this block via `next dev` — verify at node_modules/next/dist/server/lib/generate-agent-files.js. -->

## Commands

- `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`) → runs `next dev`; app at http://localhost:3000.
- `npm run lint` → bare `eslint` (flat config: core-web-vitals + typescript).
- Typecheck: `npx tsc --noEmit` (tsconfig includes `.next/types` and `.next/dev/types`).
- Single test / focused verification: **no test files exist in this snapshot**. Package-lock lists `vitest` (^2/3/4/5) and `@playwright/test` ^1.51.1, but no `vitest.config.ts` / `playwright.config.ts` or test runner config. Create them and run `npx vitest run` (or `pnpm test`); coverage lives in `/coverage` (gitignored).
- Deploy: Vercel Platform (vercel.com/new?utm_*); docs at nextjs.org/docs/app/building-your-application/deploying.

## Build & Lint

- `npm run build` → `next build`; `npm run start` → `next start`.
- Turbopack default (Next 16); Tailwind v4 wired via `turbopack.rules` CSS block in `next.config.ts` (see below), **not** a separate tailwind.config.ts.

## Stack conventions

- Import alias `@/*` → `src/*`.
- shadcn/ui **base-nova**: add components via `npx shadcn add <component>`; no tailwind config file — theme lives in `src/app/globals.css`.
- `reactCompiler: true` — don't hand-memoize `useMemo`/`useCallback`/`React.memo`; the compiler handles it.
- `cacheComponents: true` — dynamic data access requires Suspense boundaries / `use cache`; see Next docs before writing server components.

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts`; client: `src/lib/auth-client.ts`; all auth endpoints funneled through `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler(auth)`).
- Secrets/URI live in `.env`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB_CLIENT_URI` (MongoDB Atlas) — **never hardcode**.
- `mongodb` and `@better-auth/mongo-adapter` are imported in `src/lib/auth.ts` but **not declared in `package.json`** (resolve transitively via `better-auth`). If tsc/build stops finding them, run `npm i @better-auth/mongo-adapter` and add both to dependencies.

## Data & UI

- Job roles: `src/data/roles.json` (ids 1–6, title, description, skills, companies).
- Feature cards: `src/data/features.json` (ids 1–12, icon→LucideIcon mapping in `features-section.tsx`).
- UI primitives come from `@/components/ui/*` (button, input, input wrapper, card, label, button, etc.) built with shadcn/ui base-nova.
- Mobile detection: `src/hooks/use-mobile.ts` — `useIsMobile()` watches `window.matchMedia('(max-width: 767px)')` and updates state on mount.

## Testing

- Vitest/Playwright are listed in `package-lock.json` but **no test files or config** are present. Add `vitest.config.ts` and/or `playwright.config.ts`, then run `npx vitest run` (or `pnpm test`). Ignore `/coverage` in gitignore.

## Form pages

- Sign up: `src/app/(main)/sign-up/page.tsx` — `handleSignup` calls `authClient.signUp.email({name, email, password, role, callbackURL})`; Google/GitHub social login via `authClient.signIn.social({provider})`.
- Login: `src/app/(main)/Login/page.tsx` — email sign-in (`authClient.signIn.email`) plus Google/GitHub.
- Home: `src/app/(main)/page.tsx` renders Banner, StatsSection, RolesSection, FeaturesSection.

## Layout & Theme

- Root layout (`src/app/layout.tsx`) injects `Geist` fonts (`--font-geist-sans`, `--font-geist-mono`), body background `bg-[#020204]`, full-height.
- `src/app/globals.css` holds Tailwind utility classes (no separate `tailwind.config.ts` — handled by the Turbopack `rules` block in `next.config.ts`).

## Dev server / entry points

- Entry defaults: `src/app/(main)/page.tsx` (Home), `src/app/(main)/sign-up/page.tsx`, `src/app/(main)/Login/page.tsx`.
- `npm run dev` starts Next.js on port 3000 (Turbopack).

## Pre-commit / CI

- No pre-commit hooks or task runners visible in the repo. Tests appear planned (vitest/playwright) but unconfigured — create the configs and wire them into CI when ready.

## Other

- Gitignore ignores: node_modules, `.pnp`, `.yarn/*`, coverage, `.next/`, `out/`, `build/`, debug logs, `.env*`, `.vercel`, `*.tsbuildinfo`, `next-env.d.ts`.
- `opencode.json` / session moves: use `tools.opencode.session_move` to switch sessions; worktree creation via `worktree_create(name)`.
- When in doubt, trust executable sources over prose (e.g., auth uses `betterAuth` + `mongodbAdapter(db,{client})` from `@better-auth/mongo-adapter`).
