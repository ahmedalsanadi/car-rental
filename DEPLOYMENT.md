# 🚀 Deployment Guide

This guide will help you deploy the RentCar application to various platforms.

## 📋 Prerequisites

- Node.js 18.17 or later
- npm 9.0 or later
- Git repository set up
- Code committed and pushed to GitHub

## 🎯 Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications due to its seamless integration and excellent performance.

### Step 1: Prepare Your Repository

1. **Ensure all code is committed**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify your build works locally**
   ```bash
   npm run build
   ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login with your GitHub account

2. **Import your repository**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure project settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (Optional)
   Add these in the Vercel dashboard:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. **Add custom domain in Vercel dashboard**
   - Go to Project Settings → Domains
   - Add your domain
   - Configure DNS records as instructed

2. **SSL certificate will be automatically provisioned**

## 🌐 Alternative Deployment Options

### Netlify Deployment

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `.next` folder
   - Or connect your GitHub repository

3. **Configure build settings**
   ```bash
   Build command: npm run build
   Publish directory: .next
   ```

### Railway Deployment

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Configure environment**
   - Add environment variables
   - Railway will auto-deploy on push

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   # Install dependencies based on the preferred package manager
   COPY package.json package-lock.json* ./
   RUN npm ci --only=production

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   # Next.js collects completely anonymous telemetry data about general usage.
   # Learn more here: https://nextjs.org/telemetry
   # Uncomment the following line in case you want to disable telemetry during the build.
   ENV NEXT_TELEMETRY_DISABLED 1

   RUN npm run build

   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public

   # Set the correct permission for prerender cache
   RUN mkdir .next
   RUN chown nextjs:nodejs .next

   # Automatically leverage output traces to reduce image size
   # https://nextjs.org/docs/advanced-features/output-file-tracing
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"

   CMD ["node", "server.js"]
   ```

2. **Build and run**
   ```bash
   docker build -t car-rental .
   docker run -p 3000:3000 car-rental
   ```

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env.local` file for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication
NEXT_PUBLIC_AUTH_SECRET=your-secret-key-here

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Production Environment Variables

Set these in your deployment platform:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Performance Optimization

### Build Optimization

1. **Enable compression**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
   };
   ```

2. **Optimize images**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     images: {
       formats: ['image/webp', 'image/avif'],
       minimumCacheTTL: 60,
     },
   };
   ```

### Runtime Optimization

1. **Enable caching headers**
   ```javascript
   // next.config.mjs
   async headers() {
     return [
       {
         source: '/static/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ];
   },
   ```

## 🔍 Post-Deployment Checklist

- [ ] **Test all pages** - Ensure all routes work correctly
- [ ] **Check responsive design** - Test on mobile and tablet
- [ ] **Verify forms** - Test contact and booking forms
- [ ] **Check performance** - Run Lighthouse audit
- [ ] **Test authentication** - Verify login/register flow
- [ ] **Check images** - Ensure all images load correctly
- [ ] **Verify SEO** - Check meta tags and structured data
- [ ] **Test admin features** - Verify admin dashboard functionality

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (18.17+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Environment variables not working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Restart development server after adding variables

3. **Images not loading**
   - Check image domains in `next.config.mjs`
   - Verify image URLs are accessible

4. **Performance issues**
   - Enable compression
   - Optimize images
   - Use dynamic imports for large components

### Debug Commands

```bash
# Check build output
npm run build

# Run type checking
npm run type-check

# Check linting
npm run lint

# Format code
npm run format
```

## 📈 Monitoring and Analytics

### Performance Monitoring

1. **Vercel Analytics** (if using Vercel)
   - Automatically enabled
   - View in Vercel dashboard

2. **Google Analytics**
   - Add GA tracking code
   - Monitor user behavior

3. **Error Tracking**
   - Consider Sentry for error monitoring
   - Set up alerts for critical errors

### Health Checks

Create a health check endpoint:

```javascript
// app/api/health/route.js
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
```

## 📞 Support

If you encounter issues during deployment:

1. **Check the logs** in your deployment platform
2. **Verify environment variables** are set correctly
3. **Test locally** with production build
4. **Check Next.js documentation** for specific issues
5. **Open an issue** in the GitHub repository

---

**Happy Deploying! 🚀** 