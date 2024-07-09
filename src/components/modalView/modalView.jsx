import React, {useEffect, useState} from 'react';
import './modalView.css';
import useFetchPokemonDetails from '../../services/pokeDetails';
import StatsModal from '../descriptions/modalstats';

const CustomModal = ({children, title, fetchUrl, imageKey, onClick}) => {

  const pokemonDetails = useFetchPokemonDetails(fetchUrl);
  const imageUrl = pokemonDetails ? pokemonDetails.sprites[imageKey] : '';

   

    return (
        <div className="modal" onClick={onClick}>
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

