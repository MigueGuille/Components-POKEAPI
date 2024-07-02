// loadMorePokemons.js
import { fetchPokemons } from './usePokeFetch'; // Assuming you have this function in a separate file

export const loadMorePokemons = async (offset, setPokemons, setOffset, setLoading) => {
  setLoading(true);
  const newPokemons = await fetchPokemons(offset);
  setPokemons(prev => [...prev, ...newPokemons]);
  setOffset(prev => prev + 20);
  setLoading(false);
};