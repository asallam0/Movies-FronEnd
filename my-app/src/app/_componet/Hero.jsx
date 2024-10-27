'use client'
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    '/images/image-1.jpg',
    '/images/image-5.jpg',
    '/images/image-3.jpg',
    '/images/image-4.jpg',
    '/images/image-2.jpg',
    '/images/image-6.jpg',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div id="animation-carousel" className="relative w-full" data-carousel="static">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-screen">
        <div className="duration-200 ease-linear" data-carousel-item>
          <div>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`absolute w-full h-auto transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-start  pl-5 justify-center text-white">
            <h1 className="md:text-5xl text-2xl font-bold">Go ahead, stream free</h1>
            <p className="mt-4 text-lg sm:inline hidden max-w-md text-center">
              With Plex, you can watch over 20,000 free movies and shows, plus Live TV on almost any device. What are you waiting for?
            </p>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
