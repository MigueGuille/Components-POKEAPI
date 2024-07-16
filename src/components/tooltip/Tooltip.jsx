import { useEffect, useRef, useState } from "react";
import './Tooltip.css'

const Tooltip = (domData, entrie, color, parent)=>{

  let textThisVersion = useRef();
  const [position, setPosition] = useState({ x:0, y:0 });

  useEffect(()=>{
    if(textThisVersion.current)
      textThisVersion.current.style.backgroundColor = color+'99';
  },[textThisVersion.current])

  useEffect(()=>{
    if(textThisVersion.current){
      let {width, height} = textThisVersion.current.getBoundingClientRect();
      
      //console.log(domData)
      //console.log(domData.x/ domData.width )

      setPosition({
        y: -height*3/4,
        //x: domData.x - (width / 2) + (domData.width / 2)
      })
    }
  },[domData])

  return(
    <span style={{ left: position.x, top: position.y }} ref={textThisVersion} className='tooltip'> {entrie.version.name} </span>
  )
}

export default Tooltip;