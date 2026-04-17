# Environment Variables Setup Guide

## Overview
This project requires environment variables for database connectivity and API configuration. The setup depends on your deployment target.

---

## Required Variables

### `DATABASE_URL` (REQUIRED)
**Description**: PostgreSQL database connection string  
**Required for**: 
- Database schema management (Drizzle)
- API server runtime
- Development and production

**Format**:
```
postgresql://username:password@hostname:port/database_name
```

**Examples**:
- **Local**: `postgresql://postgres:password@localhost:5432/digital_vault`
- **Vercel Postgres**: `postgresql://user:password@db.verceldb.com:5432/dbname?sslmode=require`
- **Neon**: `postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require`
- **Railway**: `postgresql://user:password@container.railway.app:5432/railway`

---

## Optional Variables

### `NODE_ENV`
**Description**: Runtime environment  
**Values**: `development` | `production`  
**Default**: `production`  
**Used by**: Logging configuration, error handling

### `CORS_ORIGIN`
**Description**: Allowed origins for cross-origin requests  
**Format**: Comma-separated URLs or regex  
**Example**: `http://localhost:3000,https://app.example.com`  
**Used by**: Express CORS middleware

### `LOG_LEVEL`
**Description**: Pino logger verbosity  
**Values**: `debug` | `info` | `warn` | `error`  
**Default**: `info`  
**Used by**: API server logging

---

## Development Setup

### Local Development with .env file

Create a `.env` file in the project root (NOT committed to git):

```bash
# .env (local development only)
DATABASE_URL=postgresql://postgres:password@localhost:5432/digital_vault
NODE_ENV=development
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

**To use it:**
```bash
# Option 1: Export before running
export $(cat .env | xargs) && pnpm run build

# Option 2: Use a .env loader (install dotenv)
pnpm add -D dotenv
node --env-file=.env your-script.js
```

### Docker Development
If using Docker for PostgreSQL:

```bash
# Start PostgreSQL container
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=digital_vault \
  -p 5432:5432 \
  postgres:latest

# Then set DATABASE_URL
export DATABASE_URL=postgresql://postgres:password@localhost:5432/digital_vault
```

### Drizzle Push (Schema Sync)
Once DATABASE_URL is set:

```bash
# Push schema changes to your database
pnpm --filter @workspace/db run push

# This creates/updates tables defined in lib/db/src/schema/index.ts
```

---

## Production Setup (Vercel Deployment)

### Step 1: Connect Database
Choose one of these options:

#### Option A: Vercel Postgres
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab → **Create Database** → **Postgres**
4. After creation, the `DATABASE_URL` is automatically added to Environment Variables

#### Option B: External Database (Neon, Railway, etc.)
1. Create database account and get connection string
2. Go to Vercel project **Settings** → **Environment Variables**
3. Add `DATABASE_URL` with your connection string

### Step 2: Add Environment Variables to Vercel

In **Vercel Dashboard** → **Settings** → **Environment Variables**, add:

| Variable | Value | Scope |
|----------|-------|-------|
| `DATABASE_URL` | Your PostgreSQL URL | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `NODE_ENV` | `development` | Preview, Development |
| `LOG_LEVEL` | `info` | Production, Preview, Development |

**Important**: Use different DATABASE_URL values for different environments:
- **Production**: Main database
- **Preview**: Staging/test database (if available)
- **Development**: Local database

### Step 3: Configure Build Settings

In **Vercel Dashboard** → **Settings** → **Build & Development Settings**:

```
Build Command:
pnpm run build

Output Directory:
artifacts/web3nano/dist
```

For API server (if hosting separately):
```
Build Command:
pnpm --filter @workspace/api-server run build

Output Directory:
artifacts/api-server/dist
```

### Step 4: Deploy

```bash
# Push to connected GitHub branch
git push origin main

# Vercel automatically:
# 1. Installs dependencies
# 2. Runs build command
# 3. Deploys to URL
# 4. Sets environment variables
```

---

## Database Connection Examples

### Vercel Postgres
```
DATABASE_URL=postgresql://user:password@db.verceldb.com:5432/dbname?sslmode=require&schema=public
```

### Neon (Serverless)
```
DATABASE_URL=postgresql://user:password@ep-cool-evening-123.us-east-1.neon.tech/dbname?sslmode=require
```

### Railway
```
DATABASE_URL=postgresql://user:password@container.railway.app:5432/railway
```

### Self-Hosted PostgreSQL
```
DATABASE_URL=postgresql://postgres:password@192.168.1.100:5432/vault
```

### Amazon RDS
```
DATABASE_URL=postgresql://admin:password@database-1.xxxxx.us-east-1.rds.amazonaws.com:5432/vault
```

---

## Troubleshooting

### "DATABASE_URL, ensure the database is provisioned"
- ✅ Check that DATABASE_URL is set
- ✅ Verify connection string is correct
- ✅ Ensure database server is running
- ✅ Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### "FATAL: password authentication failed"
- ✅ Check username and password in URL
- ✅ Verify no special characters need escaping
- ✅ Test credentials directly: `psql postgresql://user:password@host/db`

### "connect ECONNREFUSED 127.0.0.1:5432"
- ✅ PostgreSQL server is not running
- ✅ Check hostname/port in DATABASE_URL
- ✅ For Docker: `docker ps` to see running containers

### "SSL error: certificate verify failed"
- Add `?sslmode=require` or `?sslmode=prefer` to DATABASE_URL
- Cloud databases (Neon, Vercel) usually require this

### Build fails on Vercel after adding DATABASE_URL
- ✅ Wait a few minutes - env vars take time to propagate
- ✅ Trigger a rebuild from Vercel dashboard
- ✅ Check build logs for specific error message

---

## Security Best Practices

### Local Development
- ✅ Use `.env` file (add to `.gitignore`)
- ✅ Use weak passwords locally, strong ones in production
- ✅ Never commit `.env` to git

### Production (Vercel)
- ✅ Use strong passwords (32+ characters)
- ✅ Use database-specific security features:
  - Vercel Postgres: Built-in SSL, isolated VPCs
  - Neon: Data encryption, backups
  - Railway: Private networking
- ✅ Enable SSL/TLS (`sslmode=require`)
- ✅ Use separate database per environment
- ✅ Enable read replicas if available
- ✅ Regular database backups

### Access Control
- ✅ Don't share DATABASE_URL
- ✅ Rotate credentials quarterly
- ✅ Use database-specific users/roles
- ✅ Limit network access to application servers only

---

## Environment Variable Validation

The project validates `DATABASE_URL` at runtime in `lib/db/drizzle.config.ts`:

```typescript
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}
```

This ensures the build fails early if the variable is missing.

---

## Deployment Checklist

- [ ] Database created and accessible
- [ ] DATABASE_URL verified (test with psql)
- [ ] DATABASE_URL added to Vercel Environment Variables
- [ ] Build command configured: `pnpm run build`
- [ ] Output directory set: `artifacts/web3nano/dist` (for frontend)
- [ ] All environment variables match between local and production
- [ ] Database schema pushed: `pnpm --filter @workspace/db run push`
- [ ] Build succeeds locally: `pnpm run build`
- [ ] Deployed to Vercel: `git push origin main`

