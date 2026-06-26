# 🚀 Deployment Guide

## Deploy to Vercel (Recommended - 1 Click)

### Option 1: Via GitHub (Easiest)

1. Push your project to GitHub
```bash
git init
git add .
git commit -m "Initial Movie Finder commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movie-finder.git
git push -u origin main
```

2. Go to https://vercel.com/
3. Sign up or log in
4. Click "Add New Project"
5. Select your `movie-finder` repository
6. Vercel will auto-detect Vite settings
7. Add environment variable:
   - Name: `VITE_TMDB_API_KEY`
   - Value: Your TMDB API Key
8. Click "Deploy"

Done! Your app is live! ✅

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
cd c:\xampp\htdocs\movie-finder
vercel

# Follow prompts to connect your account
# Add VITE_TMDB_API_KEY when asked for environment variables
```

## Deploy to Netlify

1. Build the project first
```bash
npm run build
```

2. Go to https://app.netlify.com
3. Create new site from Git
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variable:
   - `VITE_TMDB_API_KEY`: Your TMDB API Key
7. Deploy

## Deploy to AWS Amplify

1. Create AWS account at https://aws.amazon.com
2. Push code to GitHub
3. Go to AWS Amplify Console
4. Connect repository
5. Configure:
   - Build command: `npm install && npm run build`
   - Base directory: (leave empty)
   - Build output: `dist`
6. Add environment variable `VITE_TMDB_API_KEY`
7. Deploy

## Manual Deployment (Any Static Host)

### 1. Build the application
```bash
npm run build
```

This creates a `dist/` folder with production files.

### 2. Upload to your host

**FTP/Hosting Panel:**
- Upload contents of `dist/` folder to public_html directory
- Ensure all files are uploaded (check .js, .css, .svg files)

**Command line (SSH):**
```bash
scp -r dist/* user@yourhost.com:/public_html/
```

### 3. Configure for SPA (Single Page Application)

Your host needs to serve `index.html` for all routes. Check with your provider about:
- Rewrite rules
- SPA configuration
- .htaccess setup (for Apache)

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx (nginx.conf):**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Performance Checklist

✅ Production build created (`dist/` folder)
✅ API key secured (never in code)
✅ Images loading from TMDB CDN
✅ Responsive on mobile/tablet/desktop
✅ No console errors
✅ Favrites persist (localStorage working)
✅ Search debouncing active
✅ Infinite scroll functioning

## Post-Deployment

1. **Test all pages:**
   - Home page
   - Search functionality
   - Movie details
   - Favorites save/load
   - Responsive on mobile

2. **Monitor performance:**
   - Check Lighthouse score
   - Monitor API response times
   - Track user interactions

3. **Enable HTTPS:**
   - Vercel/Netlify provide free SSL
   - Ensure `https://` URLs in production

## Domain Configuration

Once deployed, configure custom domain:

**Vercel:** Settings > Domains > Add > Follow instructions
**Netlify:** Site settings > Domain management > Add custom domain
**Other Hosts:** Update DNS records to point to hosting provider

## Environment Variables for Production

Never expose API keys in version control:
- Add to `.gitignore` (already done)
- Use platform environment variable settings
- Different keys for dev/production (optional)

## Troubleshooting Deployment

### "404 on page refresh"
- Ensure hosting supports SPA routing
- Check server configuration for rewrite rules
- Contact hosting support for SPA setup

### "API requests failing in production"
- Verify `VITE_TMDB_API_KEY` is set
- Check for CORS issues
- Ensure API key is active on TMDB dashboard

### "Images not loading"
- Clear browser cache
- Check TMDB CDN status
- Verify image URLs are correct

### "Build fails on deployment"
- Check build logs on deployment platform
- Ensure all dependencies in package.json
- Verify environment variables are set

## Rollback

**Vercel/Netlify:** Automatically keeps previous versions - easy one-click rollback from dashboard

**Manual:** Keep backup of previous build or redeploy from repository

---

**Estimated deployment time:** 5-15 minutes
**Cost:** Free tier available on Vercel/Netlify (recommended!)

🎉 Your Movie Finder app is ready for the world!
