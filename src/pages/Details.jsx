import { useEffect, useState } from 'react';
import CustomInput from '../components/customInput/CustomInput'
import Header from '../components/header/Header'
import { setUISelection } from '@testing-library/user-event/dist/cjs/document/UI.js';
import Loading from '../components/loading/Loading';
import './Details.css'

export default function Details(){

  const [isReady, setIsReady] = useState(false)
  const [pokeData, setPokeData] = useState(null);

  const [pokeName, setPokeName] = useState(null);
  const [pokeId, setPokeId] = useState(null);
  const [pokeTypes, setPokeTypes] = useState(null);
  const [pokeHeight, setPokeHeight] = useState(null);
  const [pokeFrontDef, setPokeFrontDef] = useState(null);
  const [pokeEntries, setPokeEntries] = useState(null);
  const [pokeCategory, setPokeCategory] = useState(null);
  const [pokeWeight, setPokeWeight] = useState(null);
  const [pokeVersions, setPokeVersions] = useState(null);
  const [indexFlavor, setIndexFlavor] = useState(0);

  const [pokeGender, setPokeGender] = useState(null);
  //https://pokeapi.co/api/v2/gender/2/
  const [pokeWeakness, setPokeWeakness] = useState(null);
  //https://pokeapi.co/api/v2/type/18
  const [pokeEvols, setPokeEvols] = useState(null);
  const [pokeStats, setPokeStats] = useState(null);

  useEffect(()=>{
    fecthPokeData();
  },[])

  
  async function fecthPokeData(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/8')
    const data = await response.json();
    setPokeData(data)
  }

  useEffect(()=>{
    setPokeDataa();
  },[pokeData])

  async function setPokeDataa(){
    if(pokeData!==null){
      setPokeName(pokeData.name);
      setPokeId(pokeData.id);
      setPokeTypes(pokeData.types.map((t)=>t.type.name));
      setPokeHeight(pokeData.height);
      setPokeFrontDef(pokeData.sprites.front_default);
      
      const resUrl = await fetch(pokeData.species.url)
      const dataUrl = await resUrl.json();

      const enEntries = dataUrl.flavor_text_entries.filter((entrie)=> entrie.language.name==='en')
      setPokeEntries(enEntries);
      
      const genus = dataUrl.genera.filter(gen=> gen.language.name=='en')
      setPokeCategory(genus);

      setPokeWeight(pokeData.weight);
      setIsReady(true);
      
      
      //console.log(dataUrl.flavor_text_entries.map((entrie)=>entrie.version.name))
    }
  }

  function handleOnClick(index){
    setIndexFlavor(index);
  }

  return(
    <>
      <Header title="Pokedex">
          <CustomInput />
      </Header>

      <div className='body-app'>
        { isReady ? 
        <>
          <div className='content-app'>
            <div className='id'>
              <h2> {pokeName} </h2>
              <h2> {pokeId} </h2>
            </div>

            <div className='details'>
              <div className='image'>
                <img src={pokeFrontDef} />
              </div>

              <div className='specs'>
                { <p> {pokeEntries[indexFlavor].flavor_text} </p> }
                <div className='versions'>
                  {
                    pokeEntries.map((entrie, index)=>
                      <div className={entrie.version.name} onClick={()=>{handleOnClick(index)}} >
                        <svg width='30' height='30' viewBox='-3 -3 30 30' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
                          <rect width='30' height='30' stroke='none' fill='#000000' opacity='0'/>
                          <g transform="matrix(1.25 0 0 1.25 12 12)" >
                          <path style={{stroke: 'none', 'stroke-width': 1, 'stroke-dasharray': 'none', 'stroke-linecap': 'butt', 'stroke-dashoffset': 0, 'stroke-linejoin': 'miter', 'stroke-miterlimit': 4, 'fill-rule': 'nonzero', 'opacity': 1}} transform=" translate(-16, -16)" d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.199219 6 25.441406 9.933594 25.9375 15 L 19.84375 15 C 19.398438 13.28125 17.851563 12 16 12 C 14.148438 12 12.601563 13.28125 12.15625 15 L 6.0625 15 C 6.558594 9.933594 10.800781 6 16 6 Z M 16 14 C 17.117188 14 18 14.882813 18 16 C 18 17.117188 17.117188 18 16 18 C 14.882813 18 14 17.117188 14 16 C 14 14.882813 14.882813 14 16 14 Z M 16 15 C 15.449219 15 15 15.449219 15 16 C 15 16.550781 15.449219 17 16 17 C 16.550781 17 17 16.550781 17 16 C 17 15.449219 16.550781 15 16 15 Z M 6.0625 17 L 12.15625 17 C 12.601563 18.71875 14.148438 20 16 20 C 17.851563 20 19.398438 18.71875 19.84375 17 L 25.9375 17 C 25.441406 22.066406 21.199219 26 16 26 C 10.800781 26 6.558594 22.066406 6.0625 17 Z" stroke-linecap="round" />
                          </g>
                        </svg>
                      </div>
                    )
                  }
                </div>
                <div>
                  <h3>Category</h3>
                  { 
                 pokeCategory.map((ctgy, index)=>
                  <p key={index} > {ctgy.genus} </p>
                ) }
                </div>
              </div>
            </div>
          </div>
        </>
        : <Loading /> }
      </div>
    </>
  )
}