import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRandomQuote } from '../../data/mockData';

const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    // In a real app, we might check if we already showed a quote today
    // For now, just get a random quote on component mount
    setQuote(getRandomQuote());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Daily Inspiration</h3>
          <blockquote className="italic text-gray-600 dark:text-gray-300 text-lg mb-4">
            "{quote.text}"
          </blockquote>
        </div>
        <footer className="text-gray-500 dark:text-gray-400 text-right">
          — {quote.author}
        </footer>
      </div>
    </motion.div>
  );
};

export default DailyQuote;