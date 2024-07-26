import { useCallback, useEffect, useRef, useState } from 'react'
import './BackgroundShapes.css'


const BackgroundShapes=({ getNumber, id, color })=>{

  let trnglDwnDmnd = useRef()
  let trnglUpDmnd = useRef()
  let trnglStyle = useRef()
  let trnglTW = useRef()
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


  const getName = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data.name;
  }

  function getMidColor(color1, color2){

    //Para usar transparente con #00000000
    if(color1!=='00000000' && color2!=='00000000'){
      let r1 = color1.slice(0,2);
      let g1 = color1.slice(2,4);
      let b1 = color1.slice(4,6);
  
      let r2 = color2.slice(0,2);
      let g2 = color2.slice(2,4);
      let b2 = color2.slice(4,6);
  
      let r = Math.floor((parseInt(r1, 16) + parseInt(r2, 16)) / 2).toString(16);
      let g = Math.floor((parseInt(g1, 16) + parseInt(g2, 16)) / 2).toString(16);
      let b = Math.floor((parseInt(b1, 16) + parseInt(b2, 16)) / 2).toString(16);
      return r+g+b;
    }else{
      if(color1==='00000000' && color2!=='00000000'){
        return color2 + '77';
      }else if(color1!=='00000000' && color2==='00000000'){
        return color1 + '77';
      }else{
        return '00000000';
      }
    }
  }

  useEffect(()=>{
    let midcolor = getMidColor(color.color1, color.color2);
    
    if(color.color1[0]!=='#')
      color.color1 = '#'+color.color1;
    if(color.color2[0]!=='#')
      color.color2 = '#'+color.color2;
    if(midcolor[0]!=='#')
      midcolor = '#'+midcolor;

    trnglUpDmnd.current.style.background = `linear-gradient(180deg, ${color.color1}, ${midcolor})`;
    trnglDwnDmnd.current.style.background = `linear-gradient(0deg, ${color.color2}, ${midcolor})`;
    rectLeft.current.style.backgroundColor = midcolor;
    rectRight.current.style.backgroundColor = midcolor;
    console.log(color.color1, color.color2)
    trnglStyle.current.style.borderBottomColor = color.color2;
    trnglTW.current.style.borderTopColor = color.color1;
    
  },[trnglUpDmnd.current, trnglDwnDmnd.current])

  const nextPage = () =>{
    location.replace(`/pokemon/${id+1}`)
  }

  const prevPage = () =>{
    location.replace(`/pokemon/${id-1}`)
  }
  
  return(
    
    <>
      <div className='rectLeft' onClick={prevPage} ref={rectLeft}>
      {id > 1 ? 
      <>
        {<svg className='arrow-left' onClick={()=>id > 1 ? location.replace(`/pokemon/${id-1}`) : ''} width="50" height="50" viewBox="10 9 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="#fff" fill-rule="evenodd" clip-rule="evenodd"></path></svg> }
        <div className='text-arrws text-prev-poke' onClick={prevPage} >{getNumber(id-1)+ ' ' + prevName}</div>
      </> : ''
      }
      </div>
      
      <div className='rectRight' onClick={nextPage} ref={rectRight}>
      {id < 1025 ? 
      <>
        { <svg className='arrow-right' onClick={()=>id < 1025 ? location.replace(`/pokemon/${id+1}`): ''} width="50" height="50" viewBox="30 9 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="#fff" fill-rule="evenodd" clip-rule="evenodd"></path></svg> }
        <div className='text-arrws text-next-poke' onClick={nextPage} >{getNumber(id+1) + ' ' + nextName}</div>
      </> : ''
      }
      </div>

      <div className='trngl-style-cont'>
        <div className='trngl-style' ref={trnglStyle}></div>
      </div>

      <div className='trngl-tw-cont' >
        <div className='trngl-tw' ref={trnglTW}></div>
      </div>

      <div className='trngl-up-dmnd-cont'  >
        <div className='trngl-up-dmnd' ref={trnglUpDmnd} />
      </div>

      <div className='trngl-dwn-dmnd-cont' >
        <div className='trngl-dwn-dmnd' ref={trnglDwnDmnd}></div>
      </div>
      
    </>
  )
}

export default BackgroundShapes;