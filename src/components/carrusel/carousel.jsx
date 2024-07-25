import React, { useState, useEffect } from 'react';
import './carousel.css';

const Carousel = ({ pokemonId }) => {
  const [sprites, setSprites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);

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
    <div className="carousel">
      <button className="carousel-button" onClick={prevSprite}>Previous</button>
      {sprites.length > 0 && (
        <img src={sprites[currentIndex]} alt="Pokemon Sprite" className="carousel-image" />
      )}
      <button className="carousel-button" onClick={nextSprite}>Next</button>
    </div>
  );
};

export default Carousel;