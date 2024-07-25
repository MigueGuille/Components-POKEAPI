import  loadMorePokemons from "./hooks/LoadMorePokemons";
import pokeDetails from "./hooks/PokeDetails";
import usePokeId from "./hooks/UsePokeId";
import usePokefetch from "./hooks/UsePokeFetch";
import useFoundPokemon from "./hooks/UseFoundPokemon";
import { getPokemonNumber, getPokemonIndex } from "./functions/GetPokemonNumber";

export { useFoundPokemon, loadMorePokemons, pokeDetails, usePokeId, usePokefetch, getPokemonNumber, getPokemonIndex };