import { useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";
import './Versions.css'

const Versions = ({ pokeVersions })=>{

  const verPerCol = 7; //Versions per columns
  const [colVersions, setColVersions] = useState(0)
  let divVersions = useRef();

  return(
    <div className='container-versions' onWheel={(e)=>{
      let limit = 0;
      if(e.deltaY > 0){

        if((pokeVersions.length/verPerCol - Math.floor(pokeVersions.length/verPerCol)) > 0)
          limit = Math.floor(pokeVersions.length/verPerCol)
        else
          limit = pokeVersions.length/verPerCol - 1;

        if(colVersions < limit)
            setColVersions(colVersions+1)
        
      }else{
        if(colVersions > 0)
          setColVersions(colVersions-1)
      }
    }} >
      <div className='versions' ref={divVersions} >
        {
          pokeVersions ? pokeVersions.filter((entrie, index)=>index>=colVersions*verPerCol && index<(colVersions*verPerCol+verPerCol)) : <Loading />
        }
      </div>
    </div>
  )
}

export default Versions;