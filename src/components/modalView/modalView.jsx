import React, {useEffect, useState} from 'react';
import './modalView.css';
import CustomButton from '../customButton/customButton';
import useFetchPokemonDetails from '../../services/pokeDetails';

const CustomModal = ({handleClick, title, fetchUrl, imageKey}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';
  function handleClick(){
    console.log('open')
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body" onClick={handleClick}>
          <img src={imageUrl} alt={title} className='modal-image'/>
        </div>
        <div className="modal-header">
          <h4>{title.toUpperCase()}</h4>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
