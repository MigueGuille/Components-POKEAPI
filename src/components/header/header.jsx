import React from 'react';
import './Header.css';
import pokelogo from '../../assets/pokelogo.png'
import { useNavigate } from 'react-router-dom';

const Header = ({ title, children, style }) => {
  const navigate = useNavigate();
  
  function handleClick(){
    navigate('/');
  }

  return (
    <div className='header-body' onClick={handleClick} >
      {/*<h1 className='title-header'>{title}</h1>*/}
      <img className='logo' src={pokelogo} />
      {children} {/* Permite insertar elementos adicionales como botones o enlaces */}
    </div>
  );
};

export default Header;