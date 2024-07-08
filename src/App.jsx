import { useState, useEffect } from 'react'
import './App.css'
import { loadMorePokemons } from "./services/loadMorePokemons"
import CardView from './pages/cardView'
import CustomCard from './components/customCard/CustomCard.jsx'
import Header from './components/header/Header'
import CustomInput from './components/customInput/CustomInput.jsx'
import InfiniteScroll from './components/infinityScroll/InfinityScroll'
import CustomDropdown from './components/customDropdown/CustomDropdown.jsx'

//This is a test

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
        <CustomInput placeholder='Search' value={inputValue} onChange={handleInputChange} />
      </Header>
      <div className='body-app'>
        <div className='dropdown-app'>
          <CustomDropdown placeholder="Select the option"/>
        </div>
        <div className='content-app'>
          { content }
          <InfiniteScroll loading={loading} fetchMoreData={fetchPokemons} />
        </div>
      </div>
    </>
  );
}

export default App;

