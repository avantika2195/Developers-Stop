import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockSkills, getCategoryText, getStatusText } from '../data/mockData';
import SkillCard from '../components/ui/SkillCard';
import { Search, Filter, X } from 'lucide-react';
import { Skill, SkillCategory, SkillStatus } from '../types';

const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<SkillStatus[]>([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Toggle category filter
  const toggleCategory = (category: SkillCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle status filter
  const toggleStatus = (status: SkillStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    return mockSkills.filter(skill => {
      // Search filter
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(skill.category);
      
      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(skill.status);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategories, selectedStatuses]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Get all available categories and statuses
  const allCategories: SkillCategory[] = ['frontend', 'backend', 'devops', 'soft', 'other'];
  const allStatuses: SkillStatus[] = ['learning', 'mastered', 'paused'];

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || selectedCategories.length > 0 || selectedStatuses.length > 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skill Library</h1>
        <p className="text-gray-600 dark:text-gray-300">Track, monitor, and level up your skills</p>
      </motion.div>

      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-150"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category filters */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {getCategoryText(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Status filters */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Status
            </p>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedStatuses.includes(status)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {getStatusText(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear filters button (only show if filters are active) */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <X className="h-4 w-4 mr-1" /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results summary */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredSkills.length} of {mockSkills.length} skills
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Skills grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No skills found matching your filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <motion.div key={skill.id} variants={item}>
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Skills;