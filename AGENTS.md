<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server. Next 16 uses Turbopack by default; Tailwind v4 is wired through a `turbopack.rules` CSS block in `next.config.ts`, not a PostCSS/tailwind config file.
- `npm run lint` — bare `eslint` (flat config: core-web-vitals + typescript).
- There are **no test or typecheck scripts**. Typecheck with `npx tsc --noEmit` (tsconfig includes generated route types under `.next/types` and `.next/dev/types`).

## Stack conventions

- Import alias `@/*` → `src/*`.
- shadcn/ui with style `base-nova`: components use **Base UI primitives** (`@base-ui/react`), not Radix. Add components via `npx shadcn add <component>`; no tailwind config file — theme lives in `src/app/globals.css`.
- `reactCompiler: true` — don't hand-memoize with `useMemo`/`useCallback`/`React.memo`; the compiler handles it.
- `cacheComponents: true` — dynamic data access requires Suspense boundaries / `use cache`; check the Next docs guide listed above before writing server components.

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts`; client: `src/lib/auth-client.ts`; all auth endpoints are funneled through `src/app/api/auth/[...all]/route.ts`.
- Secrets/URI live in `.env`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB_CLIENT_URI` (MongoDB Atlas). Don't hardcode the connection string.
- `mongodb` and `@better-auth/mongo-adapter` are imported in `src/lib/auth.ts` but are **not** declared in `package.json` (they resolve transitively via `better-auth`). If they stop resolving, add them to dependencies instead of relying on hoisting.
