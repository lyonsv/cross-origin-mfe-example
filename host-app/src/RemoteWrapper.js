import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const RemoteWrapper = ({ children, fallback, loadingComponent }) => {
  console.log('🔧 RemoteWrapper rendering with children:', children);
  
  const LoadingComponent = loadingComponent || (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading remote component...</p>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={LoadingComponent}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RemoteWrapper;