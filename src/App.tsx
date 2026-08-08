import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { TerminalModal } from './components/TerminalModal';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage(Math.round((window.scrollY / totalHeight) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f3f4f6] relative selection:bg-white selection:text-black">
      {/* Noise grain overlay for subtle editorial luxury texture */}
      <div className="noise-overlay" />

      {/* Top Thin Monochrome Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-white via-[#d4d4d8] to-[#71717a] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />

      {/* Global Floating Glassmorphism Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section (Alex Graham / Folioblox B&W high-fashion editorial layout) */}
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* 2. Tech Stack Strip */}
        <TechStack />

        {/* 3. Featured Projects Grid */}
        <Projects />

        {/* 4. About & Currently Learning (3 Self-Study Tracks) */}
        <About />

        {/* 5. Contact & Footer */}
        <Contact />
      </main>

      {/* Interactive Developer CLI Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
};

export default App;
