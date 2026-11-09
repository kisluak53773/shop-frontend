# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

`C:\projects\pet project` is not a git repo itself. It holds two independent repos:

- `books-store-frontend/` (this one): React Router v8 framework-mode app, SSR enabled (`react-router.config.ts`), React 19, Tailwind v4, TanStack Query, zod.
- `../book-store-backend/`: Laravel 13 + Sanctum JSON API, organized by domain under `app/{User,Product,Category,Cart,Order}`. Routes are in `routes/api.php` under `/api`. Its commands: `composer test`, `composer lint` (php-cs-fixer check), `composer format`, `composer dev`.

## Commands (run in `books-store-frontend/`)

```bash
npm run dev         # dev server with HMR, http://localhost:5173
npm run build       # production build -> build/client + build/server
npm run start       # serve the build (react-router-serve)
npm run typecheck   # react-router typegen && tsc
```

There is no lint or test setup in this package. `typecheck` is the only static check. It must run `typegen` first because `./+types/*` imports and `.react-router/types` are generated.

Required env (copy `.env.example` to `.env`): `SESSION_SECRET` (min 32 chars) and `API_BASE_URL` (the Laravel server, default `http://localhost:8000`). `env.server.ts` parses them with zod at import time, so the server crashes on boot if either is missing or invalid. The client-visible env is `VITE_*` only (`env.client.ts`).

## Architecture

### Layers (Feature-Sliced style, `~/` = `app/`)

`shared` -> `entities` -> `features` -> `widgets` -> `pages` -> `routes`. Import only downward. Each slice exposes a public API through its `index.ts`.

- `routes.ts` is the explicit route table. Every file in `routes/` is a thin re-export wiring a page's `default`, `loader`, `action` and `meta` to a URL (e.g. `routes/account.tsx` re-exports from `~/pages/account`). Put real logic in `pages/`, not in `routes/`.
- `pages/<name>/` holds the page component plus its `loader.server.ts` / `action.server.ts`.
- `features/auth/` holds auth forms, the `api/` calls and the `model/` (session, auth context).
- `widgets/header/` is the global header, rendered in the root `Layout` in `root.tsx`.
- `shared/ui` holds `Button` and `Input`. `shared/ui/icons/` holds all SVG icons (one default-exported component per file, re-exported by name from `icons/index.ts`). `shared/api` is the API client. `shared/lib` holds env and `safeRedirect`.

### Backend-for-frontend auth flow

The browser never talks to Laravel and never sees the API token.

1. `loginAction` / register action call `apiFetch` (`shared/api/client.server.ts`, which prefixes `API_BASE_URL` and attaches `Authorization: Bearer`) and get a Sanctum token.
2. `createSessionAndRedirect` stores the token in an httpOnly signed cookie `__session` (7 days). Cookie code is in `features/auth/model/session.server.ts`.
3. The root `loader` in `root.tsx` runs on every request and calls `/api/auth/me` with the cookie token. It returns `{ isAuthenticated, user }`, which `Layout` passes to `AppProvider` -> `AuthProvider`. Components read it through `useAuth()`.
4. Protected loaders call `requireToken(request)`, which redirects to `/login` when there is no token (see `pages/account/loader.server.ts`).
5. Logout is a POST to the `/logout` route (a `<Form method="post" action="/logout">`).

`*.server.ts` files are server-only. Anything that touches `serverEnv`, the session or `apiFetch` must stay in them. `apiFetch` throws `ApiError(status, payload)` on non-2xx, and actions map that to form errors (401/422 -> "Invalid credentials").

### Styling

Tailwind v4 is configured CSS-first in `app/app.css` (`@theme`), with no `tailwind.config`. The palette comes from the Figma "Ecommerce Website Design" file and is exposed as semantic tokens: `primary`, `surface`, `surface-tint`, `heading`, `body`, `ink`, `border`, `line`, `success`. Prefer these over raw hex or gray scales.

`Button` has `variant` (primary | secondary | outline | ghost | link), `size` (sm | md | icon), `pill` and `fullWidth`. It is not full-width by default. `buttonVariants()` returns the same class string, so a `Link` can look like a button. Reuse it instead of hand-styling anchors.

## Gotchas

- `requireToken` redirects to `/login?redirect=<path>`, but `LoginForm` reads the `redirectTo` query param, so the post-login redirect from a protected page currently falls back to `/`. Align the two names if you touch this flow.
- `clsx` is imported by `Button` but is not in `package.json` (it resolves transitively). Add it explicitly if you modify dependencies.
- `QueryProvider` hardcodes `staleTime: 30000` and does not read `clientEnv.VITE_QUERY_STALE_TIME`. It also has a leftover `console.log(clientEnv)`.
- `.agents/skills/react-router/` contains reference docs for React Router framework/data/declarative/RSC modes. This project uses framework mode.

## Code Style & Conventions
- **CSS / Styling Sizing:** Always use `rem` units for font sizes, padding, margins, and layout dimensions. Do not use `px`, `em`, or other absolute units unless explicitly requested.
- **Icons:** Every icon lives in `shared/ui/icons/`, takes `React.SVGProps<SVGSVGElement>` spread last, uses `width="1em" height="1em"` and `currentColor` fills, so size and color are set from the call site with classes (`<AccountIcon className="size-6 text-primary" />`). Never inline `<svg>` in components.
