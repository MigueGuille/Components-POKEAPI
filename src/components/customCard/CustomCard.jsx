import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomCard.css';
// import CustomButton from '../customButton/CustomButton';
import useFetchPokemonDetails from '../../services/pokeDetails';

const CustomCard = ({ id, number, title, fetchUrl, imageKey}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const navigate = useNavigate();
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';
  const handleClick = () => {
    navigate(`/pokemon/${title}`);
  }
  return (
    <div className="customCard">
      <div className="customCard-content">
        <div className="customCard-id">
          <p>{ number() }</p>
        </div>
        <div className="customCard-body" onClick={handleClick}>
          <img src={imageUrl} alt={title} className='customCard-image'/>
        </div>
        <div className='customCard-name'>
          <div className='name'>
            <h4>{title.toUpperCase()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
