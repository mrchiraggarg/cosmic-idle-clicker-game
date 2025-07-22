import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { initialGenerators } from '../data/generators';
import { achievements } from '../data/achievements';

const SAVE_KEY = 'cosmic-clicker-save';

const createInitialState = (): GameState => ({
  stardust: 0,
  stardustPerSecond: 0,
  totalStardust: 0,
  clickPower: 1,
  prestigePoints: 0,
  prestigeMultiplier: 1,
  generators: initialGenerators,
  achievements: achievements,
  lastSave: Date.now(),
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(SAVE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Calculate offline progress
        const offlineTime = Math.min(Date.now() - parsed.lastSave, 3600000); // Max 1 hour offline
        const offlineGain = (parsed.stardustPerSecond * offlineTime) / 1000;
        
        // Restore achievement requirement functions from original data
        const restoredAchievements = achievements.map(originalAchievement => {
          const savedAchievement = parsed.achievements?.find((a: any) => a.id === originalAchievement.id);
          return {
            ...originalAchievement,
            unlocked: savedAchievement?.unlocked || false,
          };
        });
        
        setGameState({
          ...parsed,
          stardust: parsed.stardust + offlineGain,
          totalStardust: parsed.totalStardust + offlineGain,
          achievements: restoredAchievements,
          lastSave: Date.now(),
        });
      } catch (error) {
        console.error('Failed to load save:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  const saveGame = useCallback((state: GameState) => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        ...state,
        lastSave: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  }, []);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame(gameState);
    }, 10000);

    return () => clearInterval(interval);
  }, [gameState, saveGame]);

  // Game loop for passive income
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevState => {
        const stardustPerSecond = prevState.generators.reduce((total, generator) => {
          return total + (generator.owned * generator.baseProduction * generator.productionMultiplier);
        }, 0) * prevState.prestigeMultiplier;

        const stardustGain = stardustPerSecond / 10; // 100ms intervals

        return {
          ...prevState,
          stardust: prevState.stardust + stardustGain,
          totalStardust: prevState.totalStardust + stardustGain,
          stardustPerSecond,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Check achievements
  useEffect(() => {
    setGameState(prevState => {
      const updatedAchievements = prevState.achievements.map(achievement => {
        if (!achievement.unlocked && achievement.requirement(prevState)) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });

      return {
        ...prevState,
        achievements: updatedAchievements,
      };
    });
  }, [gameState.totalStardust, gameState.generators, gameState.prestigePoints]);

  const click = useCallback(() => {
    setGameState(prevState => {
      const clickGain = prevState.clickPower * prevState.prestigeMultiplier;
      return {
        ...prevState,
        stardust: prevState.stardust + clickGain,
        totalStardust: prevState.totalStardust + clickGain,
      };
    });
  }, []);

  const purchaseGenerator = useCallback((generatorId: string) => {
    setGameState(prevState => {
      const generator = prevState.generators.find(g => g.id === generatorId);
      if (!generator) return prevState;

      const cost = Math.floor(generator.baseCost * Math.pow(generator.costMultiplier, generator.owned));
      if (prevState.stardust < cost) return prevState;

      const updatedGenerators = prevState.generators.map(g => {
        if (g.id === generatorId) {
          return { ...g, owned: g.owned + 1 };
        }
        return g;
      });

      return {
        ...prevState,
        stardust: prevState.stardust - cost,
        generators: updatedGenerators,
      };
    });
  }, []);

  const prestige = useCallback(() => {
    setGameState(prevState => {
      if (prevState.totalStardust < 1000000) return prevState;

      const newPrestigePoints = Math.floor(Math.pow(prevState.totalStardust / 1000000, 0.5));
      const newMultiplier = 1 + (prevState.prestigePoints + newPrestigePoints) * 0.1;

      return {
        ...createInitialState(),
        prestigePoints: prevState.prestigePoints + newPrestigePoints,
        prestigeMultiplier: newMultiplier,
        achievements: prevState.achievements,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialState());
    localStorage.removeItem(SAVE_KEY);
  }, []);

  return {
    gameState,
    click,
    purchaseGenerator,
    prestige,
    resetGame,
    saveGame: () => saveGame(gameState),
  };
};