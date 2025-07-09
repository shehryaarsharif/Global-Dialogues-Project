import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import DatasetSection from './components/DatasetSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <IntroSection />
      <DatasetSection />
    </div>
  );
}

export default App;
