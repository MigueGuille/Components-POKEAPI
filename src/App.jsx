import { useState, useEffect, useCallback } from 'react'
import CustomModal from './components/modalView/modalView'
import Header from '@migueguille/component_pokeapi/dist/header/header'
import CustomInput from '@migueguille/component_pokeapi/dist/customInput/customInput'
import InfiniteScroll from '@migueguille/component_pokeapi/dist/infinityScroll/infinityScroll'
import './App.css'
import { loadMorePokemons } from "./services/loadMorePokemons"
import CardView from './pages/cardView'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [foundPokemon, setFoundPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(pokemons)

  // Function to load more pokemons
  const handleLoadMorePokemons = () => {
    loadMorePokemons(offset, setPokemons, setOffset, setLoading);
  };


  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    try {
      if (inputValue) {
        // Fetch a specific pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
        const data = await response.json();
        console.log(data)
        setFoundPokemon(data); 
      } else {
        // Fetch all pokemons
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const data = await response.json();
        setPokemons(data.results); 
        setFoundPokemon(null); 
      }
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    } finally {
      setLoading(false);
    }
  }, [inputValue]);

  // const handleInputChange = useCallback(debounce((value) => {
  //   setInputValue(value);
  //   if (value.trim() !== '') {
  //     fetchPokemon(value);
  //     console.log(pokemons)
  //   } else {
  //     handleLoadMorePokemons(); 
  //   }
  // }, 200), []); 

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPokemons();
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, fetchPokemons]);

  return (
    <>
      <Header title="Pokedex">
        <CustomInput label="Search" value={inputValue} onChange={onChange} />
      </Header>
      <div className='body-app'>
        {foundPokemon ? (
          <div className='card'>
            <CustomModal handleClick={() => console.log("Se abrió")} title={foundPokemon.name} fetchUrl={foundPokemon.url} imageKey={"front_default"}>
              <CardView pokemon={foundPokemon} />
            </CustomModal>
          </div>
        ) : (
          pokemons.map((pokemon) => (
            <div key={pokemon.name} className='card'>
              <CustomModal handleClick={() => console.log("Se abrió")} title={pokemon.name} fetchUrl={pokemon.url} imageKey={"front_default"}>
                <CardView pokemon={pokemon} />
              </CustomModal>
            </div>
          ))
        )}
        <InfiniteScroll loading={loading} fetchMoreData={handleLoadMorePokemons} />
      </div>
    </>
  );
}

export default App;

