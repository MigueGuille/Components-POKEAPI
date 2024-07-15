import { useEffect } from 'react';
import './Stats.css'

const Stats = ({ stats })=>{

  useEffect(()=>{
    console.log(stats)
  },[stats])

  //17 rayitas de 15 cada una, redondear a floor, porque sino nunca hay máximo (?)
  //Si puedo pintarlo sin rayitas, mejor ¿objeto canvas?

  return(
    <>
     <div className='stats'>
      
     </div>
    </>
  )
}

export default Stats;