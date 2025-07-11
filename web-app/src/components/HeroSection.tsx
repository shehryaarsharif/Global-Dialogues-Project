import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const HeroSection: React.FC = () => {
  const [showCursor, setShowCursor] = useState(true);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFFAF2' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/assets/hero-map.png"
          alt="Glowing globe"
          className="h-[600px]"
          style={{ opacity: 0.1 }}
          draggable={false}
        />
      </div>

      <div className={`relative z-10 flex flex-col items-center text-center px-4${!showCursor ? ' hide-cursor' : ''}`}>
        <TypeAnimation
          sequence={[
            'How the World Sees AI Differently',
            () => setShowCursor(false),
          ]}
          wrapper="h1"
          speed={50}
          cursor={showCursor}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 drop-shadow-lg"
          repeat={0}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl sm:text-2xl text-blue-900 font-light italic mb-6 max-w-2xl"
        >
          Exploring global perspectives on artificial intelligence through data and stories
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-blue-700 text-base sm:text-lg mb-2"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 