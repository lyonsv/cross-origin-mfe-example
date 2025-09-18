// Remote app URLs for different environments
export const REMOTE_URLS = {
  development: 'http://localhost:3001',
  production: 'https://cross-origin-mfe-example.vercel.app'
};

export const getRemoteUrl = () => {
  return REMOTE_URLS[process.env.NODE_ENV] || REMOTE_URLS.development;
};

export const getRemoteEntryUrl = () => {
  return `${getRemoteUrl()}/remoteEntry.js`;
};
