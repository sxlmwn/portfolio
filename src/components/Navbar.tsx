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
    { name: 'Stack', href: '#stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tracks', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Floating Minimalist Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-2.5 rounded-full transition-all duration-300 max-w-7xl w-full ${
            scrolled
              ? 'bg-[#111116]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80'
              : 'bg-transparent border border-transparent'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram Mark */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group text-decoration-none"
            aria-label="Salman Younus Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#16161f] border border-white/10 flex items-center justify-center font-bold text-xs tracking-wider transition-all duration-300 group-hover:border-white/40 group-hover:scale-105">
              <span className="text-white font-mono font-extrabold">SY</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white ring-2 ring-[#0a0a0c]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm text-white tracking-tight group-hover:text-[#e4e4e7] transition-colors leading-tight">
                Salman Younus
              </span>
              <span className="text-[10px] font-mono text-[#71717a]">
                Developer
              </span>
            </div>
          </a>

          {/* Center/Right Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#111116]/60 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Actions: Terminal & Let's Connect */}
          <div className="flex items-center gap-2.5">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-all hover:scale-105 active:scale-95"
                title="Open Interactive Terminal"
                aria-label="Open Interactive CLI Terminal"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI</span>
              </button>
            )}

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#a1a1aa] hover:text-white transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white hover:bg-[#e4e4e7] text-black font-bold text-xs tracking-tight transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              <span>Connect</span>
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
        <div className="fixed inset-0 z-40 bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#71717a] uppercase tracking-wider mb-2">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 text-base font-bold text-white hover:border-white/30 transition-all"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#a1a1aa]" />
              </a>
            ))}

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <span className="text-xs font-mono text-[#71717a] uppercase tracking-wider">
                Direct Channels
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {onOpenTerminal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#161622] border border-white/20 text-sm font-mono text-white font-bold"
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
