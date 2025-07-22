import React from 'react';
import { Generator } from '../types/game';
import UpgradeButton from './UpgradeButton';

interface UpgradeShopProps {
  generators: Generator[];
  stardust: number;
  onPurchase: (generatorId: string) => void;
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({ generators, stardust, onPurchase }) => {
  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🛒 Upgrade Shop
      </h2>
      <div className="space-y-4">
        {generators.map(generator => {
          const cost = Math.floor(generator.baseCost * Math.pow(generator.costMultiplier, generator.owned));
          const canAfford = stardust >= cost;
          
          return (
            <UpgradeButton
              key={generator.id}
              generator={generator}
              canAfford={canAfford}
              onPurchase={onPurchase}
              stardust={stardust}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;