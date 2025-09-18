# Deployment Guide

## Prerequisites Checklist

- [ ] Node.js 16+ installed
- [ ] Two GitHub repositories created:
  - [ ] `your-username/remote-app`
  - [ ] `your-username/host-app`
- [ ] Vercel account connected to GitHub

## Step-by-Step Deployment

### 1. Prepare Your Repositories

```bash
# Navigate to remote-app
cd remote-app

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial remote app setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/remote-app.git
git push -u origin main

# Navigate to host-app
cd ../host-app

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial host app setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/host-app.git
git push -u origin main
```

### 2. Deploy Remote App First

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your `remote-app` repository**
4. **Configure the project:**
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Deploy the project**
6. **Copy the deployment URL** (e.g., `https://remote-app-abc123.vercel.app`)

### 3. Deploy Host App

1. **Import your `host-app` repository** into Vercel
2. **Before deploying, add environment variable:**
   - Go to Settings → Environment Variables
   - Add: `REMOTE_URL` = `https://your-remote-app-url.vercel.app`
3. **Configure the project:**
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Deploy the project**

### 4. Test Your Deployment

1. **Visit your host app URL**
2. **Check that remote components load correctly**
3. **Open browser dev tools:**
   - Network tab should show `remoteEntry.js` loading from remote domain
   - No CORS errors in console
   - Components should render properly

### 5. Optional: Custom Domains

For a more professional setup:

1. **Configure custom domains in Vercel:**
   - Remote app: `remote.yourdomain.com`
   - Host app: `host.yourdomain.com`

2. **Update environment variable:**
   - Change `REMOTE_URL` to your custom remote domain

## Environment Variables Reference

### Host App Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REMOTE_URL` | URL of the deployed remote app | `https://remote-app.vercel.app` |

### Vercel Configuration Files

Both apps include `vercel.json` with optimized settings:

- **CORS headers** for cross-origin requests
- **Build configuration** for webpack
- **Output directory** specification
- **Environment variable** handling

## Troubleshooting Deployment Issues

### Build Failures

**Issue**: "Module not found" errors during build
**Solution**:
- Ensure all dependencies are in `package.json`
- Check that webpack config files are valid
- Verify file paths in import statements

**Issue**: "Cannot resolve module federation remote"
**Solution**:
- Ensure remote app is deployed first
- Verify `REMOTE_URL` environment variable is set correctly
- Check that `remoteEntry.js` is accessible

### Runtime Errors

**Issue**: CORS errors in production
**Solution**:
- Verify `vercel.json` includes CORS headers
- Check that both apps are properly deployed
- Ensure remote URL is accessible

**Issue**: Components not loading
**Solution**:
- Check browser network tab for failed requests
- Verify `remoteEntry.js` loads successfully
- Check console for JavaScript errors

### Performance Optimization

- Both apps use production webpack configs with:
  - Deterministic module and chunk IDs
  - Optimized bundle splitting
  - Proper caching headers
  - Minification and tree shaking

## Security Notes for Production

When deploying to production, consider:

1. **Restrict CORS origins** instead of using `*`
2. **Implement Content Security Policy** headers
3. **Use HTTPS** for all communications
4. **Add authentication** if required
5. **Monitor** for security vulnerabilities

## Next Steps

After successful deployment:

- [ ] Test all functionality in production
- [ ] Set up monitoring and logging
- [ ] Configure proper error tracking
- [ ] Implement CI/CD pipeline
- [ ] Add automated testing