import React from 'react';
import { motion } from 'framer-motion';
import { mockUser, mockSkills, mockProjects } from '../data/mockData';
import SkillChart from '../components/ui/SkillChart';
import { Download, Calendar, Target, Mail, User, Briefcase } from 'lucide-react';

const Profile: React.FC = () => {
  // Calculate total skills and completion percentages
  const totalSkills = mockSkills.length;
  const masteredSkills = mockSkills.filter(s => s.status === 'mastered').length;
  const masteredPercentage = Math.round((masteredSkills / totalSkills) * 100);
  
  // Calculate average proficiency
  const avgProficiency = Math.round(
    mockSkills.reduce((sum, skill) => sum + skill.proficiency, 0) / totalSkills
  );
  
  // Calculate total projects
  const totalProjects = mockProjects.length;
  const completedProjects = mockProjects.filter(p => p.completionDate).length;
  
  // Calculate days since joined
  const daysSinceJoined = () => {
    const joinDate = new Date(mockUser.joinedAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Your personal developer snapshot</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Profile information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-32 flex justify-center items-end">
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden -mb-12 shadow-lg">
                <img 
                  src={mockUser.avatarUrl || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                  alt={mockUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-16 pb-6 px-6">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{mockUser.name}</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-1">{mockUser.role}</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{daysSinceJoined()} days as a developer</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <span>avantika@example.com</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <span>Joined {new Date(mockUser.joinedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Target className="h-5 w-5 mr-3 text-gray-400" />
                  <span>Goal: {mockUser.goalDescription}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{completedProjects} completed projects</span>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  <Download className="h-5 w-5 mr-2" />
                  <span>Export Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Average Proficiency</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">{avgProficiency}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Skills Mastered</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">{masteredPercentage}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center col-span-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Daily Learning Goal</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">{mockUser.dailyLearningGoal} minutes</p>
            </div>
          </div>
        </motion.div>

        {/* Skill visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skill Breakdown</h3>
            <div className="h-[350px]">
              <SkillChart skills={mockSkills} />
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Yearly Goals</h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">{mockUser.yearlyGoal}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resume preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            <span>Export PDF</span>
          </button>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <h1>{mockUser.name}</h1>
          <p className="text-lg">{mockUser.role}</p>
          
          <h2>Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockSkills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                <span>{skill.name}</span>
                <span className="ml-auto text-gray-500 dark:text-gray-400">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
          
          <h2>Projects</h2>
          {mockProjects.map((project) => (
            <div key={project.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;