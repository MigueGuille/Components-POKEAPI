import { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import Header from '../components/header/Header'
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
import Carousel from '../components/carousel/Carousel';
import TitlePokemon from '../components/titlePokemon/TitlePokemon';

export default function Details({ noscroll }){
  
  if(noscroll===undefined)
    noscroll=false
  else
    noscroll=true

  const activeColor = true;
  const idOpacity = 0.5;

  const { id } = useParams();
  const pokemonDetails = usePokeId(id)

  const [isLoaded, setIsLoaded] = useState(false)

  const [pokeCharacteristics, setPokeCharacteristics] = useState(null);
  const [pokeFrontDef, setPokeFrontDef] = useState(null);
  const [pokeEntries, setPokeEntries] = useState(null);
  const [indexFlavor, setIndexFlavor] = useState(0);
  const [pokeVersions, setPokeVersions] = useState(null);
  const [colors, setColors] = useState({});

  /**Weakness
   //https://pokeapi.co/api/v2/gender/2/
   * Evols
   //https://pokeapi.co/api/v2/type/18
   * Stats
  */
  

  useEffect(()=>{
    fecthPokeData();
    if(!noscroll){
      document.body.className = ''
    }else{
      document.body.className = 'body-noscroll'
    }
  },[])

  async function fecthPokeData(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    const data = await response.json();
    //console.log(data.sprites)
    
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
    obj.types = data.types.map((t)=>t.type.name).sort();
    
    setColors(getColors(obj.types));

    setPokeCharacteristics(obj);

    //setPokeTypes(pokeData.types.map((t)=>t.type.name));
    
    const enEntries = dataUrl.flavor_text_entries.filter((entrie)=> entrie.language.name==='en')
    setPokeEntries(enEntries);

    setIsLoaded(true);
  }

  function getColors(types){

    let newColors = { color1: 'hsl(0, 0%, 93%)', color2: 'hsl(0, 0%, 13%)' } //Colores predefinidos

    let typeColors = [];

    types.forEach(t=>{
      t ===  'grass'   ? typeColors.push('hsl(112, 76%, 27%)') : ''
      t ===  'poison'  ? typeColors.push('hsl( 66, 89%, 52%)') : ''
      t ===   'fire'   ? typeColors.push('hsl( 22, 91%, 55%)') : ''
      t ===  'flying'  ? typeColors.push('hsl(215, 76%, 31%)') : ''
      t ===   'water'  ? typeColors.push('hsl(210,100%, 67%)') : ''
      t ===   'bug'    ? typeColors.push('hsl(180, 81%, 43%)') : ''
      t ===  'normal'  ? typeColors.push('hsl(240,  1%, 67%)') : ''
      t === 'electric' ? typeColors.push('hsl( 56, 89%, 53%)') : ''
      t ===  'ground'  ? typeColors.push('hsl( 24, 56%, 43%)') : ''
      t ===   'fairy'  ? typeColors.push('hsl(302, 94%, 66%)') : ''
      t === 'fighting' ? typeColors.push('hsl( 24, 54%, 23%)') : ''
      t ===  'psychic' ? typeColors.push('hsl(276, 85%, 83%)') : ''
      t ===   'rock'   ? typeColors.push('hsl(210,  2%, 29%)') : ''
      t ===   'steel'  ? typeColors.push('hsl(213, 11%, 67%)') : ''
      t ===    'ice'   ? typeColors.push('hsl(210,100%, 85%)') : ''
      t ===   'ghost'  ? typeColors.push('hsl(  0,  0%,100%)') : ''
      t ===  'dragon'  ? typeColors.push('hsl(357, 79%, 46%)') : ''
      t ===   'dark'   ? typeColors.push('hsl(  0,  0%,  0%)') : ''
    })

    //reemplazar los colores de newColors con los de typeColors

    typeColors.forEach((color, index)=>{
      let c = 'color'+(index+1)
      newColors[c] = color;
    })

    let midcolor = getMidColor(hsl2hex(newColors.color1), hsl2hex(newColors.color2));
    midcolor = hex2hsl(midcolor);

    newColors.midcolor = midcolor;
    let contrMidcolor = newColors.midcolor.split(',')
    contrMidcolor[1] = '80%'
    contrMidcolor[2] = '45%'
    newColors.contrMidcolor = contrMidcolor.join(',');

    newColors.textSpecs2 = getComplementaryColor(newColors.color1);
    
    let textTitle = newColors.textSpecs2.split(',')
    textTitle[2] = '50%'
    textTitle = textTitle.join(',')
    newColors.textTitle = textTitle;
    
    newColors.textSpecs3 = getComplementaryColor(newColors.color2);
    
    if(newColors.color2 !== 'hsl(0, 0%, 13%)')
      newColors.textArrws = getComplementaryColor(newColors.midcolor);
    else
      newColors.textArrws = newColors.textSpecs3;

    /*let test = newColors.textArrws.split(',')
    test[2] = '90%'
    test = test.join(',')
    newColors.textArrws = test;*/
    return newColors;
  }

  function hex2hsl(hex) {

    if(hex[0] === '#') hex = hex.slice(1);

    let r = parseInt(hex.slice(0,2), 16) / 255;
    let g = parseInt(hex.slice(2,4), 16) / 255;
    let b = parseInt(hex.slice(4,6), 16) / 255;
    let a = parseInt(hex.slice(6,8), 16) / 255 || 1;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if(max == min){
      h = s = 0; // achromatic
    }else{
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    h = Math.floor(h * 360);
    s = Math.floor(s * 100);
    l = Math.floor(l * 100);
    a = a.toFixed(2);

    return 'hsla('+h + ', ' + s + '%, ' + l + '%, ' + a + ')';
  }

  function hsl2hex(hsl) {
    let sep = hsl.indexOf(",") > -1 ? "," : " ";

    if(hsl.substr(0,5)==='hsla(')
      hsl = hsl.substr(5).split(")")[0].split(sep);
    else
      hsl = hsl.substr(4).split(")")[0].split(sep);
  
    let h = hsl[0];
    let s = hsl[1].substr(0,hsl[1].length - 1) / 100;
    let l = hsl[2].substr(0,hsl[2].length - 1) / 100;
    let a = hsl[3];
  
    // strip label and convert to degrees (if necessary)
    if (h.indexOf("deg") > -1)
      h = h.substr(0,h.length - 3);
    else if (h.indexOf("rad") > -1)
      h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
    else if (h.indexOf("turn") > -1)
      h = Math.round(h.substr(0,h.length - 4) * 360);
    if (h >= 360)
      h %= 360;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
        a = a || 1;
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    if(r.length === 1) r = '0'+r;
    if(g.length === 1) g = '0'+g;
    if(b.length === 1) b = '0'+b;
    a = Math.round(a * 255).toString(16);

    return '#'+r+g+b+a;
  }

  function getMidColor(color1, color2){

    if(color1[0] === '#') color1 = color1.slice(1);
    if(color2[0] === '#') color2 = color2.slice(1);

    let r1 = color1.slice(0,2);
    let g1 = color1.slice(2,4);
    let b1 = color1.slice(4,6);
    let a1 = color1.slice(6,8) || 'ff';

    let r2 = color2.slice(0,2);
    let g2 = color2.slice(2,4);
    let b2 = color2.slice(4,6);
    let a2 = color2.slice(6,8) || 'ff';

    let r = Math.floor((parseInt(r1, 16) + parseInt(r2, 16)) / 2).toString(16);
    let g = Math.floor((parseInt(g1, 16) + parseInt(g2, 16)) / 2).toString(16);
    let b = Math.floor((parseInt(b1, 16) + parseInt(b2, 16)) / 2).toString(16);
    let a = Math.floor((parseInt(a1, 16) + parseInt(a2, 16)) / 2).toString(16);

    return r+g+b+a;
  }

  const getComplementaryColor = (hsl) => {
    let sep = hsl.indexOf(",") > -1 ? "," : " ";

    if(hsl.substr(0,5)==='hsla(')
      hsl = hsl.substr(5).split(")")[0].split(sep);
    else
      hsl = hsl.substr(4).split(")")[0].split(sep);
    
    let h = parseInt(hsl[0], 10);
    let s = hsl[1].substr(0,hsl[1].length - 1) / 100;
    let l = hsl[2].substr(0,hsl[2].length - 1) / 100;
    let a = hsl[3] || 1;
    h = (h + 180) % 360;

    l < 0.5 ? l = 0.6 : l = 0.4;
    
    s < 0.5 ? l < 0.5 ? l = 0.1 : l = .9 : s = .8;
    
    l = l.toFixed(2);
    
    return  'hsla('+h + ', ' + s*100 + '%' + ',' + l*100 + '%, ' + a + ')';
  }

  useEffect(()=>{
    if(pokeEntries){
      setPokeVersions(
        pokeEntries.map((entrie, index)=>
           <CustomPokeVersion color={colors} key={index} entrie={entrie} index={index} setIndexFlavor={setIndexFlavor} />
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
          {/* <CustomInput />*/}
      </Header>

      <div className='body-app-d'  >
        { isLoaded ? 
        <>
        
          <BackgroundShapes getNumber={getNumber} id={pokeCharacteristics.id} color={colors} />
            
          <Characteristics characteristics={pokeCharacteristics} />
          <Stats dataStats={pokeCharacteristics.stats} colors={colors} activeColor={activeColor} idOpacity={idOpacity} />

          <div className='content-app-d' >
            <div className='container-id'>
              <TitlePokemon pokeCharacteristics={pokeCharacteristics} getNumber={getNumber} colors={colors} />
            </div>
            
            <div className='details'>
              <div className='image'>
                <Carousel pokemonId={id} colors={colors} ></Carousel>
              </div>
              <div className='versions-div'>
                <Versions pokeVersions={pokeVersions} colors={colors} activeColor={activeColor} idOpacity={idOpacity} hideBarSide={true}/>
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