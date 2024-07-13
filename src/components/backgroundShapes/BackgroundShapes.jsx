import { useEffect, useRef } from 'react'
import './BackgroundShapes.css'



export default function BackgroundShapes({ id }){
  let triangleDownDiamond = useRef()
  let triangleUpDiamond = useRef()
  let rectLeft = useRef()
  let rectRight = useRef()


  useEffect(()=>{
    switch(id){
      case 6: 
        triangleUpDiamond.current.style.borderBottomColor = '#274A6A'
        triangleDownDiamond.current.style.borderTopColor = '#274A6A'
        rectLeft.current.style.backgroundColor = '#274A6A'
        rectRight.current.style.backgroundColor = '#274A6A'
    }
  },[triangleUpDiamond.current, triangleDownDiamond.current])
  
  return(
    <>
      <div className='rectRight' ref={rectRight} />
      <div className='rectLeft' ref={rectLeft} />
      <div className='triangle-up-diamond' ref={triangleUpDiamond} />
      <div className='triangle-down-diamond' ref={triangleDownDiamond} />
    </>
  )
}