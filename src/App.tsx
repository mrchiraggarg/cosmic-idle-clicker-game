import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import Header from './components/Header';
import ResourceDisplay from './components/ResourceDisplay';
import ClickButton from './components/ClickButton';
import UpgradeShop from './components/UpgradeShop';
import PrestigePanel from './components/PrestigePanel';
import AchievementsList from './components/AchievementsList';

function App() {
  const { gameState, click, purchaseGenerator, prestige, resetGame, saveGame } = useGameState();
  const [activeTab, setActiveTab] = useState('upgrades');

  const tabs = [
    { id: 'upgrades', label: 'Upgrades', icon: '🛒' },
    { id: 'prestige', label: 'Prestige', icon: '👑' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header onSave={saveGame} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Resources and Click */}
          <div className="space-y-6">
            <ResourceDisplay
              stardust={gameState.stardust}
              stardustPerSecond={gameState.stardustPerSecond}
              prestigePoints={gameState.prestigePoints}
              prestigeMultiplier={gameState.prestigeMultiplier}
            />
            
            <div className="flex justify-center py-8">
              <ClickButton
                onClick={click}
                clickPower={gameState.clickPower}
                prestigeMultiplier={gameState.prestigeMultiplier}
              />
            </div>
          </div>

          {/* Middle Column - Tabs */}
          <div className="lg:col-span-2">
            <div className="flex justify-center mb-6">
              <div className="flex bg-black/20 rounded-lg p-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'upgrades' && (
              <UpgradeShop
                generators={gameState.generators}
                stardust={gameState.stardust}
                onPurchase={purchaseGenerator}
              />
            )}

            {activeTab === 'prestige' && (
              <PrestigePanel
                totalStardust={gameState.totalStardust}
                prestigePoints={gameState.prestigePoints}
                prestigeMultiplier={gameState.prestigeMultiplier}
                onPrestige={prestige}
                onReset={resetGame}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsList achievements={gameState.achievements} />
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(-50%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;