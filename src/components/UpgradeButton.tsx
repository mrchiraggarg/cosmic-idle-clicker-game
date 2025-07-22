import React from 'react';
import { UpgradeButtonProps } from '../types/game';

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ 
  generator, 
  canAfford, 
  onPurchase, 
  stardust 
}) => {
  const cost = Math.floor(generator.baseCost * Math.pow(generator.costMultiplier, generator.owned));
  const production = generator.baseProduction * generator.productionMultiplier;

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return Math.floor(num).toLocaleString();
  };

  return (
    <button
      onClick={() => onPurchase(generator.id)}
      disabled={!canAfford}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        canAfford
          ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50 hover:border-purple-400 hover:from-purple-600/30 hover:to-blue-600/30'
          : 'bg-gray-800/20 border-gray-700 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{generator.icon}</div>
          <div className="text-left">
            <div className="text-white font-bold text-lg">{generator.name}</div>
            <div className="text-purple-300 text-sm">{generator.description}</div>
            <div className="text-yellow-400 text-sm">
              {formatNumber(production)}/sec each
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-lg">
            Owned: {generator.owned}
          </div>
          <div className={`text-sm font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
            Cost: {formatNumber(cost)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default UpgradeButton;