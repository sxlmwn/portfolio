import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'stack', 'projects', 'about', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Tech Stack', href: '#stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Learning & Tracks', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pb-2 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 max-w-6xl w-full ${
            scrolled
              ? 'bg-[#111116]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60'
              : 'bg-[#111116]/40 backdrop-blur-md border border-white/5 shadow-lg'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group text-decoration-none"
            aria-label="Salman Younus Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#16161f] border border-white/10 flex items-center justify-center font-bold text-xs tracking-wider transition-all duration-300 group-hover:border-[#2dd4bf]/50 group-hover:scale-105">
              <span className="text-white">S</span>
              <span className="text-[#2dd4bf]">Y</span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2dd4bf] ring-2 ring-[#0a0a0c] pulse-dot" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm text-white group-hover:text-[#2dd4bf] transition-colors leading-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-[#9ca3af]">
                @{PERSONAL_INFO.handle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0a0a0c]/60 border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-[#2dd4bf] border border-white/10 shadow-sm'
                      : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons & Status Pill */}
          <div className="flex items-center gap-2.5">
            {/* Terminal Trigger */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#2dd4bf] transition-all hover:scale-105 active:scale-95"
                title="Open Interactive Terminal"
                aria-label="Open Interactive CLI Terminal"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI</span>
              </button>
            )}

            {/* GitHub & LinkedIn Direct Buttons */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#9ca3af] hover:text-white transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#9ca3af] hover:text-[#2dd4bf] transition-all hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>

            {/* Pill CTA Button */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] hover:from-[#38efd8] hover:to-[#2dd4bf] text-[#0a0a0c] font-bold text-xs tracking-tight transition-all duration-200 shadow-md shadow-[#2dd4bf]/20 hover:scale-105 active:scale-95"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0c]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#6b7280] uppercase tracking-wider mb-2">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 text-base font-bold text-white hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-all"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#9ca3af]" />
              </a>
            ))}

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <span className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">
                Direct Channels
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <GitHubIcon className="w-4 h-4 text-[#2dd4bf]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#2dd4bf]" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {onOpenTerminal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#161622] border border-[#2dd4bf]/30 text-sm font-mono text-[#2dd4bf] font-bold"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch CLI Terminal</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
