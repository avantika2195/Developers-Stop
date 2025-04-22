import React from 'react';
import { mockSkills } from '../data/mockData';
import TimelineView from '../components/timeline/TimelineView';
import { motion } from 'framer-motion';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Timeline</h1>
        <p className="text-gray-600 dark:text-gray-300">Your developer journey, visualized</p>
      </motion.div>
      
      <TimelineView skills={mockSkills} />
    </div>
  );
};

export default Timeline;