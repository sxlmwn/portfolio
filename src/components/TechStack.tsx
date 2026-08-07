import React, { useState } from 'react';
import { TECH_SKILLS, TechSkill } from '../data/portfolioData';
import { Layers, CheckCircle2 } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Languages' | 'Systems & AI' | 'Web & Tools'>('All');
  const [activeSkill, setActiveSkill] = useState<TechSkill | null>(null);

  const categories = ['All', 'Languages', 'Systems & AI', 'Web & Tools'] as const;

  const filteredSkills = selectedCategory === 'All'
    ? TECH_SKILLS
    : TECH_SKILLS.filter(s => s.category === selectedCategory);

  return (
    <section id="stack" className="py-20 px-4 sm:px-8 lg:px-14 relative z-10 max-w-6xl mx-auto w-full">
      {/* Subtle section glow */}
      <div className="ambient-glow-teal -top-20 right-10 opacity-20" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2dd4bf] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Competencies & Tooling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tech Stack Strip
          </h2>
          <p className="text-sm text-[#9ca3af] mt-1 max-w-xl">
            Selected languages, frameworks, and system tools applied across low-level engines and autonomous AI agents.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#111116] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#2dd4bf]/20 to-[#f43f5e]/20 text-white border border-[#2dd4bf]/40 shadow-sm'
                  : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Horizontal Pill Row with Subtle Accent Glows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredSkills.map((skill) => {
          const isSelected = activeSkill?.name === skill.name;
          const isTeal = skill.category === 'Languages' || skill.category === 'Systems & AI';
          
          return (
            <div
              key={skill.name}
              onClick={() => setActiveSkill(isSelected ? null : skill)}
              className={`group relative p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-[#1b1b26] border-[#2dd4bf] shadow-lg shadow-[#2dd4bf]/15 -translate-y-1'
                  : 'bg-[#111116]/80 hover:bg-[#161622] border-white/5 hover:border-white/20 hover:-translate-y-0.5'
              } border backdrop-blur-md`}
            >
              {/* Subtle hover accent glow */}
              <div
                className={`absolute top-0 right-0 w-12 h-12 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity ${
                  isTeal ? 'bg-[#2dd4bf]/30' : 'bg-[#f43f5e]/30'
                }`}
              />

              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-white group-hover:text-[#2dd4bf] transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#9ca3af] group-hover:text-white transition-colors">
                  {skill.level}
                </span>
              </div>

              <div className="text-[11px] text-[#6b7280] line-clamp-1 group-hover:text-[#9ca3af] transition-colors">
                {skill.experience}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Detail Expandable Card */}
      {activeSkill && (
        <div className="mt-6 p-5 rounded-2xl glass-panel border border-[#2dd4bf]/30 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#2dd4bf] uppercase tracking-wider">
                {activeSkill.category} &bull; {activeSkill.level}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{activeSkill.name}</h3>
            </div>
            <button
              onClick={() => setActiveSkill(null)}
              className="text-xs font-mono text-[#9ca3af] hover:text-white px-3 py-1 rounded bg-white/5 border border-white/10 self-start sm:self-auto"
            >
              Close Details ✕
            </button>
          </div>
          <p className="text-sm text-[#d1d5db] mt-3 leading-relaxed">
            {activeSkill.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#2dd4bf]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Applied in: {activeSkill.experience}</span>
          </div>
        </div>
      )}
    </section>
  );
};
