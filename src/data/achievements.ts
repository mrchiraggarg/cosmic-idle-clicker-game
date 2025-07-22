import { Achievement } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first_click',
    name: 'First Step',
    description: 'Make your first click',
    icon: '👆',
    unlocked: false,
    requirement: (state) => state.totalStardust >= 1,
    reward: 'Click power +1',
  },
  {
    id: 'hundred_clicks',
    name: 'Clicking Master',
    description: 'Collect 100 stardust from clicking',
    icon: '💫',
    unlocked: false,
    requirement: (state) => state.totalStardust >= 100,
    reward: 'Click power +2',
  },
  {
    id: 'first_robot',
    name: 'Automation Begins',
    description: 'Buy your first Mining Robot',
    icon: '🤖',
    unlocked: false,
    requirement: (state) => state.generators.find(g => g.id === 'robot')?.owned >= 1,
    reward: 'Robot production +10%',
  },
  {
    id: 'thousand_stardust',
    name: 'Cosmic Collector',
    description: 'Collect 1,000 stardust',
    icon: '✨',
    unlocked: false,
    requirement: (state) => state.totalStardust >= 1000,
    reward: 'All production +5%',
  },
  {
    id: 'first_prestige',
    name: 'Ascending',
    description: 'Perform your first prestige',
    icon: '🌟',
    unlocked: false,
    requirement: (state) => state.prestigePoints >= 1,
    reward: 'Prestige bonus +10%',
  },
];