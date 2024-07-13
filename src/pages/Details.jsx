import { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/customInput/CustomInput'
import Header from '../components/header/Header'
import { setUISelection } from '@testing-library/user-event/dist/cjs/document/UI.js';
import Loading from '../components/loading/Loading';
import './Details.css'
import usePokeId from "../services/UsePokeId";
import { useParams } from "react-router-dom";
import CustomPokeVersion from '../components/customPokeVersion/CustomPokeVersion'
import { useContext } from 'react';
import { HeaderContext } from '../components/headerProvider/HeaderProvider';
import BackgroundShapes from '../components/backgroundShapes/BackgroundShapes';

export default function Details({ scroll }){
  if(scroll===undefined)
    scroll=false
  else
    scroll=true

  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false)
  const [pokeData, setPokeData] = useState(null);

  const [pokeName, setPokeName] = useState(null);
  const [pokeId, setPokeId] = useState(null);
  const [pokeTypes, setPokeTypes] = useState(null);
  const [pokeHeight, setPokeHeight] = useState(null);
  const [pokeFrontDef, setPokeFrontDef] = useState(null);
  const [pokeEntries, setPokeEntries] = useState(null);
  const [pokeCategory, setPokeCategory] = useState(null);
  const [pokeWeight, setPokeWeight] = useState(null);
  const [indexFlavor, setIndexFlavor] = useState(0);
  const [isVersionOpened, setIsVersionOpened] = useState(false);
  const [pokeVersions, setPokeVersions] = useState(null);
  const [partVersions, setPartVersions] = useState(null);

  const [pokeGender, setPokeGender] = useState(null);
  //https://pokeapi.co/api/v2/gender/2/
  const [pokeWeakness, setPokeWeakness] = useState(null);
  //https://pokeapi.co/api/v2/type/18
  const [pokeEvols, setPokeEvols] = useState(null);
  const [pokeStats, setPokeStats] = useState(null);
  let divVersions = useRef();


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
      setIsLoaded(true);
    }
  }

  function openVersions(){
    isVersionOpened ? setIsVersionOpened(false) : setIsVersionOpened(true)
  }

  useEffect(()=>{
    if(pokeEntries){
      setPokeVersions(
        pokeEntries.map((entrie, index)=>
           <CustomPokeVersion key={index} entrie={entrie} index={index} setIndexFlavor={setIndexFlavor} />
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
      <Header>
          <CustomInput />
      </Header>

      <div className='body-app-d'  >
        { isLoaded ? 
        <>
        
        <BackgroundShapes id={pokeId} />

          <div className='content-app-d' >
            <div className='container-id'>
              <div className='id'>
                <p> {getNumber(pokeId)} </p>
                <p> {pokeName}  </p>
              </div>
            </div>
            

            <div className='details'>
              <div className='image'>
                <img src={pokeFrontDef} />
              </div>

              <div className='container-versions'>
                <div className='versions' ref={divVersions} >
                  {
                    isVersionOpened ? pokeVersions : pokeVersions ? pokeVersions.filter((entrie, index)=>index<7) : <Loading />
                  }
                </div>
                {/*<div className='openButton' onClick={openVersions}>
                  { isVersionOpened ? 'Collapse' : 'Expand' }
                </div>*/}
              </div>

              {/**<div className='specs'>
                { <p> {pokeEntries[indexFlavor].flavor_text} </p> }
                <div className='category'>
                  <h3>Category</h3>
                  { 
                 pokeCategory.map((ctgy, index)=>
                  <p key={index} > {ctgy.genus} </p>
                ) }
                </div>
              </div> */}
            </div>
          </div>
        </>
        : <Loading /> }
      </div>
    </>
  )
}