import { useEffect, useState } from 'react';
import CustomInput from '../components/customInput/CustomInput'
import Header from '../components/header/Header'

export default function Details(){

  const [pokeData, setPokeData] = useState(null);
  const [pokeName, setPokeName] = useState(null);
  const [pokeId, setPokeId] = useState(null);
  const [pokeTypes, setPokeTypes] = useState(null);
  const [pokeHight, setPokeHeight] = useState(null);
  const [pokeFrontDef, setPokeFrontDef] = useState(null);

  useEffect(()=>{
    fecthPokeData();
  },[])

  
  async function fecthPokeData(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/7')
    const data = await response.json();
    setPokeData(data)
  }

  useEffect(()=>{
    if(pokeData!==null){
      setPokeName(pokeData.name);
      setPokeId(pokeData.id);
      setPokeTypes(pokeData.types.map((t)=>t.type.name));
      setPokeHeight(pokeData.height);
      setPokeFrontDef(pokeData.sprites.front_default);
      
      console.log()
      console.log(pokeData)
    }
  },[pokeData])

  return(
    <>
      <Header title="Pokedex">
          <CustomInput />
      </Header>

      <div className='bodyApp'>
      </div>
    </>
  )
}