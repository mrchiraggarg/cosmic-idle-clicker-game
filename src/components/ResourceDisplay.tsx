import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface ResourceDisplayProps {
  stardust: number;
  stardustPerSecond: number;
  prestigePoints: number;
  prestigeMultiplier: number;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  stardust,
  stardustPerSecond,
  prestigePoints,
  prestigeMultiplier,
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return Math.floor(num).toLocaleString();
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-yellow-400" size={24} />
            <h2 className="text-xl font-bold text-white">Stardust</h2>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-1">
            {formatNumber(stardust)}
          </div>
          <div className="text-sm text-purple-300 flex items-center justify-center gap-1">
            <Zap size={16} />
            {formatNumber(stardustPerSecond)}/sec
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-2xl">🌟</div>
            <h2 className="text-xl font-bold text-white">Prestige</h2>
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {prestigePoints} Points
          </div>
          <div className="text-sm text-purple-300">
            {((prestigeMultiplier - 1) * 100).toFixed(1)}% Bonus
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDisplay;