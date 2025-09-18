import React from 'react';
import './Header.css';

const Header = ({ title = 'Remote Micro Frontend', subtitle }) => {
  return (
    <header className="remote-header">
      <div className="remote-header__container">
        <h1 className="remote-header__title">{title}</h1>
        {subtitle && <p className="remote-header__subtitle">{subtitle}</p>}
        <div className="remote-header__badge">
          Federated Component
        </div>
      </div>
    </header>
  );
};

export default Header;