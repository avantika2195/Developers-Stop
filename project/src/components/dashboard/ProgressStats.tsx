import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { Sparkles, Target, Trophy, BookOpen } from 'lucide-react';

interface ProgressStatsProps {
  skills: Skill[];
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ skills }) => {
  // Calculate stats
  const totalSkills = skills.length;
  const masteredSkills = skills.filter(skill => skill.status === 'mastered').length;
  const inProgressSkills = skills.filter(skill => skill.status === 'learning').length;
  
  // Calculate average proficiency
  const avgProficiency = Math.round(
    skills.reduce((sum, skill) => sum + skill.proficiency, 0) / totalSkills
  );
  
  // Find last practiced skill
  const lastPracticedSkill = [...skills]
    .filter(skill => skill.lastPracticed)
    .sort((a, b) => {
      return new Date(b.lastPracticed!).getTime() - new Date(a.lastPracticed!).getTime();
    })[0];

  const stats = [
    {
      name: 'Skills Mastered',
      value: masteredSkills,
      icon: <Trophy className="h-6 w-6 text-primary-500" />,
      color: 'bg-primary-500'
    },
    {
      name: 'In Progress',
      value: inProgressSkills,
      icon: <Target className="h-6 w-6 text-secondary-500" />,
      color: 'bg-secondary-500'
    },
    {
      name: 'Average Proficiency',
      value: `${avgProficiency}%`,
      icon: <Sparkles className="h-6 w-6 text-accent-500" />,
      color: 'bg-accent-500'
    },
    {
      name: 'Last Practiced',
      value: lastPracticedSkill ? lastPracticedSkill.name : 'None',
      icon: <BookOpen className="h-6 w-6 text-success-500" />,
      color: 'bg-success-500'
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.name}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProgressStats;