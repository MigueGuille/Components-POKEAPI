import React from 'react';
import './header.css';
const Header = ({ title, children, style }) => {
  return (
    <div className='header-body'>
      <h1 className='title-header'>{title}</h1>
      {children} {/* Permite insertar elementos adicionales como botones o enlaces */}
    </div>
  );
};

export default Header;