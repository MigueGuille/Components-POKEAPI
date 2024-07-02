import React, {useEffect, useState} from 'react';
import './modalView.css';
import CustomButton from '../customButton/customButton';
import useFetchPokemonDetails from '../../services/pokeDetails';

const CustomModal = ({handleClick, title, fetchUrl, imageKey, onClick}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';


    return (
        <div className="modal" onClick={onClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4>{title.toUpperCase()}</h4>
                </div>
                <div className="modal-body">
                <img src={imageUrl} alt={title} className='modal-image'/>
                    <CustomButton label="Open" onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
