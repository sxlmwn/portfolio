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
    <section id="stack" className="py-24 px-5 sm:px-8 lg:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tech Stack Strip
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] mt-2 max-w-xl">
            Selected languages, frameworks, and system tools applied across low-level engines and autonomous AI agents.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#111116] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Monochrome Minimalist Pill Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredSkills.map((skill) => {
          const isSelected = activeSkill?.name === skill.name;

          return (
            <div
              key={skill.name}
              onClick={() => setActiveSkill(isSelected ? null : skill)}
              className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-[#1b1b26] border-white shadow-xl shadow-white/5 -translate-y-1'
                  : 'bg-[#111116]/80 hover:bg-[#161622] border-white/10 hover:border-white/30 hover:-translate-y-0.5'
              } border backdrop-blur-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa] group-hover:text-white transition-colors">
                  {skill.level}
                </span>
              </div>

              <div className="text-[11px] text-[#71717a] line-clamp-1 group-hover:text-[#a1a1aa] transition-colors">
                {skill.experience}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Detail Expandable Card */}
      {activeSkill && (
        <div className="mt-8 p-6 rounded-2xl glass-panel border border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">
                {activeSkill.category} &bull; {activeSkill.level}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{activeSkill.name}</h3>
            </div>
            <button
              onClick={() => setActiveSkill(null)}
              className="text-xs font-mono text-[#a1a1aa] hover:text-white px-3 py-1 rounded bg-white/5 border border-white/10 self-start sm:self-auto transition-colors"
            >
              Close Details ✕
            </button>
          </div>
          <p className="text-sm text-[#d4d4d8] mt-3 leading-relaxed">
            {activeSkill.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-white">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Applied in: {activeSkill.experience}</span>
          </div>
        </div>
      )}
    </section>
  );
};
