import { useRef } from 'react'
import './Ability.css'

const Ability = ({ characteristics, showHidden })=>{
  
  showHidden===undefined ? showHidden=false : showHidden=true

  let thisAbility = useRef()

  const getAbilityName = (ab, index, thisAbility)=>{
    let str = '';
    ab.name.split('-').length > 1 ? 
      str += ab.name.split('-').join(' ') : 
      str += ab.name 
    
    index < ab.count-1 ? 
      str+= ',' : ''

    return str
  }

  return(
    <div className='container-ab'>
      {
        characteristics.abilities.map(ab=>{
          let obj = {}
          obj.name = ab.ability.name;
          obj.is_hidden = ab.is_hidden;
          if(showHidden)
            obj.count = characteristics.abilities.length
          else
            obj.count = characteristics.abilities.map(ab=>ab.is_hidden).filter(ab=>ab===false).map(()=>1).length
          return obj;
        }).filter(ab=>showHidden ? ab : ab.is_hidden===false).map((ab,index)=>
          <>
            &nbsp;
            <div className={'ab ' + (ab.is_hidden ? 'hidden' : '')} ref={thisAbility} >  
              { getAbilityName(ab,index) }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Ability;