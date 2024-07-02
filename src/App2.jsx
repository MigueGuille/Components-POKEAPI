import { useState, useEffect } from 'react'
import './App.css'
import CustomCard from './components/customCard/CustomCard.jsx'
import Header from './components/header/Header'
import CustomInput from './components/customInput/CustomInput.jsx'
import InfiniteScroll from './components/infinityScroll/InfinityScroll'
import CustomDropdown from './components/customDropdown/CustomDropdown.jsx'
import Loading from './components/loading/Loading.jsx'


function App() {
  const [inputValue, setInputValue] = useState('');
  const [clientPokemons, setClientPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemonsContent, setPokemonsContent] = useState(null)
  const [dataPokemons, setDataPokemons] = useState([]);
  const [lastPokemon, setLastPokemon] = useState(null);
  const [content, setContent] = useState(Loading);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchFilterPokemons = async ()=>{
    if(inputValue!==''){
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
      const data = await response.json();
      setDataPokemons(data.results.sort( (a, b)=> {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }))
      setLoading(false);
      
    }else
      fetchPokemons();
  }

  const fetchPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();
    setDataPokemons(data)
  };

  const sendPokemons = async (data) => {
    setLoading(true);
    setClientPokemons(prev => [...prev, ...data.results]);
    setOffset(prev => prev + 20);
    setLoading(false);
  }

  useEffect(()=>{
    setClientPokemons(dataPokemons)
  },[dataPokemons])

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

  useEffect(()=>{
    fetchFilterPokemons();
  },[inputValue])

  useEffect(()=>{
    setPokemonsContent(
      clientPokemons.map((pokemon, index) => (
        <div key={`${pokemon.url}-${index}`} className='card'>
          <CustomCard handleClick={() => console.log('Clicked') } title={pokemon.name} fetchUrl={pokemon.url} imageKey={"front_default"} 
            number={ ()=> getPokemonNumber(pokemon.url) } />
        </div>
      ))
    )
  },[clientPokemons])

  useEffect(()=>{
    setContent(
      <>
        <div className='dropdown-app'>
          <CustomDropdown placeholder="Order by"/>
        </div>
        <div className='content-app'>
          { content }
          <InfiniteScroll loading={loading} fetchMoreData={fetchPokemons} />
        </div>
      </>
    )
  },[pokemonsContent])
  
  useEffect(()=>{
    
  },[content])
  

  return (
    <>
      <Header title="Pokedex">
        <CustomInput placeholder='Search' value={inputValue} onChange={handleInputChange} />
      </Header>
      <div className='body-app'>
        { content }
      </div>
    </>
  )
}


export default App
