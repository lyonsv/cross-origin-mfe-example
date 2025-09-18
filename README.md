# Cross-Origin Module Federation Proof of Concept

This project demonstrates how to set up **Webpack Module Federation** between two React applications deployed on separate Vercel domains, enabling true cross-origin micro-frontend architecture.

## 🏗️ Project Structure

```
cross-origin-mfe-example/
├── host-app/          # Consumer application (shell)
│   ├── src/
│   ├── public/
│   ├── webpack.config.js
│   ├── webpack.prod.config.js
│   ├── vercel.json
│   └── package.json
├── remote-app/        # Producer application (microfrontend)
│   ├── src/
│   ├── public/
│   ├── webpack.config.js
│   ├── webpack.prod.config.js
│   ├── vercel.json
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Two separate Git repositories (for separate Vercel deployments)
- Vercel account

### Local Development

1. **Clone and setup both applications:**

```bash
# Install dependencies for remote app
cd remote-app
npm install

# Install dependencies for host app
cd ../host-app
npm install
```

2. **Start the remote app first:**

```bash
cd remote-app
npm start
# Runs on http://localhost:3001
```

3. **Start the host app in a new terminal:**

```bash
cd host-app
npm start
# Runs on http://localhost:3000
```

4. **Open your browser** and navigate to `http://localhost:3000` to see the module federation in action!

## 🌐 Vercel Deployment

### Step 1: Prepare Separate Repositories

Each app needs to be in its own Git repository for separate Vercel deployments:

```bash
# Create separate repos
git init remote-app
cd remote-app
git add .
git commit -m "Initial remote app setup"
git remote add origin https://github.com/yourusername/remote-app.git
git push -u origin main

cd ../host-app
git init
git add .
git commit -m "Initial host app setup"
git remote add origin https://github.com/yourusername/host-app.git
git push -u origin main
```

### Step 2: Deploy Remote App First

1. **Import the remote-app repository into Vercel**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: `Other`
3. **Deploy and note the URL** (e.g., `https://your-remote-app.vercel.app`)

### Step 3: Deploy Host App

1. **Import the host-app repository into Vercel**
2. **Add environment variable:**
   - Name: `REMOTE_URL`
   - Value: `https://your-remote-app.vercel.app` (your remote app URL)
3. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: `Other`
4. **Deploy the host app**

### Step 4: Configure Custom Domains (Optional)

For a true cross-origin demo, configure custom domains:
- Remote app: `remote.yourdomain.com`
- Host app: `host.yourdomain.com`

Update the `REMOTE_URL` environment variable in the host app accordingly.

## 🔧 How It Works

### Module Federation Configuration

**Remote App (Producer):**
```javascript
new ModuleFederationPlugin({
  name: 'remoteApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/Button',
    './Header': './src/Header',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

**Host App (Consumer):**
```javascript
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    remoteApp: `remoteApp@\${REMOTE_URL}/remoteEntry.js`,
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### Cross-Origin Support

#### CORS Headers
Both applications are configured with proper CORS headers in their Vercel configurations:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

#### Error Boundaries & Fallbacks
The host app includes comprehensive error handling:

- **Error Boundaries**: Catch and handle remote loading failures
- **Suspense**: Handle loading states with custom loading components
- **Fallback Components**: Local components that render when remote loading fails
- **Graceful Degradation**: Toggle between remote and local components

## 🎯 Features Demonstrated

- ✅ **Cross-Origin Loading**: Remote components loaded from different domains
- ✅ **CORS Configuration**: Proper headers for cross-origin requests
- ✅ **Error Boundaries**: Graceful handling of remote loading failures
- ✅ **Fallback Components**: Local alternatives when remote fails
- ✅ **Shared Dependencies**: React/ReactDOM shared as singletons
- ✅ **Dynamic Loading**: Components loaded on-demand with Suspense
- ✅ **Production Ready**: Optimized webpack configs for production
- ✅ **Vercel Deployment**: Ready-to-deploy configurations

## 🧪 Testing the Setup

### Local Testing
1. Start both apps locally
2. Toggle the "Use Remote Components" checkbox
3. Watch the network tab to see remote entry loading
4. Try stopping the remote app to test fallbacks

### Production Testing
1. Deploy both apps to different Vercel domains
2. Visit the host app URL
3. Open browser dev tools and check:
   - Network tab for `remoteEntry.js` loading from different domain
   - Console for any CORS errors (should be none)
   - Components loading and functioning correctly

## 🔍 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure vercel.json includes proper CORS headers
- Check that remote app is deployed and accessible
- Verify REMOTE_URL environment variable is correct

**2. Remote Components Not Loading**
- Check browser console for errors
- Verify remoteEntry.js is accessible at `REMOTE_URL/remoteEntry.js`
- Ensure both apps use compatible React versions

**3. Shared Dependencies Issues**
- Verify React/ReactDOM versions match between apps
- Check that `singleton: true` is set for shared dependencies
- Clear browser cache and try again

**4. Vercel Build Failures**
- Ensure build commands are correct in vercel.json
- Check that all dependencies are in package.json
- Verify webpack configurations are valid

### Debug Mode

Enable debug information by checking the browser console and the debug info section in the host app, which shows:
- Current host app URL
- Remote app URL being used
- Current component mode (remote vs fallback)

## 🔐 Security Considerations

- **CORS**: While we use `*` for this demo, restrict origins in production
- **Content Security Policy**: Consider CSP headers for additional security
- **Subresource Integrity**: Add SRI for remote scripts in production
- **Environment Variables**: Keep remote URLs in environment variables
- **Access Control**: Implement proper authentication if needed

## 📚 Learn More

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this proof of concept!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).