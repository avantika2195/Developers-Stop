import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-grow pt-16 pb-16"
      >
        {children}
      </motion.main>
      <footer className="py-4 bg-white dark:bg-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} DevSkillTracker. Your learning journey, visualized.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;