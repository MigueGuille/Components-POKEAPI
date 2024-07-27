import { useEffect } from 'react';
import './Characteristics.css'
import Ability from '../ability/Ability';

const Characteristics = ({ characteristics })=>{

  return(
    <div className='poke-data'>
      <div className='char category'>
        <div className='text'>Category:&nbsp;</div>
        <div className='cont-category'>{ characteristics.category.map(cat=>cat.genus) }</div>
      </div>
      <div className='char height'>
        <div className='text'>Height:&nbsp;</div>
        <div className='cont-height'>{ (characteristics.height/10).toFixed(1) + ' m' }</div>
      </div>
      <div className='char weight'>
        <div className='text'>Weight:&nbsp;</div>
        <div className='cont-weight'>{ (characteristics.weight/10).toFixed(1) + ' kg' }</div>
      </div>
      <div className='char abilities'>
        <div className='text'>Abilities:</div>
        <div className='cont-abilities'> <Ability showHidden characteristics={characteristics}/></div>
      </div>
      {/*Gender*/}
    </div>
  )
}

export default Characteristics;