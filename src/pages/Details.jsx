import { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/customInput/CustomInput'
import Header from '../components/header/Header'
import Loading from '../components/loading/Loading';
import './Details.css'
import { useParams } from "react-router-dom";
import CustomPokeVersion from '../components/customPokeVersion/CustomPokeVersion'
import BackgroundShapes from '../components/backgroundShapes/BackgroundShapes';
import Versions from '../components/versions/Versions';
import Characteristics from '../components/characteristics/Characteristics'
import Stats from '../components/stats/Stats';

export default function Details({ scroll }){
  if(scroll===undefined)
    scroll=false
  else
    scroll=true

  const { id } = useParams();

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
      document.body.className = ''
    }else{
      document.body.className = 'body-noscroll'
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

  useEffect(()=>{
    if(pokeCharacteristics){
      switch(pokeCharacteristics.id){
        case   1: case   2: case   3: case   7: case  10: case  19: case  23: case  29: 
        case  30: case  31: case  32: case  33: case  34: case  41: case  42: case  43:
        case  44: case  45: case  48: case  55: case  60: case  61: case  62: case  79:
        case  88: case  89: case  90: case  91: case  92: case  93: case  94: case  95:
        case 106: case 107: case 111: case 112: case 114: case 121: case 127: case 128:
        case 130: case 131: case 132:
          setColor('#d4af37');
          break;

        case   4: case   5: case   6: case  16: case  17: case  18: case  20: case  21:
        case  25: case  26: case  46: case  47: case  54: case  59: case  63: case  64:
        case  65: case  69: case  70: case  71: case  77: case  78: case  84: case  85:
        case  96: case  97: case 102: case 108: case 113: case 115: case 118: case 119:
        case 120: case 129:
          setColor('#00aae4');
          break;
        
        case   8: case   9: case  10: case  11: case  14: case  15: case  27: case  28:
        case  38: case  49: case  52: case  53: case  56: case  66: case  67: case  68:
        case  72: case  73: case  81: case  82: case  86: case  87: case 103: case 104:
        case 105: case 116: case 117: case 123:
          setColor('#eb636b');
          break;

        case  12: case  13: case  22: case  24: case  35: case  36: case  37: case  39:
        case  40: case  50: case  51: case  57: case  58: case  74: case  75: case  76:
        case  80: case  83: case  98: case  99: case 100: case 101: case 109: case 110:
        case 122:
          setColor('#42ab49')
          break;
      }
    }
  },[pokeCharacteristics])

  return(
    <>
      <Header>
          <CustomInput />
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
                <img src={pokeFrontDef} />
              </div>

              <Versions pokeVersions={pokeVersions} />
              
              <div className='flavor-text'> {pokeEntries[indexFlavor].flavor_text} </div>
            </div>
          </div>
        </>
        : <Loading /> }
      </div>
    </>
  )
}