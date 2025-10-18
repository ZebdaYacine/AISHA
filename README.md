# Aicha Marketplace Monorepo

This repository contains the code for **Aicha**, a curated marketplace that highlights Algerian craftsmanship. The project is split into a Vite/React frontend and a Go/Fiber backend that work together to provide authentication, product discovery, cart & order management, and artisan tooling.

---

## Table of Contents
- [Key Features](#key-features)
- [Repository Layout](#repository-layout)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Static Catalog & Media Assets](#static-catalog--media-assets)
- [Development Tips](#development-tips)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Key Features
- **Curated product browsing** with category & subcategory navigation (`/category/:categorySlug/:subcategorySlug`) and a static gallery-backed catalog for featured collections.
- **Rich product detail page** including image zoom, thumbnail slideshow, inventory display, delivery options, and add-to-cart / buy-now flows that connect to Firebase Realtime Database.
- **Firebase-powered user experience** for authentication, carts, orders, and profiles; Auth and Profile context providers keep the UI reactive across the app.
- **Responsive navigation** with mobile and desktop variants, craft menus, and user/account actions.
- **Go backend for OAuth & session management** using Fiber, Ent, Redis, and Google Sign-In to support secure authentication flows and protected API routes.
- **Mission, profile, store management, and artisan tooling** backed by modular feature folders to keep the project maintainable as it grows.

---

## Repository Layout
```
aisha/
├── frontend/              # Vite + React + Tailwind application
│   ├── src/
│   │   ├── core/          # Shared components, state, hooks, firebase, navbar
│   │   ├── feature/       # Feature-specific pages and viewmodels
│   │   └── App.tsx        # Root router & provider composition
│   └── dist/aisha/        # Curated media used for the static catalog
├── backend/               # Go Fiber API for auth/session handling
│   ├── cmd/main.go        # Application entrypoint
│   ├── api/               # Controllers, routers, middleware
│   ├── feature/auth/      # Auth domain (repositories, use cases, state)
│   ├── core/              # App initialization helpers
│   └── pkg/               # Configuration, database, and utility packages
└── tasks/                 # Project management notes / TODOs (optional)
```

---

## Frontend Overview
- **Framework & Tooling:** React 19, Vite 7, TypeScript, TailwindCSS, DaisyUI, SWR.
- **State Management:** React Context for auth (`frontend/src/core/state/AuthContext.tsx`), profile (`frontend/src/core/state/profileContext.tsx`), and crafts (`frontend/src/core/state/craftsContext.tsx`).
- **Routing:** React Router v7 (`frontend/src/App.tsx`) defines the key experiences: home, register/login, profile, store, product details, cart, orders, mission, and category browsing.
- **Firebase Integration:** `frontend/src/core/firebase/config.ts` initializes Firebase Auth, Realtime Database, and Firestore; realtime database powers cart counts and product/order interactions.
- **Static Catalog:** Featured categories use `frontend/src/feature/shop/category/data/staticCategoryProducts.ts` to serve curated products that ship with the repo. Each static item includes a gallery array used by the product detail slideshow.
- **UI Highlights:**
  - `frontend/src/core/components/ProductCard.tsx` handles click navigation, favourite animations, and buy/edit actions.
  - `frontend/src/feature/store/view/components/ProductGallery.tsx` renders a zoomable hero image with thumbnail navigation.
  - The homepage gently fades video volume as users scroll (`frontend/src/feature/HomePage.tsx`).

---

## Backend Overview
- **Language & Framework:** Go 1.24 with Fiber 2 as the HTTP framework.
- **Authentication:** Google OAuth 2.0 via `golang.org/x/oauth2/google`, with Redis-backed state/session stores.
- **Data Layer:** Ent ORM for MySQL (`backend/pkg/database`), Redis for sessions, and structural separation between repository/usecase/controller layers.
- **Routers:** Public routes expose health checks and the OAuth handshake; private routes are protected by JWT middleware that verifies session tokens (`backend/api/router/route.go`).
- **Configuration:** `backend/pkg/config.go` loads `.env` values (falling back to OS environment variables) and enforces required settings for secrets, DB, and OAuth credentials.

---

## Prerequisites
| Component   | Requirement                                                  |
|-------------|--------------------------------------------------------------|
| Node.js     | v20+ recommended (for `frontend/`)                           |
| npm         | v10+ (installed with Node)                                   |
| Go          | 1.24 (toolchain go1.24.8)                                    |
| MySQL       | Running instance accessible via the `DATABASE_URL` DSN       |
| Redis       | v6+ (matching `REDIS_ADDR`), used for state/session storage  |
| Firebase    | Project configured with Auth + Realtime Database + Firestore |
| Google OAuth| OAuth client credentials (Web type)                          |

---

## Getting Started

### Environment Variables
Create the following files (or supply variables via your shell). Copy the samples and replace with project-specific values.

#### `backend/.env`
```
SERVER_ADDRESS=0.0.0.0
SERVER_PORT=8080
SECRET_KEY=replace-with-random-32-byte-string
DATABASE_URL=user:password@tcp(127.0.0.1:3306)/aicha?parseTime=true
REDIS_ADDR=127.0.0.1:6379
REDIS_PASSWORD=
REDIS_DB=0
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URL=http://localhost:8080/auth/google/callback
OAUTH_STATE_TTL_MINUTES=10
SESSION_TOKEN_TTL_MINUTES=30
REFRESH_TOKEN_TTL_MINUTES=10080
ALLOWED_ORIGINS=http://localhost:5173
APP_ENV=development
```

#### `frontend/.env`
The Firebase config is currently hard-coded in `frontend/src/core/firebase/config.ts`. If you prefer environment-based configuration, create an `.env` file and update the config to read from `import.meta.env`. Example (after updating the code):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # serves on http://localhost:5173
npm run build      # type-check + bundle
npm run lint       # eslint with React hooks & refresh plugins
```
The frontend expects the backend to be reachable at the base URL configured in Firebase functions and environment variables, and for the hero media to exist under `frontend/dist/aisha/`.

### Backend
```bash
cd backend
go mod tidy
go run ./cmd/main.go
```
The server listens on the address returned by `cfg.ListenAddr()` (defaults to `0.0.0.0:8080`). Ensure MySQL and Redis are reachable before starting the server.

---

## Static Catalog & Media Assets
- Featured category pages pull from `frontend/src/feature/shop/category/data/staticCategoryProducts.ts`.
- Media is bundled inside `frontend/dist/aisha/` (grouped into `textiles/`, `home decor/`, `gifts/`, etc.).
- Product IDs in the static dataset double as route parameters for `/product/:id`; if the backend does not return a product, the UI gracefully falls back to this static data (`frontend/src/feature/store/view/pages/ProductDetailsPage.tsx`).
- To replace assets, swap files in `frontend/dist/aisha/...` and update the URLs in the static dataset file.

---

## Development Tips
- **Auth Context:** Wrap authenticated components with `AuthProvider` (already done in `frontend/src/App.tsx`). Use `useAuth()` and `useProfileContext()` hooks for reactive user data.
- **Product Gallery:** Provide a `gallery` array when creating new products so the slideshow renders multiple images out-of-the-box.
- **Homepage Video:** The hero video volume is tied to scroll position (`frontend/src/feature/HomePage.tsx`). Adjust `maxScroll` or the clamp logic to change the fade profile.
- **Styling:** Tailwind configuration lives in `frontend/tailwind.config.js`, and DaisyUI is available for component themes.
- **API Extensions:** Add new handlers under `backend/api/controller`, register them via `backend/api/router`, and protect them with the appropriate middleware.

---

## Available Scripts
| Location  | Command             | Description                                      |
|-----------|---------------------|--------------------------------------------------|
| frontend  | `npm run dev`       | Start the Vite dev server                        |
| frontend  | `npm run build`     | Type-check then bundle for production            |
| frontend  | `npm run preview`   | Preview the production build locally             |
| frontend  | `npm run lint`      | Run ESLint across the project                    |
| backend   | `go run ./cmd/main.go` | Launch the Fiber server                        |
| backend   | `go test ./...`     | (Add tests to enable) Run Go unit tests          |

---

## Troubleshooting
- **Frontend cannot reach backend:** Confirm `ALLOWED_ORIGINS` includes the dev origin and that the backend is running.
- **Google OAuth redirect mismatch:** Update `GOOGLE_REDIRECT_URL` in both Google Cloud Console and `backend/.env`.
- **Video autoplay muted:** Browsers block autoplay with sound until user interaction. The homepage script attempts to play and gracefully handles rejections; clicking the video will unmute it.
- **Static product not found:** Ensure the `id` in `staticCategoryProducts` matches the route and that image paths point to existing files within `frontend/dist/aisha/`.
- **Database connection errors:** Verify your `DATABASE_URL` DSN (Ent expects a standard MySQL DSN with `parseTime=true`).

---

## License
No explicit license is provided. Treat the contents as proprietary unless the project maintainers state otherwise.

For questions or contributions, open an issue or reach out directly to the maintainers.

