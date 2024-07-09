import React, {useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import './CustomCard.css';
// import CustomButton from '../customButton/CustomButton';
// import pokeDetails from '../hooks/pokeDetails';

const CustomCard = ({ handleClick, number, title, fetchUrl, imageKey, fetchfunction}) => {

  const pokemonDetails = fetchfunction(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';
  // const handleClick = () => {
  //   console.log(pokemonDetails);
  // }
  return (
    <div className="customCard">
      <div className="customCard-content">
        <div className="customCard-body" onClick={handleClick}>
          <img src={imageUrl} alt={title} className='customCard-image'/>
        </div>
        <div className="customCard-header">
          <p>{ number() }</p>
          <h4>{title.toUpperCase()}</h4>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
