import React from 'react';
import Button from './Button';
import Header from './Header';
import './App.css';

function App() {
  console.log('🔧 Remote App component rendering...');
  
  return (
    <div className="app">
      <div style={{background: 'red', color: 'white', padding: '20px', textAlign: 'center'}}>
        <h1>🚀 REMOTE APP IS WORKING!</h1>
        <p>If you see this, React is rendering in the remote app!</p>
      </div>
      <Header />
      <main className="main-content">
        <h2>Remote App - Standalone View</h2>
        <p>This is the standalone view of the remote application.</p>
        <p>The components below are also exposed as micro-frontends:</p>
        <div className="component-showcase">
          <Button onClick={() => alert('Button from remote app clicked!')}>
            Remote Button
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;