import './Loading.css'

export default function Loading(){
  return(
    <div className='loading'>
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <h4>Loading...</h4>
    </div>
  )
}