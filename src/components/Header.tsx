import React from 'react';
import { Sparkles, Save } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="text-4xl animate-pulse">🌌</div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Cosmic Clicker
        </h1>
        <div className="text-4xl animate-pulse">🌌</div>
      </div>
      <p className="text-purple-300 text-lg mb-4">
        Harvest stardust across the cosmos and build your galactic empire!
      </p>
      <button
        onClick={onSave}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
      >
        <Save size={16} />
        Save Game
      </button>
    </div>
  );
};

export default Header;