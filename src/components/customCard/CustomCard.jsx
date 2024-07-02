import React, {useEffect, useState} from 'react';
import './CustomCard.css';
import CustomButton from '../customButton/CustomButton';
import useFetchPokemonDetails from '../../services/PokeDetails';

const CustomCard = ({handleClick, number, title, fetchUrl, imageKey}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';

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
