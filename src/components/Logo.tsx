
import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'FLEX_DEVELOPERS';
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    
    const typeText = async () => {
      for (let i = 0; i <= fullText.length; i++) {
        setDisplayText(fullText.substring(0, i));
        // Wait for a short time between each character
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      setIsComplete(true);
    };
    
    typeText();
    
    // Set up a loop to repeat the animation
    const interval = setInterval(() => {
      setDisplayText('');
      setIsComplete(false);
      typeText();
    }, 10000); // Repeat every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="hover:scale-110 transition-transform duration-300 cursor-pointer">
        <div className="text-4xl font-bold text-white p-3 flex items-center justify-center h-16 w-auto">
          <span className={`relative ${isComplete ? 'after:animate-pulse-glow' : ''}`}>
            {displayText}
            <span className={`ml-1 inline-block w-0.5 h-8 bg-white ${isComplete ? 'animate-pulse-glow opacity-50' : 'animate-pulse'}`}></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
