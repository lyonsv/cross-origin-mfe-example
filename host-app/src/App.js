import React, { useState } from 'react';
import { SafeRemoteButton, SafeRemoteHeader } from './RemoteComponents';
import { FallbackButton, FallbackHeader } from './FallbackComponents';
import './App.css';

function App() {
  const [useRemote, setUseRemote] = useState(true); // Start with remote components
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [remoteStatus, setRemoteStatus] = useState('checking...');

  // Test if remote app is accessible
  React.useEffect(() => {
    const testRemoteConnection = async () => {
      try {
        const response = await fetch('http://localhost:3001/remoteEntry.js');
        if (response.ok) {
          setRemoteStatus('✅ Remote app accessible');
          console.log('✅ Remote app is accessible');
        } else {
          setRemoteStatus('❌ Remote app not accessible');
          console.error('❌ Remote app not accessible:', response.status);
        }
      } catch (error) {
        setRemoteStatus('❌ Remote app connection failed');
        console.error('❌ Remote app connection failed:', error);
      }
    };
    
    testRemoteConnection();
  }, []);

  const handleButtonClick = () => {
    setButtonClickCount(count => count + 1);
    alert(`Button clicked ${buttonClickCount + 1} times!`);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>🏠 Host Application</h1>
        <p>Module Federation Cross-Origin Demo</p>
        <p style={{color: 'red', fontWeight: 'bold'}}>✅ React is working! If you see this, the app is rendering.</p>
      </div>

      <div className="toggle-section">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={useRemote}
            onChange={(e) => setUseRemote(e.target.checked)}
          />
          Use Remote Components (uncheck to see fallbacks)
        </label>
      </div>

      <div className="demo-section">
        <h2>🎯 Remote Header Component</h2>
        <div className="component-container">
          {useRemote ? (
            <SafeRemoteHeader
              title="Cross-Origin Module Federation"
              subtitle="This header is loaded from a different domain!"
            />
          ) : (
            <FallbackHeader
              title="Local Fallback Header"
              subtitle="This is the local fallback when remote fails"
            />
          )}
        </div>
      </div>

      <div className="demo-section">
        <h2>🔘 Remote Button Component</h2>
        <div className="component-container">
          <p>Click count: {buttonClickCount}</p>
          {useRemote ? (
            <SafeRemoteButton
              onClick={handleButtonClick}
              variant="primary"
            >
              Remote Button (Click me!)
            </SafeRemoteButton>
          ) : (
            <FallbackButton onClick={handleButtonClick}>
              Fallback Button (Click me!)
            </FallbackButton>
          )}
        </div>
      </div>

      <div className="info-section">
        <h3>📋 How it works:</h3>
        <ul>
          <li>The header and button above are loaded from a separate React application</li>
          <li>That application is deployed on a different domain (cross-origin)</li>
          <li>Webpack Module Federation handles the dynamic loading</li>
          <li>Error boundaries provide graceful fallbacks if remote loading fails</li>
          <li>Shared dependencies (React/ReactDOM) are deduplicated</li>
        </ul>
      </div>

      <div className="status-section">
        <h3>🔍 Debug Info:</h3>
        <div className="debug-info">
          <p><strong>Host App:</strong> Running on {window.location.origin}</p>
          <p><strong>Remote URL:</strong> {process.env.NODE_ENV === 'production' ? 'Production Remote' : 'http://localhost:3001'}</p>
          <p><strong>Remote Status:</strong> {remoteStatus}</p>
          <p><strong>Mode:</strong> {useRemote ? 'Remote Components' : 'Fallback Components'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;