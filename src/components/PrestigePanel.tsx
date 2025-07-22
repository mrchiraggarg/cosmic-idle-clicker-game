import React from 'react';
import { Crown, RotateCcw } from 'lucide-react';

interface PrestigePanelProps {
  totalStardust: number;
  prestigePoints: number;
  prestigeMultiplier: number;
  onPrestige: () => void;
  onReset: () => void;
}

const PrestigePanel: React.FC<PrestigePanelProps> = ({
  totalStardust,
  prestigePoints,
  prestigeMultiplier,
  onPrestige,
  onReset,
}) => {
  const canPrestige = totalStardust >= 1000000;
  const newPrestigePoints = Math.floor(Math.pow(totalStardust / 1000000, 0.5));

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
        <Crown className="text-yellow-400" size={24} />
        Prestige
      </h2>
      
      <div className="text-center mb-6">
        <div className="text-white mb-2">
          Current Prestige Points: <span className="text-purple-400 font-bold">{prestigePoints}</span>
        </div>
        <div className="text-white mb-2">
          Current Multiplier: <span className="text-green-400 font-bold">{prestigeMultiplier.toFixed(1)}x</span>
        </div>
        {canPrestige && (
          <div className="text-white">
            You will gain: <span className="text-yellow-400 font-bold">{newPrestigePoints}</span> prestige points
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={onPrestige}
          disabled={!canPrestige}
          className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-200 ${
            canPrestige
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canPrestige ? 'Prestige Now!' : 'Need 1M+ Total Stardust'}
        </button>
        
        <button
          onClick={onReset}
          className="w-full py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default PrestigePanel;