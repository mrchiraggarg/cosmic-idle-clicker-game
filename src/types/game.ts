export interface GameState {
  stardust: number;
  stardustPerSecond: number;
  totalStardust: number;
  clickPower: number;
  prestigePoints: number;
  prestigeMultiplier: number;
  generators: Generator[];
  achievements: Achievement[];
  lastSave: number;
}

export interface Generator {
  id: string;
  name: string;
  description: string;
  icon: string;
  owned: number;
  baseCost: number;
  baseProduction: number;
  costMultiplier: number;
  productionMultiplier: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: (state: GameState) => boolean;
  reward: string;
}

export interface UpgradeButtonProps {
  generator: Generator;
  canAfford: boolean;
  onPurchase: (generatorId: string) => void;
  stardust: number;
}