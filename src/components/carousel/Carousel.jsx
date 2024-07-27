import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ pokemonId }) => {
  const [sprites, setSprites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const colorArrwsCarousel = '#fff';

  useEffect(() => {
    const fetchSprites = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      const spriteUrls = extractSprites(data.sprites);
      setSprites(spriteUrls);
    };

    fetchSprites();
  }, [pokemonId]);

  const extractSprites = (spritesObj) => {
    const urls = [];
    const extract = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key]) {
          urls.push(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          extract(obj[key]);
        }
      }
    };
    extract(spritesObj);
    return urls;
  };

  const nextSprite = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sprites.length);
  };

  const prevSprite = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sprites.length) % sprites.length);
  };

  return (
    <div className="carousel" 
      onMouseEnter={()=>{
        const arrIcons = document.getElementsByClassName('arr-icons');
        Array.from(arrIcons).forEach(icon => {
          icon.getElementsByTagName('path')[0].style.stroke = colorArrwsCarousel;
        });
      }} 
      
      onMouseLeave={()=>{
        const arrIcons = document.getElementsByClassName('arr-icons');
        Array.from(arrIcons).forEach(icon => {
          icon.getElementsByTagName('path')[0].style.stroke = 'transparent';
        });
      }}
    >
      <div className="arr-icons" onClick={prevSprite}>
        <svg className='arr-left' xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 128 128" id="arrows-button-to-right"><path stroke="#000" stroke-linecap="round" stroke-width="5" d="M65 86L83.9239 66.646C85.6338 64.8972 85.6338 62.1028 83.9239 60.354L65 41M50 86L50 41"></path></svg>
      </div>
      {sprites.length > 0 && (
        <img src={sprites[currentIndex]} alt="Pokemon Sprite" className="carousel-image" />
      )}
      <div className="arr-icons" onClick={nextSprite}>
        <svg className='arr-right' xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 128 128" id="arrows-button-to-right"><path stroke="#000" stroke-linecap="round" stroke-width="5" d="M65 86L83.9239 66.646C85.6338 64.8972 85.6338 62.1028 83.9239 60.354L65 41M50 86L50 41"></path></svg>
      </div>
    </div>
  );
};

export default Carousel;