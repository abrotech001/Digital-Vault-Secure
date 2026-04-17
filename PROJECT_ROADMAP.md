# Digital Vault Secure - Project Roadmap

## Project Overview
Digital Vault Secure is a Web3-enabled secure asset management application with a monorepo architecture using pnpm workspaces, TypeScript, Express backend, and React frontend with Vite.

---

## Directory Structure & File Organization

```
/
├── artifacts/                          # Production packages & applications
│   ├── api-server/                     # Express API backend
│   │   ├── src/
│   │   │   ├── app.ts                 # Express app configuration
│   │   │   ├── index.ts               # Server entry point
│   │   │   ├── lib/
│   │   │   │   └── logger.ts          # Pino logger setup
│   │   │   └── routes/
│   │   │       ├── index.ts           # Main router
│   │   │       └── health.ts          # Health check endpoint
│   │   ├── build.mjs                  # esbuild build script
│   │   ├── tsconfig.json              # TypeScript config
│   │   └── package.json               # API server dependencies
│   │
│   ├── web3nano/                       # React Vite frontend app
│   │   ├── src/
│   │   │   ├── App.tsx                # Main app component
│   │   │   ├── main.tsx               # React entry point
│   │   │   ├── index.css              # Global styles
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx           # Homepage
│   │   │   │   ├── Login.tsx          # Login page
│   │   │   │   ├── Dashboard.tsx      # Dashboard (main app)
│   │   │   │   └── not-found.tsx      # 404 page
│   │   │   ├── components/
│   │   │   │   ├── Layout.tsx         # Layout wrapper
│   │   │   │   ├── SecureAssetsFlow.tsx # Asset management
│   │   │   │   ├── ImportWallet.tsx   # Wallet import feature
│   │   │   │   ├── FloatingChat.tsx   # Chat component
│   │   │   │   ├── LanguageSwitcher.tsx # i18n language switcher
│   │   │   │   └── ui/                # 60+ shadcn/ui components (pre-built)
│   │   │   ├── hooks/
│   │   │   │   ├── use-mobile.tsx     # Responsive detection hook
│   │   │   │   └── use-toast.ts       # Toast notifications
│   │   │   ├── lib/
│   │   │   │   ├── i18n.tsx           # Internationalization setup
│   │   │   │   └── utils.ts           # Utility functions
│   │   ├── public/
│   │   │   ├── favicon.svg
│   │   │   └── opengraph.jpg
│   │   ├── vite.config.ts             # Vite + React plugins config
│   │   ├── tsconfig.json
│   │   ├── index.html                 # HTML template
│   │   └── package.json               # Frontend dependencies
│   │
│   └── mockup-sandbox/                 # Storybook-like UI component sandbox
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── index.css
│       │   ├── components/ui/          # Same shadcn/ui library
│       │   ├── hooks/
│       │   └── lib/
│       ├── vite.config.ts
│       ├── index.html
│       └── package.json
│
├── lib/                                # Shared libraries
│   ├── db/                             # Drizzle ORM database layer
│   │   ├── src/
│   │   │   ├── index.ts               # DB client export
│   │   │   └── schema/
│   │   │       └── index.ts           # Drizzle table schemas (currently empty)
│   │   ├── drizzle.config.ts          # Drizzle kit configuration
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api-spec/                       # OpenAPI specification & code generation
│   │   ├── openapi.yaml               # API specification
│   │   ├── orval.config.ts            # Orval code generation config
│   │   └── package.json
│   │
│   ├── api-zod/                        # Zod validation schemas (generated)
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── generated/
│   │   │       ├── api.ts             # Generated Zod schemas
│   │   │       └── types/
│   │   │           ├── healthStatus.ts
│   │   │           └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api-client-react/               # React hooks for API (generated)
│       ├── src/
│       │   ├── index.ts
│       │   ├── custom-fetch.ts        # Custom fetch wrapper
│       │   └── generated/
│       │       ├── api.ts             # Generated React Query hooks
│       │       └── api.schemas.ts
│       ├── tsconfig.json
│       └── package.json
│
├── scripts/                            # Utility & build scripts
│   ├── src/
│   │   └── hello.ts                   # Example script
│   ├── package.json
│   ├── post-merge.sh                  # Git post-merge hook
│   └── tsconfig.json
│
├── Root Config Files
│   ├── package.json                    # Workspace root config
│   ├── pnpm-workspace.yaml            # pnpm monorepo configuration
│   ├── pnpm-lock.yaml                 # Lock file (pnpm)
│   ├── tsconfig.json                  # Root TypeScript config
│   ├── tsconfig.base.json             # Base TypeScript paths config
│   └── replit.md                      # Original setup documentation
│
└── attached_assets/                    # User-provided screenshots/images
    └── (image files)
```

---

## Technology Stack

### Monorepo & Build
- **pnpm workspaces** - Package manager for monorepo
- **TypeScript** ~5.9.2 - Type safety
- **esbuild** - Fast bundling for API server
- **Vite** - Fast dev server & build for frontend
- **tsx** - TypeScript execution for scripts

### Backend
- **Express 5** - Web framework
- **Drizzle ORM** - Typesafe database layer
- **PostgreSQL** - Database (requires DATABASE_URL)
- **Pino** - High-performance logging
- **CORS** - Cross-origin requests
- **Cookie-parser** - Cookie handling

### Frontend
- **React 19.1.0** - UI library
- **Tailwind CSS** 4.1.14 - Styling
- **shadcn/ui** - 60+ pre-built components
- **Zod** - Runtime validation
- **React Hook Form** - Form state management
- **Wouter** - Lightweight routing
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **TanStack React Query** - Data fetching
- **next-themes** - Dark mode support
- **react-icons** - Icon library

### Code Generation
- **Orval** - OpenAPI → React hooks + Zod schemas
- **drizzle-zod** - Drizzle → Zod schemas

### Tooling
- **Prettier** - Code formatting
- **Replit plugins** - Dev banner, error modal, component mapping

---

## Key Features

### Web3 Integration
- Wallet import functionality (`ImportWallet.tsx`)
- Secure asset management (`SecureAssetsFlow.tsx`)
- Web3 transaction handling

### Frontend
- Multi-page app (Home, Login, Dashboard)
- Internationalization (i18n) support
- Dark mode theming
- Responsive design
- Component library sandbox

### Backend
- REST API with Express
- Health check endpoint
- Structured logging with Pino
- CORS support

### Developer Experience
- Type-safe API calls (Orval generated)
- Type-safe database queries (Drizzle)
- Type-safe validation (Zod)
- Workspace-level TypeScript
- Hot module replacement in development

---

## Environment Variables

### Required for Database
- **DATABASE_URL** - PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database`
  - Required by: `lib/db/drizzle.config.ts`, API server

### Optional for Development
- **NODE_ENV** - Set to "development" or "production"
- **CORS_ORIGIN** - CORS allowed origins (if configured in API)

### Optional for Frontend
- Any API endpoint variables if backend runs on different port

---

## Build & Development

### Development Workflow
```bash
# Install dependencies
pnpm install

# Type-check everything
pnpm run typecheck

# Run API server (port 3000)
pnpm --filter @workspace/api-server run dev

# Run frontend (port 5173)
pnpm --filter @workspace/web3nano run dev

# Run component sandbox (port 5174)
pnpm --filter @workspace/mockup-sandbox run dev
```

### Production Build
```bash
# Build all packages
pnpm run build

# Outputs:
# - artifacts/api-server/dist/index.mjs (API)
# - artifacts/web3nano/dist/ (Frontend static files)
```

### Database Management
```bash
# Push schema changes to database
pnpm --filter @workspace/db run push

# Regenerate API types from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen
```

---

## Package Relationships

```
artifacts/
  ├─ web3nano (frontend)
  │   └─ uses → @workspace/api-client-react (generated hooks)
  │       └─ uses → @workspace/api-zod (validation)
  │
  ├─ api-server (backend)
  │   └─ uses → @workspace/db (Drizzle ORM)
  │       └─ uses → @workspace/api-zod (validation)
  │
  └─ mockup-sandbox (UI development)

lib/
  ├─ api-spec (OpenAPI definition)
  │   → generates → api-zod & api-client-react
  │
  ├─ db (database layer)
  │   → used by → api-server
  │
  ├─ api-zod (generated validation)
  │   → used by → api-server & web3nano
  │
  └─ api-client-react (generated hooks)
      → used by → web3nano
```

---

## Next Steps for Development

1. **Define Database Schema** - Add tables to `lib/db/src/schema/`
2. **Expand API** - Add routes to `artifacts/api-server/src/routes/`
3. **Update OpenAPI Spec** - Modify `lib/api-spec/openapi.yaml`
4. **Regenerate API Client** - Run codegen to update hooks & schemas
5. **Build UI** - Use `artifacts/web3nano` for main app
6. **Test Components** - Use `artifacts/mockup-sandbox` for isolated development

---

## Performance Notes

- **Monorepo benefits**: Shared types, single lock file, unified builds
- **Code generation**: Orval ensures frontend/backend types stay in sync
- **Database**: Drizzle provides type-safe queries with no runtime overhead
- **Frontend**: Vite enables instant HMR with zero configuration
- **Logging**: Pino is optimized for Node.js performance

