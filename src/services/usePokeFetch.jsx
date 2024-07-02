import { useState } from 'react';

export const fetchPokemons = async (offset) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();
    return data.results;
  };