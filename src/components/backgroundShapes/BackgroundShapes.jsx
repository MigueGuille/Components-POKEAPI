import { useCallback, useEffect, useRef, useState } from 'react'
import './BackgroundShapes.css'


export default function BackgroundShapes({ getNumber, id, color }){
  let triangleDownDiamond = useRef()
  let triangleUpDiamond = useRef()
  let triangleStyle = useRef()
  let triangleTW = useRef()
  let rectLeft = useRef()
  let rectRight = useRef()
  const [prevName, setPrevName] = useState('')
  const [nextName, setNextName] = useState('')

  useEffect(()=>{
    const handler = setTimeout(() => {
      setNames();
    }, 1);
    return () => clearTimeout(handler);
  },[])

  const setNames = useCallback(async()=>{
    getName(id-1).then(res=>setPrevName(res))
    getName(id+1).then(res=>setNextName(res))
    //getMaxAbilitiesNumber()
  },[])


  const getMaxAbilitiesNumber = useCallback(async()=>{
    let max = 0;
    let str = ''
    let id = 0
    
    for(let i=1; i<1025; i++){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      //data.abilities.length > max ? max = data.abilities.length : ''
      if(data.abilities.map(a=>a.ability.name).join(', ').split('').length > max){
        max = data.abilities.map(a=>a.ability.name).join(', ').split('').length
        str = data.abilities.map(a=>a.ability.name).join(', ')
        id = data.id
      }
      //console.log(data.abilities.map(a=>a.ability.name).join(', '), data.abilities.map(a=>a.ability.name).join(', ').split('').length)
      console.log('.')
    }
    console.log(str, max, id)
  },[])

  async function getName(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data.name;
  }

  useEffect(()=>{

    triangleUpDiamond.current.style.borderBottomColor = color;
    triangleDownDiamond.current.style.borderTopColor = color;
    rectLeft.current.style.backgroundColor = color;
    rectRight.current.style.backgroundColor = color;
    triangleStyle.current.style.borderBottomColor = color;
    triangleTW.current.style.borderTopColor = color;

  },[triangleUpDiamond.current, triangleDownDiamond.current])
  
  return(
    <>
      <div className='triangle-up-diamond' ref={triangleUpDiamond} />
      <div className='triangle-style' ref={triangleStyle} />
      <div className='triangle-tw' ref={triangleTW} />
      <div className='triangle-down-diamond' ref={triangleDownDiamond} />
      <div className='text-specs text-char'>CHARACTERISTICS</div>
      <div className='text-specs text-status'>STATUS</div>
      <div className='text-specs text-evolution'>EVOLUTION</div>
      <div className='text-specs text-versions'>VERSIONS</div>

      <div className='rectLeft' onClick={()=>id > 1 ? location.replace(`/pokemon/${id-1}`) : ''} ref={rectLeft} />
      {id > 1 ? 
      <>
        <svg className='arrow-left' onClick={()=>id > 1 ? location.replace(`/pokemon/${id-1}`) : ''} width="50" height="50" viewBox="10 9 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="#333333" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        <div className='text-arrows text-prev-pokemon' onClick={()=>id > 1 ? location.replace(`/pokemon/${id-1}`) : ''} >{getNumber(id-1)+ ' ' + prevName}</div>
      </> : ''
      }
      
      <div className='rectRight' onClick={()=>id < 1025 ? location.replace(`/pokemon/${id+1}`): ''} ref={rectRight} />
      {id < 1025 ? 
      <>
        <svg className='arrow-right' onClick={()=>id < 1025 ? location.replace(`/pokemon/${id+1}`): ''} width="50" height="50" viewBox="30 9 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="#333333" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        <div className='text-arrows text-next-pokemon' onClick={()=>id < 1025 ? location.replace(`/pokemon/${id+1}`): ''} >{getNumber(id+1) + ' ' + nextName}</div>
      </> : ''
      }
    </>
  )
}