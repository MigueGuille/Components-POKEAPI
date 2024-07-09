import React, {useEffect, useState} from 'react';
import './modalView.css';
import useFetchPokemonDetails from '../../services/pokeDetails';

const CustomModal = ({children, title, fetchUrl, imageKey}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>{title.toUpperCase()}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;

