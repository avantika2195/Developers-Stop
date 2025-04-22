import React from 'react';
import { motion } from 'framer-motion';
import { mockUser, mockSkills, mockProjects } from '../data/mockData';
import SkillChart from '../components/ui/SkillChart';
import DailyQuote from '../components/dashboard/DailyQuote';
import ProgressStats from '../components/dashboard/ProgressStats';
import LearningStreak from '../components/dashboard/LearningStreak';
import SkillCard from '../components/ui/SkillCard';
import ProjectCard from '../components/ui/ProjectCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Get current time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Create a section header component
  const SectionHeader = ({ title, linkTo }: { title: string; linkTo?: string }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {linkTo && (
        <Link to={linkTo} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center text-sm font-medium">
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </div>
  );

  // Top skills by proficiency
  const topSkills = [...mockSkills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 3);

  // Latest projects
  const latestProjects = [...mockProjects].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  }).slice(0, 2);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, {mockUser.name} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Let's continue your journey to become a {mockUser.goalDescription?.split(' ').pop()}
        </p>
      </motion.div>

      {/* Stats overview */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <ProgressStats skills={mockSkills} />
      </motion.div>

      {/* Main content grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        {/* Skill chart */}
        <motion.div variants={fadeIn} className="lg:col-span-2">
          <SkillChart skills={mockSkills} />
        </motion.div>

        {/* Daily quote */}
        <motion.div variants={fadeIn}>
          <DailyQuote />
        </motion.div>
      </motion.div>

      {/* Learning streak */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <LearningStreak />
      </motion.div>

      {/* Top skills */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <SectionHeader title="Your Top Skills" linkTo="/skills" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topSkills.map((skill) => (
            <motion.div key={skill.id} variants={fadeIn}>
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Latest projects */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <SectionHeader title="Recent Projects" linkTo="/projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestProjects.map((project) => (
            <motion.div key={project.id} variants={fadeIn}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;