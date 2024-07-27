import { useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";
import './Versions.css'

const Versions = ({ pokeVersions })=>{

  const verPerCol = 7; //Versions per columns
  const [colVersions, setColVersions] = useState(0)
  const [limit, setLimit] = useState(0)
  const [bars, setBars] = useState([])
  let divVersions = useRef();
  const barRefs = useRef([]);

  useEffect(()=>{
    if(pokeVersions){
      if((pokeVersions.length/verPerCol - Math.floor(pokeVersions.length/verPerCol)) > 0)
        setLimit(Math.floor(pokeVersions.length/verPerCol))
      else
        setLimit(pokeVersions.length/verPerCol - 1)
    }
  },[pokeVersions])

  useEffect(()=>{
    getBars(limit)
  },[limit])

  //cada vez que cambie colVersions se actualizan las clases de las barras
  useEffect(() => {
    if (barRefs.current.length > 0) {
      barRefs.current.forEach((bar, index) => {
        if (bar) {
          if (index === colVersions) {
            bar.classList.add('active');
          } else if (bar.classList.contains('active')) {
            bar.classList.remove('active');
          }
        } else {
          console.log('No hay clases');
          console.log(bar.className);
        }
      });
    }
  }, [colVersions]);

  useEffect(()=>{
    if(barRefs.current && limit > 0){
      barRefs.current.forEach(bar=>{
        let space = (divVersions.current.offsetHeight/((limit+1)*2))

        if(bar.getAttribute('keyy')==='0')
          bar.style.marginTop = space/4 +'px';

        space += 'px';
        bar.style.height = space;
        bar.style.marginBottom = space;
      })
    }
  },[barRefs.current])

  const getBars = (limit) => {
    let newBars = [];
    barRefs.current = []; // Reinicia las referencias
  
    for (let i = 0; i <= limit; i++) {
        newBars.push(
          <div
            className={ i===0 ? 'bar-v active' : 'bar-v' }
            key={i}
            keyy={i}
            ref={(el) => (barRefs.current[i] = el)}
          />
        );
      }
    
  
    setBars(newBars);
  };

  return(
    <div className='container-versions' >
      <div className='versions' ref={divVersions} onWheel={(e)=>{
        if(e.deltaY > 0){

          if(colVersions < limit)
              setColVersions(colVersions+1)
                      
        }else{
          if(colVersions > 0)
            setColVersions(colVersions-1)
        }
      }} >
        { pokeVersions ? pokeVersions.filter((entrie, index)=>index>=colVersions*verPerCol && index<(colVersions*verPerCol+verPerCol)) : <Loading /> }
      </div>
      
      <div className="bars-v">
        { bars }
      </div>
    </div>
  )
}

export default Versions;