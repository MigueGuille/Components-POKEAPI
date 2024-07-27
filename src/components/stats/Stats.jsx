import { useEffect, useState } from 'react';
import './Stats.css'

const Stats = ({ dataStats })=>{

  const [stats, setStats] = useState(undefined)
  const numberDivisions = 15;
  const maxStat = 255;

  const getBars = (numberDivisions, base_stat) => {
    let bars = []
    for (let i = 1; i <= numberDivisions; i++) {
      bars.push(
        <div 
          className= { Math.ceil(base_stat/(maxStat/numberDivisions)) >= i ? 'bar-s fill' : 'bar-s' }
          key={i}>
        </div>);
    }
    return bars;
  }

  useEffect(()=>{
    let newStats = dataStats.map((stat,index)=>{
      //console.log(stat.base_stat,stat.stat.name)
        return(
          <div className='stat' key={index} >
            <div className='name'>{
              stat.stat.name === 'hp' ? 'HP' : stat.stat.name.split('-').map((word,index)=>{
                return word.charAt(0).toUpperCase() + word.slice(1)
              }).join(' ')
            }</div>
            <div className='bars-s'>
              { getBars(numberDivisions, stat.base_stat) }
            </div>
          </div>
        )
      })
    setStats(newStats)
  },[dataStats])

  return(
    <>
     <div className='stats-content'>
      <div className='stats'>
        {stats}
      </div>
     </div>
    </>
  )
}

export default Stats;