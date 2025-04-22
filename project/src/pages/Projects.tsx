import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockProjects, mockSkills } from '../data/mockData';
import ProjectCard from '../components/ui/ProjectCard';
import { Search, Filter, X } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Toggle tech filter
  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTechs([]);
  };

  // Get all unique tech skills used in projects
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    mockProjects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // Search filter
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tech stack filter
      const matchesTech = selectedTechs.length === 0 || 
                          selectedTechs.some(tech => project.techStack.includes(tech));
      
      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTechs]);

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

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || selectedTechs.length > 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Project Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-300">Showcase of your development projects</p>
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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Filter className="h-4 w-4 mr-1" /> Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTechs.includes(tech)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tech}
              </button>
            ))}
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
          Showing {filteredProjects.length} of {mockProjects.length} projects
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Projects grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your filters.</p>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;