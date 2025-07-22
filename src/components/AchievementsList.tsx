import React from 'react';
import { Trophy } from 'lucide-react';
import { Achievement } from '../types/game';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
        <Trophy className="text-yellow-400" size={24} />
        Achievements ({unlockedAchievements.length}/{achievements.length})
      </h2>
      
      <div className="space-y-3">
        {unlockedAchievements.map(achievement => (
          <div
            key={achievement.id}
            className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30"
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="text-white font-bold">{achievement.name}</div>
              <div className="text-green-300 text-sm">{achievement.description}</div>
              <div className="text-yellow-400 text-xs">Reward: {achievement.reward}</div>
            </div>
          </div>
        ))}
        
        {lockedAchievements.slice(0, 3).map(achievement => (
          <div
            key={achievement.id}
            className="flex items-center gap-3 p-3 bg-gray-800/20 rounded-lg border border-gray-700/30 opacity-50"
          >
            <div className="text-2xl grayscale">{achievement.icon}</div>
            <div className="flex-1">
              <div className="text-gray-400 font-bold">{achievement.name}</div>
              <div className="text-gray-500 text-sm">{achievement.description}</div>
              <div className="text-gray-600 text-xs">Reward: {achievement.reward}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;