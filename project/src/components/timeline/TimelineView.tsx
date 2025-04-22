import React from 'react';
import { Skill, Milestone } from '../../types';
import { motion } from 'framer-motion';
import { Calendar, Star, Flag, BookOpen } from 'lucide-react';
import { getCategoryColor } from '../../data/mockData';

interface TimelineProps {
  skills: Skill[];
}

const TimelineView: React.FC<TimelineProps> = ({ skills }) => {
  // Get all important dates from skills and milestones
  type TimelineEvent = {
    id: string;
    date: Date;
    title: string;
    description?: string;
    type: 'skill_started' | 'milestone' | 'skill_mastered';
    skillId?: string;
    skillName?: string;
    category?: string;
  };

  const getTimelineEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    
    // Add skill start dates
    skills.forEach(skill => {
      events.push({
        id: `skill_start_${skill.id}`,
        date: new Date(skill.startedAt),
        title: `Started learning ${skill.name}`,
        type: 'skill_started',
        skillId: skill.id,
        skillName: skill.name,
        category: skill.category
      });
      
      // Add all milestones for this skill
      if (skill.milestones) {
        skill.milestones.forEach(milestone => {
          events.push({
            id: `milestone_${milestone.id}`,
            date: new Date(milestone.date),
            title: milestone.title,
            description: milestone.description,
            type: 'milestone',
            skillId: skill.id,
            skillName: skill.name,
            category: skill.category
          });
        });
      }
      
      // Add mastery events
      if (skill.status === 'mastered') {
        // For demo purposes, let's assume mastery happened recently
        // In a real app, you'd have an actual mastery date
        const masteryDate = skill.lastPracticed 
          ? new Date(skill.lastPracticed) 
          : new Date(new Date().setDate(new Date().getDate() - 14));
          
        events.push({
          id: `skill_mastery_${skill.id}`,
          date: masteryDate,
          title: `Mastered ${skill.name}`,
          type: 'skill_mastered',
          skillId: skill.id,
          skillName: skill.name,
          category: skill.category
        });
      }
    });
    
    // Sort events by date (newest first)
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const timelineEvents = getTimelineEvents();

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

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
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'skill_started':
        return <BookOpen className="h-5 w-5" />;
      case 'milestone':
        return <Flag className="h-5 w-5" />;
      case 'skill_mastered':
        return <Star className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Your Learning Timeline</h2>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-6 pl-8 pb-8"
      >
        {timelineEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            variants={item}
            className="mb-10 relative"
          >
            {/* Date indicator */}
            <div className="absolute -left-14 rounded-full bg-white dark:bg-gray-900 px-2 py-1 border border-gray-200 dark:border-gray-700 shadow-sm text-xs text-gray-500 dark:text-gray-400">
              {formatDate(event.date)}
            </div>
            
            {/* Timeline dot */}
            <div className={`absolute -left-11 w-5 h-5 rounded-full flex items-center justify-center ${getCategoryColor(event.category as any)} -mt-0.5`}>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            
            {/* Event card */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 ml-4"
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${getCategoryColor(event.category as any)} bg-opacity-10 dark:bg-opacity-20 text-${event.category}-600 dark:text-${event.category}-400`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  {event.description && (
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                  )}
                  {event.skillName && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Skill: {event.skillName}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TimelineView;