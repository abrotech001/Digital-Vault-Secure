# Hosting on Vercel - Complete Guide

## Overview
This guide walks you through deploying Digital Vault Secure to Vercel with a live PostgreSQL database and CI/CD pipeline.

---

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier works)
- Access to the Digital Vault Secure GitHub repository
- Basic knowledge of git and npm/pnpm

---

## Part 1: Prepare Your Repository

### Step 1.1: Ensure Repository is Ready

```bash
# Clone locally
git clone https://github.com/abrotech001/Digital-Vault-Secure.git
cd Digital-Vault-Secure

# Install dependencies
pnpm install

# Verify build works
pnpm run build

# Commit any pending changes
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 1.2: Add .gitignore Entries (if not present)

Create/update `.gitignore`:

```gitignore
# Environment
.env
.env.local
.env.*.local

# Dependencies
node_modules
pnpm-lock.yaml
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

## Part 2: Create Vercel Project

### Step 2.1: Import from GitHub

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select `abrotech001/Digital-Vault-Secure`
5. Click **Import**

### Step 2.2: Configure Project

On the import screen, you'll see:

**Project Name**: `digital-vault-secure` (or your choice)  
**Framework Preset**: *Vercel will auto-detect as Vite*

---

## Part 3: Configure Build & Root Directory

### Step 3.1: Build Settings

Since this is a monorepo, configure build carefully:

```
Framework: Vite
Build Command: pnpm run build
Output Directory: artifacts/web3nano/dist
```

**If Vercel auto-detected different values:**
1. Click **Override** to change
2. Set to above values
3. Click **Save**

### Step 3.2: Install Command

Vercel auto-detects `pnpm`, no changes needed:
```
pnpm install
```

---

## Part 4: Setup Database

### Option A: Use Vercel Postgres (Recommended)

#### Step 4.1: Create Database

1. In Vercel project dashboard, go to **Storage**
2. Click **Create Database** → **Postgres**
3. Select **Region** (choose closest to your users)
4. Click **Create**
5. Wait for provisioning (2-3 minutes)

#### Step 4.2: Copy Connection String

1. Database page shows connection info
2. Copy the **CONNECTION STRING** (starts with `postgresql://`)
3. Environment variables are auto-added to your project

**Done!** Vercel automatically adds `DATABASE_URL` to all environments.

---

### Option B: External Database (Neon, Railway, etc.)

#### Step B.1: Create Database

Choose one:

**Neon (Recommended for hobby/small projects)**:
- Go to [Neon Console](https://console.neon.tech)
- Click **Create Project**
- Choose **PostgreSQL version**: Latest
- Get connection string from **Connection Details**

**Railway (Good for growing apps)**:
- Go to [Railway](https://railway.app)
- Create new project
- Add **PostgreSQL** plugin
- Copy connection string

#### Step B.2: Add to Vercel

1. In Vercel project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Name: `DATABASE_URL`
4. Value: Paste connection string from your database provider
5. Environments: **Select all** (Production, Preview, Development)
6. Click **Save**

---

## Part 5: Configure Environment Variables

### Step 5.1: Add Variables in Vercel

Go to project **Settings** → **Environment Variables**

| Name | Value | Environments |
|------|-------|--------------|
| `DATABASE_URL` | Your PostgreSQL URL | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `NODE_ENV` | `development` | Preview, Development |
| `LOG_LEVEL` | `info` | All |
| `CORS_ORIGIN` | See below | All |

### Step 5.2: CORS_ORIGIN Value

For development:
```
http://localhost:3000,http://localhost:5173
```

For production (example):
```
https://digital-vault-secure.vercel.app,https://api.digitalvaultsecure.com
```

Get your Vercel URL from the Deployments page.

---

## Part 6: Deploy

### Step 6.1: Trigger First Deployment

Your project auto-deployed during import! 

To see deployment status:
1. Go to **Deployments** tab
2. View build logs if needed
3. Click the URL to visit your app

### Step 6.2: Push Changes to Auto-Deploy

Every push to `main` branch auto-deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically builds and deploys
```

View deployment progress in **Deployments** tab.

---

## Part 7: Initialize Database Schema

### Step 7.1: Connect to Database (One-Time)

You need to push the database schema after deployment.

**Option 1: Via Vercel CLI** (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema
pnpm --filter @workspace/db run push
```

**Option 2: Via Vercel Dashboard**

1. In **Storage** → Your Postgres database
2. Click **Connections** → **PSQL CLI**
3. Copy the connection command
4. Locally create `.env` with that `DATABASE_URL`
5. Run: `pnpm --filter @workspace/db run push`

### Step 7.2: Verify Schema

After push, check tables created:

```bash
# Via psql CLI
psql $DATABASE_URL -c "\dt"

# Should show your tables from lib/db/src/schema/index.ts
```

---

## Part 8: API Server Deployment (Optional)

If you want to deploy the Express API server separately:

### Step 8.1: Create API Deployment

**Option A: As Vercel Function** (Recommended for small APIs)

Vercel automatically converts Express to serverless functions. Just deploy normally.

**Option B: As Separate Project**

1. In Vercel, click **Add New** → **Project**
2. Import same repository
3. Name: `digital-vault-api`
4. Build Command: `pnpm --filter @workspace/api-server run build`
5. Output Directory: `artifacts/api-server/dist`
6. Add same DATABASE_URL environment variable
7. Deploy

### Step 8.2: Connect Frontend to API

In `artifacts/web3nano/src/lib/api-client-react.ts`:

```typescript
// Update API base URL
const API_URL = process.env.VITE_API_URL || 'https://api.digitalvaultsecure.com';
```

Add environment variable in Vercel:
```
VITE_API_URL=https://digital-vault-api.vercel.app
```

---

## Part 9: Custom Domain (Optional)

### Step 9.1: Add Domain

1. In Vercel project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `app.yourcompany.com`
4. Choose DNS provider option
5. Add DNS records (Vercel provides them)
6. Wait for verification (5-30 minutes)

### Step 9.2: Update CORS

Update `CORS_ORIGIN` environment variable:
```
https://app.yourcompany.com,https://api.yourcompany.com
```

---

## Part 10: Monitoring & Logs

### View Application Logs

1. **Deployments** tab → Select a deployment
2. Scroll to **Logs** section
3. View real-time logs during build/runtime

### Monitor Database

In Vercel **Storage** → Your Database:
- View query stats
- Check backups
- Monitor storage usage
- Set up alerts

### Set Up Error Tracking (Optional)

Integrate Sentry for error monitoring:

```bash
# Install Sentry
pnpm add @sentry/react @sentry/node

# Add to environment variables
SENTRY_DSN=your-sentry-dsn
```

---

## Part 11: CI/CD Pipeline

### Automatic Deployments

Every push to `main` auto-deploys:

```
git commit → push → Vercel build → test → deploy
```

### Preview Deployments

Every pull request gets a preview:

1. Create branch: `git checkout -b feature/my-feature`
2. Push: `git push origin feature/my-feature`
3. Create PR on GitHub
4. Vercel auto-creates preview URL
5. View at: `https://digital-vault-secure-[pr].vercel.app`

### Rollback

To revert a deployment:

1. Go to **Deployments** tab
2. Find the working deployment
3. Click **...** → **Promote to Production**

---

## Part 12: Troubleshooting

### Build Fails

Check **Deployments** → **Build Logs**:

```
pnpm run build failed
```

Solutions:
- Verify `pnpm-lock.yaml` committed
- Check TypeScript errors: `pnpm run typecheck`
- Ensure all deps installed: `pnpm install`

### DATABASE_URL Not Found

```
Error: DATABASE_URL, ensure the database is provisioned
```

Solutions:
- ✅ Check **Settings** → **Environment Variables**
- ✅ Verify DATABASE_URL exists and is not empty
- ✅ Redeploy: **Deployments** → **...** → **Redeploy**

### CORS Errors

```
Access to XMLHttpRequest from origin blocked by CORS
```

Solutions:
- ✅ Update `CORS_ORIGIN` env var to include your domain
- ✅ Redeploy after changing env vars

### Database Connection Timeout

Solutions:
- ✅ Check database is running
- ✅ Verify connection string format
- ✅ Check network access rules (cloud provider)
- ✅ Test locally: `psql $DATABASE_URL -c "SELECT 1"`

### "Cannot find module" errors

Solutions:
- Delete `pnpm-lock.yaml` locally
- Run `pnpm install`
- Commit new lock file
- Push to trigger rebuild

---

## Part 13: Performance Optimization

### Enable Caching

In Vercel **Settings** → **Build Cache**:
- Automatically caches `node_modules`
- Caches build outputs

### CDN Configuration

Vercel auto-configures CDN. To optimize:

1. **Static Assets**: Served from edge locations automatically
2. **Images**: Use Vercel Image Optimization
3. **Database**: Choose region close to users

### Monitor Performance

1. **Analytics** tab shows real-time traffic
2. **Web Vitals** shows Core Web Vitals
3. Use **Lighthouse** for detailed audits

---

## Part 14: Backup & Disaster Recovery

### Database Backups

**Vercel Postgres**:
- Auto backups every 24 hours
- Accessible in Storage → Database → Backups

**External Database**:
- Neon: Automatic backups, point-in-time recovery
- Railway: Daily backups, manual export
- Set up automated backups to S3

### Restore from Backup

1. In **Storage** → Database → **Backups**
2. Click restore point
3. Follow provider instructions

---

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Build command verified: `pnpm run build`
- [ ] Output directory set: `artifacts/web3nano/dist`
- [ ] DATABASE_URL environment variable added
- [ ] Other env vars configured (CORS_ORIGIN, NODE_ENV, etc.)
- [ ] First deployment successful (check Deployments tab)
- [ ] Database schema pushed: `pnpm --filter @workspace/db run push`
- [ ] Can access app at Vercel URL
- [ ] API endpoints working
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled (logs, errors, analytics)

---

## Next Steps

After deployment:

1. **Add Features**: Push to `main` branch, Vercel auto-deploys
2. **Database Changes**: Update schema, run `pnpm --filter @workspace/db run push`
3. **API Updates**: Modify OpenAPI spec, regenerate: `pnpm --filter @workspace/api-spec run codegen`
4. **Monitor**: Check logs and analytics in Vercel dashboard
5. **Scale**: Upgrade Vercel plan if needed for higher traffic

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://discord.gg/vercel
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Project Issues**: GitHub Issues in your repository

