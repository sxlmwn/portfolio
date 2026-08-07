import React, { useState } from 'react';
import { LEARNING_TRACKS } from '../data/portfolioData';
import { GraduationCap, Cpu, Server, Shield, Sparkles, Compass } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string>('ai-engineering');

  const activeTrack = LEARNING_TRACKS.find(t => t.id === activeTrackId) || LEARNING_TRACKS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-8 lg:px-14 relative z-10 max-w-6xl mx-auto w-full">
      {/* Subtle section glow */}
      <div className="ambient-glow-teal top-1/2 -left-20 opacity-15" />

      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2dd4bf] uppercase tracking-wider mb-2">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Background & Self-Study Agenda</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About & Currently Learning
        </h2>
        <p className="text-sm sm:text-base text-[#9ca3af] mt-2 max-w-2xl">
          Software Engineering student driven by low-level systems, high-throughput architectures, and machine intelligence.
        </p>
      </div>

      {/* Grid: Left Column (Editorial Background & Philosophy) + Right Column (3 Interactive Study Tracks) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Background & Engineering Mindset (Spans 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-7 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
            {/* Subtle dual-tone glow in corner */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#2dd4bf]/20 to-[#f43f5e]/20 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>First-Principles Engineering</span>
            </h3>

            <div className="space-y-4 text-sm text-[#9ca3af] leading-relaxed">
              <p>
                I am a <strong className="text-white font-semibold">Software Engineering student</strong> obsessed with understanding how software behaves beneath high-level abstractions — from memory layouts and cache locality in C++ to the token probability distributions of large language models.
              </p>
              <p>
                My projects reflect this focus: building high-frequency in-memory trading order books, modeling graph-theoretic simulations, and deploying local privacy-first AI pipelines without reliance on external cloud APIs.
              </p>
              <p>
                When tackling a problem, I prioritize <span className="text-[#2dd4bf] font-semibold">relentless debugging</span>, verifiable benchmarks, and clean modular code over superficial quick fixes.
              </p>
            </div>

            {/* Core Values / Focus Pillars */}
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[#2dd4bf] font-bold">Low Latency</div>
                <div className="text-[#9ca3af] mt-0.5">Microsecond C++</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[#f43f5e] font-bold">Autonomous AI</div>
                <div className="text-[#9ca3af] mt-0.5">Local Inference</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Deep-Focus Self-Study Tracks (Spans 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Track Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#111116] border border-white/10">
            {LEARNING_TRACKS.map((track) => {
              const isSelected = activeTrackId === track.id;
              const isTeal = track.color === 'teal';

              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                    isSelected
                      ? isTeal
                        ? 'bg-gradient-to-r from-[#2dd4bf]/20 to-[#14b8a6]/20 text-white border border-[#2dd4bf]/40 shadow-md'
                        : 'bg-gradient-to-r from-[#f43f5e]/20 to-[#ff5c5c]/20 text-white border border-[#f43f5e]/40 shadow-md'
                      : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isSelected ? (isTeal ? 'text-[#2dd4bf]' : 'text-[#f43f5e]') : 'text-[#6b7280]'}>
                    {getIcon(track.iconName)}
                  </span>
                  <span className="text-xs font-bold tracking-tight text-center sm:text-left">
                    {track.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Track Deep Dive Panel */}
          <div className="p-7 rounded-2xl glass-panel border border-[#2dd4bf]/30 relative overflow-hidden transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-[#2dd4bf] uppercase tracking-wider">
                  Self-Study Track 0{LEARNING_TRACKS.findIndex(t => t.id === activeTrack.id) + 1}
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {activeTrack.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#9ca3af]">Progress</span>
                <span className="text-xs font-mono font-bold text-[#2dd4bf] bg-[#2dd4bf]/10 px-2.5 py-1 rounded-full border border-[#2dd4bf]/20">
                  {activeTrack.progress}%
                </span>
              </div>
            </div>

            <p className="text-sm text-[#d1d5db] mt-4 leading-relaxed">
              {activeTrack.description}
            </p>

            {/* Core Modules Breakdown */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-mono text-[#2dd4bf] uppercase tracking-wider">
                Core Competencies & Modules
              </h4>

              {activeTrack.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0a0a0c]/70 border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">
                      {topic.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        topic.status === 'Mastered'
                          ? 'bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30'
                          : topic.status === 'In Progress'
                          ? 'bg-[#f43f5e]/15 text-[#f43f5e] border border-[#f43f5e]/30'
                          : 'bg-white/10 text-[#d1d5db]'
                      }`}
                    >
                      {topic.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af] leading-normal">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Practical Output Callout */}
            <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-[#2dd4bf]/10 to-transparent border-l-2 border-[#2dd4bf] text-xs text-[#9ca3af] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#2dd4bf] shrink-0" />
              <span>
                <strong className="text-white font-semibold">Practical Application:</strong> {activeTrack.practicalApplication}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
