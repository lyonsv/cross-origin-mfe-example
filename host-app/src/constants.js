// Remote app URLs for different environments
export const REMOTE_URLS = {
  development: 'http://localhost:3001',
  production: 'https://cross-origin-mfe-example.vercel.app'
};

export const getRemoteUrl = () => {
  // Check if we're in production build (not just NODE_ENV)
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  
  if (isProduction) {
    console.log('🔗 Client-side: Using production remote URL');
    return REMOTE_URLS.production;
  }
  
  console.log('🔗 Client-side: Using development remote URL');
  return REMOTE_URLS.development;
};

export const getRemoteEntryUrl = () => {
  return `${getRemoteUrl()}/remoteEntry.js`;
};
