# Deployment Guide: Jharkhand Pedicon 2026

This is a premium static React + Vite + Tailwind CSS application. Since there is no custom backend, it can be deployed for **FREE** on high-performance CDN platforms like **Vercel** or **Netlify**, which support 200+ concurrent visitors with ease.

---

## Prerequisites

Ensure you have your code committed to a Git repository (GitHub, GitLab, or Bitbucket) for the easiest deployment.

---

## Option 1: Deploying to Vercel (Recommended)

Vercel provides native Vite optimization and instant deployment previews.

### Method A: Git Integration (Continuous Deployment)
1. Go to [Vercel](https://vercel.com/) and log in (create an account using GitHub if you haven't).
2. Click **Add New** -> **Project**.
3. Import your Git repository containing this project.
4. Vercel will automatically detect **Vite** as the framework preset.
5. Leave the default settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**. Vercel will build your application and generate a public URL.

### Method B: Vercel CLI (Manual Deployment)
If you don't use Git, deploy directly from your command line:
```bash
# Install Vercel CLI globally
npm install -g vercel

# Log in and deploy from project directory
vercel
```

### Routing Configuration for Vercel
Because this application uses React Router with client-side routing, visiting paths like `/conference/jharkhand-pedicon-2026` directly might result in a `404` error on page refresh unless configured properly.

We have created a `vercel.json` file in the root to handle this. Vercel will rewrite all requests to `index.html`.

---

## Option 2: Deploying to Netlify

Netlify is another excellent serverless hosting provider.

### Method A: Git Integration
1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select your Git provider and import your repository.
4. Set the Build settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy Site**.

### Method B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run production build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Routing Configuration for Netlify
For Netlify, we will create a `_redirects` file inside the `public/` directory with the following rule:
```text
/*    /index.html   200
```
This redirects all sub-routes to `index.html`, allowing React Router to manage paths dynamically.

---

## Performance Optimizations
- **Asset Lazy Loading:** Images and heavier assets are loaded lazily where applicable.
- **Minified Build:** Vite minifies JS and CSS files automatically during `npm run build`.
- **CDN Caching:** High cache hits on Vercel/Netlify CDNs ensure sub-second page loads.
