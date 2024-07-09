import React from 'react';
import './Header.css'
// import pokelogo from '../../assets/pokelogo.png'

const Header = ({ title, children, logo}) => {
  return (
    <div className='header-body'>
      {/*<h1 className='title-header'>{title}</h1>*/}
      <img className='logo' src={logo} />
      {children} {/* Permite insertar elementos adicionales como botones o enlaces */}
    </div>
  );
};

export default Header;