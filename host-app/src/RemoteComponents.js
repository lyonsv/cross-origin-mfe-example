import React from 'react';
import RemoteWrapper from './RemoteWrapper';
import { FallbackButton, FallbackHeader } from './FallbackComponents';

// Dynamically import remote components
const RemoteButton = React.lazy(() => {
  console.log('🔄 Loading RemoteButton...');
  return import('remoteApp/Button').catch(error => {
    console.error('❌ Failed to load RemoteButton:', error);
    throw error;
  });
});

const RemoteHeader = React.lazy(() => {
  console.log('🔄 Loading RemoteHeader...');
  return import('remoteApp/Header').catch(error => {
    console.error('❌ Failed to load RemoteHeader:', error);
    throw error;
  });
});

// Wrapped remote components with error boundaries and fallbacks
export const SafeRemoteButton = (props) => (
  <RemoteWrapper fallback={<FallbackButton {...props} />}>
    <RemoteButton {...props} />
  </RemoteWrapper>
);

export const SafeRemoteHeader = (props) => (
  <RemoteWrapper fallback={<FallbackHeader {...props} />}>
    <RemoteHeader {...props} />
  </RemoteWrapper>
);