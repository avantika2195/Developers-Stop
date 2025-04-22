import React from 'react';
import { Skill } from '../../types';
import { motion } from 'framer-motion';
import { getCategoryColor, getCategoryText, getStatusColor, getStatusText } from '../../data/mockData';
import { BookOpen, Calendar } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  onClick?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Calculate days since last practice
  const getDaysSinceLastPractice = () => {
    if (!skill.lastPracticed) return null;
    
    const lastPractice = new Date(skill.lastPracticed);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastPractice.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysSinceLastPractice = getDaysSinceLastPractice();

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(skill.category)} text-white`}>
                {getCategoryText(skill.category)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(skill.status)} text-white`}>
                {getStatusText(skill.status)}
              </span>
            </div>
          </div>
          
          {/* Circular progress indicator */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12" viewBox="0 0 36 36">
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                className="stroke-gray-200 dark:stroke-gray-700" 
                strokeWidth="3" 
              />
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                className="stroke-primary-500" 
                strokeWidth="3" 
                strokeDasharray={`${(skill.proficiency/100) * 100} 100`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
              <text 
                x="50%" 
                y="50%" 
                dy=".3em" 
                textAnchor="middle" 
                className="text-xs font-medium fill-gray-900 dark:fill-white"
              >
                {skill.proficiency}%
              </text>
            </svg>
          </div>
        </div>
        
        {/* Additional info and metadata */}
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          {/* Started date */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Started: {formatDate(skill.startedAt)}</span>
          </div>
          
          {/* Last practiced, if available */}
          {skill.lastPracticed && (
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
              <span>
                Last practiced: {daysSinceLastPractice === 0 ? 'Today' : `${daysSinceLastPractice} days ago`}
              </span>
            </div>
          )}
          
          {/* Notes preview if available */}
          {skill.notes && (
            <p className="mt-3 text-sm line-clamp-2">
              {skill.notes}
            </p>
          )}
        </div>
      </div>
      
      {/* Bottom progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
        <div 
          className="bg-primary-500 h-1" 
          style={{ width: `${skill.proficiency}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default SkillCard;