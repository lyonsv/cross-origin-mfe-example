import React from 'react';

// Fallback Button component
export const FallbackButton = ({ onClick, children, ...props }) => {
  return (
    <button
      className="fallback-button"
      onClick={onClick}
      {...props}
    >
      {children || 'Fallback Button'}
    </button>
  );
};

// Fallback Header component
export const FallbackHeader = ({ title = 'Fallback Header', subtitle }) => {
  return (
    <div className="fallback-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <span className="fallback-badge">Local Fallback</span>
    </div>
  );
};