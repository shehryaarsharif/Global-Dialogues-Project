import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gray-900">
      {/* Animated Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-60 animate-pulse"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="200" fill="url(#glow)" />
          <g stroke="#93c5fd" strokeWidth="1.5" opacity="0.3">
            {/* Simple longitude/latitude lines for sci-fi effect */}
            <ellipse cx="300" cy="300" rx="200" ry="60" />
            <ellipse cx="300" cy="300" rx="200" ry="120" />
            <ellipse cx="300" cy="300" rx="200" ry="180" />
            <ellipse cx="300" cy="300" rx="60" ry="200" />
            <ellipse cx="300" cy="300" rx="120" ry="200" />
            <ellipse cx="300" cy="300" rx="180" ry="200" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg"
        >
          How the World Sees AI Differently
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl sm:text-2xl text-blue-100 font-light italic mb-6 max-w-2xl"
        >
          Exploring global perspectives on artificial intelligence through data and stories
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-blue-200 text-base sm:text-lg mb-2"
        >
          By <span className="font-semibold">Your Name</span> &middot; [Affiliation] &middot; 2024
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 