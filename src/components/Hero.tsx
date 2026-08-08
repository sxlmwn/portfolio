import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Terminal, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="hero-editorial-wrapper min-h-screen relative w-full overflow-hidden border-b border-white/5 px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-10 flex flex-col justify-between"
    >
      {/* Background B&W Portrait - Full-Bleed Right Edge */}
      <img
        src="/hero-bw.webp"
        alt="Salman Younus — Editorial Portrait"
        className={`hero-bg-portrait transition-opacity duration-1000 ${
          imgLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        onLoad={() => setImgLoaded(true)}
      />

      {/* Top Row: Sal Callout & Status Pill */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-3 py-1 text-xs font-mono text-[#a1a1aa] tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white pulse-dot-mono inline-block" />
          <span className="font-semibold text-white tracking-wider lowercase">sal</span>
          <span className="text-[#52525b]">/</span>
          <span className="text-[#a1a1aa] font-medium hidden sm:inline">@{PERSONAL_INFO.handle}</span>
          <span className="text-[#52525b] hidden sm:inline">&bull;</span>
          <span className="text-[#71717a] hidden md:inline">{PERSONAL_INFO.location}</span>
        </div>

        {/* Minimalist Top Status Pill */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#d4d4d8] backdrop-blur-md">
          <span className="text-[#71717a]">Status:</span>
          <span className="text-white font-medium">Available for Opportunities</span>
        </div>
      </div>

      {/* Center Staggered Editorial Typography (Full-Bleed Left Alignment) */}
      <div className="relative z-10 w-full my-auto py-10 sm:py-16">
        <div className="max-w-4xl">
          {/* Staggered Heading: "Salman" then cascading "Younus" */}
          <h1 className="hero-stagger-title">
            <span className="hero-stagger-row1">Salman</span>
            <span className="hero-stagger-row2">Younus</span>
          </h1>

          {/* Subtext & Short Manifesto */}
          <div className="mt-8 sm:mt-10 max-w-xl">
            <p className="text-base sm:text-xl text-[#d4d4d8] font-normal leading-relaxed">
              Software Engineering student building high-throughput <strong className="text-white font-semibold">C++ engines</strong>, autonomous <strong className="text-white font-semibold">local AI pipelines</strong>, and resilient distributed systems.
            </p>

            {/* Pill Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-7">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs tracking-tight transition-all duration-300 hover:bg-[#e4e4e7] hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-semibold text-xs tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa]" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  title="Interactive Terminal Shell"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CLI Shell</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Role Tag & Social Icons in Bottom Corner */}
      <div className="relative z-10 w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Bottom-Left Role Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
          <span className="text-white font-bold tracking-wider">// Software Engineering Student</span>
          <span className="text-[#52525b]">&bull;</span>
          <span className="text-[#71717a] hidden sm:inline">Low-Latency Systems & AI</span>
        </div>

        {/* Minimal Social Links & Quick Channels */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-all"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-all"
            aria-label="Contact Section"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message</span>
          </a>
        </div>
      </div>
    </section>
  );
};
