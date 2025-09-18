import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🚀 Host app starting...');
console.log('Root element:', document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('✅ Host app rendered!');