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
    <div className="min-h-screen bg-[#0a0a0c] text-[#f3f4f6] relative selection:bg-[#2dd4bf]/30 selection:text-[#2dd4bf]">
      {/* Noise grain overlay for editorial texture */}
      <div className="noise-overlay" />

      {/* Top Thin Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#2dd4bf] via-[#14b8a6] to-[#f43f5e] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />

      {/* Global Floating Glassmorphism Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section (Folioblox editorial layout with static dual-tone photo) */}
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
