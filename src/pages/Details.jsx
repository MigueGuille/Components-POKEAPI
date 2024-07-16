import { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import Header from '../components/header/header'
import Loading from '../components/loading/Loading';
import './Details.css'
import { usePokeId } from '../services/index';
import { useParams } from "react-router-dom";
// import { pokeDetails } from '@migueguille/components';
import CustomPokeVersion from '../components/customPokeVersion/CustomPokeVersion'
import BackgroundShapes from '../components/backgroundShapes/BackgroundShapes';
import Versions from '../components/versions/Versions';
import Characteristics from '../components/characteristics/Characteristics'
import Stats from '../components/stats/Stats';
import pokelogo from '../assets/pokelogo.png'

export default function Details({ scroll }){
  if(scroll===undefined)
    scroll=false
  else
    scroll=true

  const { id } = useParams();
 const pokemonDetails = usePokeId(id)
  console.log(id)

  const [isLoaded, setIsLoaded] = useState(false)

  const [pokeCharacteristics, setPokeCharacteristics] = useState(null);
  const [pokeFrontDef, setPokeFrontDef] = useState(null);
  const [pokeEntries, setPokeEntries] = useState(null);
  const [indexFlavor, setIndexFlavor] = useState(0);
  const [pokeVersions, setPokeVersions] = useState(null);
  const [color, setColor] = useState('#dddddd');

  /**Weakness
   //https://pokeapi.co/api/v2/gender/2/
   * Evols
   //https://pokeapi.co/api/v2/type/18
   * Stats
  */
  

  useEffect(()=>{
    fecthPokeData();
    if(scroll){
      // document.body.className = ''
    }else{
      // document.body.className = 'body-noscroll'
    }
  },[])

  async function fecthPokeData(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    const data = await response.json();
    
    setPokeFrontDef(data.sprites.front_default);
      
    const resUrl = await fetch(data.species.url)
    const dataUrl = await resUrl.json();
    
    const genus = dataUrl.genera.filter(gen=> gen.language.name=='en')
    
    let obj = {}
    obj.id = data.id;
    obj.name = data.name;
    obj.category = genus;
    obj.weight = data.weight;
    obj.height = data.height;
    obj.abilities = data.abilities;
    obj.stats = data.stats;
    
    setPokeCharacteristics(obj);

    //setPokeTypes(pokeData.types.map((t)=>t.type.name));
    
    const enEntries = dataUrl.flavor_text_entries.filter((entrie)=> entrie.language.name==='en')
    setPokeEntries(enEntries);

    setIsLoaded(true);
  }

  useEffect(()=>{
    if(pokeEntries){
      setPokeVersions(
        pokeEntries.map((entrie, index)=>
           <CustomPokeVersion color={color} key={index} entrie={entrie} index={index} setIndexFlavor={setIndexFlavor} />
        )
      )
    }
  },[pokeEntries])

  function getNumber(id){
    if(id<10)
      return '000'+id;
    else if(id<100)
      return '00'+id;
    else if(id<1000)
      return '0'+id;
    else
      return id;
  }


  return(
    <>
      <Header pokelogo={pokelogo}>
          {/* <CustomInput /> */}
      </Header>

      <div className='body-app-d'  >
        { isLoaded ? 
        <>
        
          <BackgroundShapes getNumber={getNumber} id={pokeCharacteristics.id} color={color} />
          <Characteristics characteristics={pokeCharacteristics} />
          <Stats stats={pokeCharacteristics.stats} />

          <div className='content-app-d' >
            <div className='container-id'>
              <div className='id'>
                <p> {getNumber(pokeCharacteristics.id)} </p>
                <p> {pokeCharacteristics.name}  </p>
              </div>
            </div>
            

            <div className='details'>
              <div className='image'>
                <img src={pokemonDetails.sprites.front_default} />
              </div>
              <div className='versions-div'>
            <Versions pokeVersions={pokeVersions} />
          </div>
            </div>


          <div className='flavor-text'>{pokeEntries[indexFlavor].flavor_text}</div>
          </div>
        </>
        : <Loading /> }
      </div>
    </>
  )
}