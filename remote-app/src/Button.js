import React from 'react';
import './Button.css';

const Button = ({ onClick, children, variant = 'primary', disabled = false }) => {
  return (
    <button
      className={`remote-button remote-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;