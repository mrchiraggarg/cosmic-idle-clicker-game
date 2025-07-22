import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ClickButtonProps {
  onClick: () => void;
  clickPower: number;
  prestigeMultiplier: number;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick, clickPower, prestigeMultiplier }) => {
  const [isClicking, setIsClicking] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{ id: number; value: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    onClick();
    setIsClicking(true);
    
    // Create floating number
    const value = Math.floor(clickPower * prestigeMultiplier);
    const newFloating = { id: Date.now(), value };
    setFloatingNumbers(prev => [...prev, newFloating]);
    
    // Remove floating number after animation
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== newFloating.id));
    }, 1000);
    
    setTimeout(() => setIsClicking(false), 150);
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleClick}
        className={`relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
          isClicking ? 'scale-95' : 'scale-100 hover:scale-105'
        } border-4 border-yellow-300 active:scale-95`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
        <div className="flex items-center justify-center h-full">
          <Sparkles className="text-white" size={40} />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/10"></div>
      </button>
      
      <div className="mt-4 text-center">
        <div className="text-white font-bold text-lg">
          +{Math.floor(clickPower * prestigeMultiplier)} per click
        </div>
      </div>

      {/* Floating numbers */}
      {floatingNumbers.map(floating => (
        <div
          key={floating.id}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl animate-bounce pointer-events-none"
          style={{
            animation: 'floatUp 1s ease-out forwards',
          }}
        >
          +{floating.value}
        </div>
      ))}
    </div>
  );
};

export default ClickButton;