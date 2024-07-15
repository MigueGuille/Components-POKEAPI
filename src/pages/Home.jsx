import { useState, useEffect, useCallback } from 'react'
import { loadMorePokemons } from '../services/LoadMorePokemons.jsx'
import CustomCard from '../components/customCard/CustomCard.jsx'
import Header from '../components/header/Header.jsx'
import CustomInput from '../components/customInput/CustomInput.jsx'
import InfiniteScroll from '../components/infinityScroll/InfinityScroll.jsx'
import CustomDropdown from '../components/customDropdown/CustomDropdown'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import TopScroll from '../components/topScroll/TopScroll.jsx'
import { createContext } from 'react'


const Home = ({ scroll }) => {
    if(scroll===undefined)
      scroll=false
    else
      scroll=true

    const [inputValue, setInputValue] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [foundPokemon, setFoundPokemon] = useState(null);
    const [offset, setOffset] = useState(20);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(null)
    const [allPokeGenders, setAllPokeGenders] = useState(null);
    const [allGenders, setAllGenders] = useState(null);
    const navigate = useNavigate();
  
    // Function to load more pokemons
    const handleLoadMorePokemons = () => {
      loadMorePokemons(offset, setPokemons, setOffset, setLoading);
    };

    async function fetchGenders(){
      console.log('fetching')
      let arr = [];
      for(let i=1; i<=3; i++) {
        const response = await fetch('https://pokeapi.co/api/v2/gender/'+i)
        const data = await response.json();
        arr.push(data);
      }
      setAllGenders(arr);
    }
  
    useEffect(()=>{
      let objp = [];
      
      if(allGenders){
        for(let a in allGenders){
          for(let p in allGenders[a].pokemon_species_details){
            let obj = {};
            obj.name = allGenders[a].pokemon_species_details[p].pokemon_species.name;
            obj.gender = allGenders[a].name;
            objp[allGenders[a].pokemon_species_details[p].pokemon_species.url.split('/')[allGenders[a].pokemon_species_details[p].pokemon_species.url.split('/').length-2]] = obj
          }
        }
      }

      setAllPokeGenders(objp);
    },[allGenders])
  
    useEffect(()=>{
      if(allPokeGenders){
        console.log(allPokeGenders)
        //console.log(allPokeGenders.length-1)
      }
    },[allPokeGenders])

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

    useEffect(()=>{
      if(scroll){
        document.body.className = ''
      }else{
        document.body.className = 'body-noscroll'
      }
      fetchGenders();
    },[])

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
  
    useEffect(() => {
      const handler = setTimeout(() => {
        fetchPokemons();
      }, 500);
      return () => clearTimeout(handler);
    }, [inputValue, fetchPokemons]);

    // const handlePress = ({pokemon}) => {
    //     navigate(`/Pokemon/${pokemon.url}`)
    // }
  
    useEffect(() => {
      setContent(
        pokemons.map((pokemon, index) => (
          <div key={`${pokemon.url}-${index}`} className='card'>
            <CustomCard title={pokemon.name} fetchUrl={pokemon.url} imageKey={"front_default"} 
              number={ ()=> getPokemonNumber(pokemon.url) } />
          </div>
        ))
      )
    },[pokemons])
  
    return (
      <>
        <Header title="Pokedex">
          <CustomInput placeholder='Search' value={inputValue} onChange={onChange} />
        </Header>
        <TopScroll />
        <div className='body-app'>
          <div className='dropdown-app'>
            <CustomDropdown placeholder="Select the option"/>
          </div>
          <div className='content-app'>
            {content}
            <InfiniteScroll loading={loading} fetchMoreData={handleLoadMorePokemons} />
          </div>
        </div>
      </>
    );
};

export default Home;