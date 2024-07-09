import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { loadMorePokemons } from "./services/LoadMorePokemons"
import CustomCard from './components/customCard/CustomCard.jsx'
import Header from './components/header/Header'
import CustomInput from './components/customInput/CustomInput.jsx'
import InfiniteScroll from './components/infinityScroll/InfinityScroll'
import CustomDropdown from './components/customDropdown/CustomDropdown.jsx'
import TopScroll from './components/topScroll/TopScroll.jsx'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
/*
export const router = createBrowserRouter(routes)
<>
      {
        createRoot(document.getElementById("root")).render(
          <RouterProvider router={router} />
        )
      }
    </>
*/
function App() {
  
  const [inputValue, setInputValue] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [foundPokemon, setFoundPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(pokemons)
  const [content, setContent] = useState(null)

  // Function to load more pokemons
  const handleLoadMorePokemons = () => {
    loadMorePokemons(offset, setPokemons, setOffset, setLoading);
  };

  useEffect(() => {
    setContent(
      pokemons.map((pokemon, index) => (
        <div key={pokemon.url-index} className='card'>
          <CustomCard handleClick={() => console.log('Clicked') } title={pokemon.name} fetchUrl={pokemon.url} imageKey={"front_default"} 
            number={ ()=> getPokemonNumber(pokemon.url) } />
        </div>
      ))
    )
  },[pokemons])

  function getPokemonNumber(url){  
    const urlSplitted = url.split('/');
    urlSplitted.pop();
    const digitsNumber = (urlSplitted[urlSplitted.length-1] + '').split('')
    let newDigitsNumber = digitsNumber;
    for(let d=digitsNumber.length; d<4; d++){
      newDigitsNumber= ['0'].concat(newDigitsNumber)
    }
    
    return newDigitsNumber.join('')
  }

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

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPokemons();
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, fetchPokemons]);

  return (
    <>
      <Header title="Pokedex">
        <CustomInput />
      </Header>
      <TopScroll />
      <div className='body-app'>
        <div className='dropdown-app'>
          <CustomDropdown placeholder="Select the option"/>
        </div>
        <div className='content-app'>
          { content }
          <InfiniteScroll loading={loading} fetchMoreData={handleLoadMorePokemons} />
        </div>
      </div>
    </>
  );
}

export default App;

