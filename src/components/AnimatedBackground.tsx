
import React, { useState, useEffect } from 'react';

interface BackgroundImage {
  url: string;
  alt: string;
}

const backgroundImages: BackgroundImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    alt: 'Blue starry night',
  },
  {
    url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    alt: 'River between mountains under white clouds',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    alt: 'Foggy mountain summit',
  },
  {
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    alt: 'Ocean wave at beach',
  },
];

const AnimatedBackground: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Set up a timer to change the background image every 8 seconds
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      // After the fade-out animation completes, change to the next image
      const transitionTimer = setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000); // This should match our fade-out animation duration
      
      return () => clearTimeout(transitionTimer);
    }, 8000);
    
    return () => clearInterval(timer);
  }, [nextImageIndex]);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Current background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex].url})`,
        }}
        aria-label={backgroundImages[currentImageIndex].alt}
      />
      
      {/* Next background image (preloaded) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{
          backgroundImage: `url(${backgroundImages[nextImageIndex].url})`,
        }}
        aria-label={backgroundImages[nextImageIndex].alt}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      
      {/* Particle effect (simplified as animated dots) */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-floating"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
