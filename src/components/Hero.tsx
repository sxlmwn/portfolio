import React from 'react';
import { ArrowDown, ArrowUpRight, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section
      id="hero"
      className="min-h-[92vh] w-full flex flex-col justify-between pt-28 pb-16 px-4 sm:px-8 lg:px-14 relative z-10 max-w-6xl mx-auto"
    >
      {/* Ambient background glows for hero */}
      <div className="ambient-glow-teal -top-24 -left-24 opacity-35" />
      <div className="ambient-glow-coral top-40 right-0 opacity-25" />

      {/* Main Hero Container */}
      <div className="w-full">
        {/* Top Tag & Status Banner */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16161f]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#f3f4f6] mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]"></span>
          </span>
          <span className="font-medium text-white">{PERSONAL_INFO.title}</span>
          <span className="text-[#6b7280]">|</span>
          <span className="text-[#2dd4bf] hidden sm:inline">{PERSONAL_INFO.location}</span>
        </div>

        {/* Folioblox Hero Grid: Bold Oversized Left Heading + Right Portrait Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtext, CTAs (Spans 7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#2dd4bf] uppercase tracking-wider font-semibold">
                Hey, I'm Salman Younus —
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-white">
                I build with{' '}
                <span className="text-gradient-teal underline decoration-[#2dd4bf]/40 decoration-wavy decoration-2">
                  code
                </span>
                , curiosity, and a lot of{' '}
                <span className="text-gradient-coral underline decoration-[#f43f5e]/40 decoration-wavy decoration-2">
                  debugging
                </span>
                .
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#9ca3af] font-normal leading-relaxed max-w-xl">
              Engineering high-throughput <strong className="text-white font-semibold">C++ engines</strong>, autonomous <strong className="text-white font-semibold">local AI assistants</strong>, and resilient distributed systems. Driven by first-principles problem solving and clean architecture.
            </p>

            {/* Pill CTAs Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] hover:from-[#38efd8] hover:to-[#2dd4bf] text-[#0a0a0c] font-bold text-sm tracking-tight shadow-xl shadow-[#2dd4bf]/25 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Explore Featured Work</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#161622]/80 hover:bg-[#1f1f2e] border border-white/10 hover:border-white/20 text-white font-semibold text-sm tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[#9ca3af]" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#2dd4bf] transition-all hover:scale-105 active:scale-95"
                  title="Interactive Terminal Sandbox"
                >
                  <Terminal className="w-4 h-4" />
                  <span className="hidden sm:inline">Launch CLI</span>
                </button>
              )}
            </div>

            {/* Quick Tech Tag Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-[#6b7280] mr-2">Core Arsenal:</span>
              {['C++20', 'Python', 'React', 'Ollama / LLMs', 'Docker', 'Linux'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-[#d1d5db]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dual-Tone Side Profile Portrait with Soft Ambient Glow (Spans 5 columns) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-portrait-frame w-full max-w-sm sm:max-w-md">
              <img
                src="/hero-portrait.webp"
                alt="Salman Younus — Dual-tone side profile portrait"
                className="hero-portrait-img w-full h-auto max-h-[500px] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Stats Strip */}
      <div className="w-full mt-14 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl glass-panel-subtle border border-white/5 hover:border-[#2dd4bf]/30 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#2dd4bf] transition-colors font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-[#9ca3af] font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
