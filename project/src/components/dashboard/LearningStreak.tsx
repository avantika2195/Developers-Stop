import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

// Placeholder for streak data
// In a real app, this would come from an API or local storage
const streakData = {
  currentStreak: 8,
  longestStreak: 15,
  totalDays: 23,
  lastWeek: [1, 0, 1, 1, 1, 1, 1], // 0 = no activity, 1 = activity
};

const LearningStreak: React.FC = () => {
  // Create day labels for the last week (Sun, Mon, etc.)
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get current day index (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  
  // Reorder days to show correct order (today at the end)
  const orderedDays = [...dayLabels.slice(today + 1), ...dayLabels.slice(0, today + 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        <Flame className="h-5 w-5 text-accent-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Streak</h3>
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            {streakData.currentStreak} days
            <Flame className="h-5 w-5 text-accent-500 ml-2" />
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Longest Streak</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{streakData.longestStreak} days</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {orderedDays.map((day, index) => (
            <div key={index} className="text-center text-xs text-gray-500 dark:text-gray-400 w-10">
              {day}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {streakData.lastWeek.map((activity, index) => (
            <div 
              key={index} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity ? 'bg-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              {activity ? 
                <Flame className="h-5 w-5" /> : 
                <span className="text-xl">·</span>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
        <p>You've been learning for {streakData.totalDays} days in total</p>
      </div>
    </motion.div>
  );
};

export default LearningStreak;