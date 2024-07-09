import React, {useEffect, useState} from "react";

import StatsModal from "../descriptions/modalstats";
import ModalView from "../modalView/modalView";

const Change =({description, pokename, image, pokeType, fetchUrl, title, imageKey, })=>{

    const [alternA, setComponentA] = useState(true)
    const alternCompA = () =>{
        setComponentA(false)
          }
    const alternCompB = () =>{
        setComponentA(true)
          }
     
 

return(
<div onMouseEnter={alternCompA} onMouseLeave={alternCompB}>
{alternA ? <ModalView title={title} fetchUrl={fetchUrl} imageKey={imageKey} /> :
    <StatsModal description = {description} pokename = {pokename} image= {image} fetchUrl={fetchUrl} pokeType= {pokeType}/>
}</div>

)
}

export default Change