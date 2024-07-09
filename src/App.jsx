import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalView from './components/modalView/modalView'
import Header from './components/header/header'
import CustomInput from './components/CustomInput/CustomInput'
import InfiniteScroll from './components/InfinityScroll/infinityScroll'
import StatsModal from './components/descriptions/modalstats'
import Change from './components/changeModal/change'


function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alternA, setComponentA] = useState(true)
  const [activePokemon, setActivePokemon] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const fetchPokemons = async () => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();
    setPokemons(prev => [...prev, ...data.results]);
    setOffset(prev => prev + 20);
    setLoading(false);
  };



  useEffect(() => {
    fetchPokemons();
  }, []);

 
  return (
    <>
  <Header title="Pokedex">
    <CustomInput label="Search" value={inputValue} onChange={handleInputChange} />
  </Header>
  <div className='body-app'>
  {pokemons.map((pokemon, index) => (
  <div key={`${pokemon.url}-${index}`} className='card'>
<Change title={pokemon.name} fetchUrl={pokemon.url} imageKey={"front_default"} description = {"flavor_text"} pokename = {pokemon.name} image= {"front_default"} pokeType= {"name"}/>
  </div>
))}
  <InfiniteScroll loading={loading} fetchMoreData={fetchPokemons} />
    </div>
    </>
  )
}


export default App
