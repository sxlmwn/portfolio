import React, { useState, useEffect } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Code, CheckCircle2, ChevronRight } from 'lucide-react';
import { GitHubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.classList.remove('modal-active');
        document.body.style.overflow = '';
      };
    } else {
      document.body.classList.remove('modal-active');
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const categories = ['All', 'Systems', 'DSA', 'AI', 'Web'];

  const filteredProjects = filterCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 px-6 sm:px-10 lg:px-16 relative z-10 w-full border-b border-white/5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-white" />
            <span>Engineered Systems & Software</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] mt-2 max-w-2xl">
            Selected systems across low-latency C++ engines, algorithm simulations, and autonomous AI pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#111116] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filterCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isFeatured = project.featured;

          return (
            <div
              key={project.id}
              className={`group rounded-2xl glass-panel border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                isFeatured ? 'md:col-span-2 lg:col-span-2 border-white/20 bg-[#161622]/60' : ''
              }`}
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Header Row: Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  {isFeatured && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white text-black">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#a1a1aa] mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#a1a1aa] mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics / Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-black/40 border border-white/5">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#71717a] uppercase truncate">
                        {metric.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-white truncate">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#d4d4d8] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white transition-colors font-semibold cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5 text-white" />
                  <span>Architecture & Code</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-105"
                      title="Live Demo"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-105"
                    title="GitHub Repository"
                    aria-label="View GitHub Repository"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Deep Dive Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl h-[85vh] modal-panel rounded-2xl border border-white/25 shadow-2xl shadow-black flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-4 border-b border-white/10 bg-[#0a0a0e] select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase font-semibold">
                  {selectedProject.category} System
                </span>
                <span className="text-xs font-mono text-[#71717a] truncate max-w-[200px] sm:max-w-none">
                  {selectedProject.subtitle}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 font-mono text-xs"
                aria-label="Close Project Modal"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto smooth-scroll-area p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm sm:text-base text-[#d4d4d8] mt-3 leading-relaxed">
                  {selectedProject.extendedDescription}
                </p>
              </div>

              {/* Key Features List */}
              <div>
                <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-3">
                  Key Engineering Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#a1a1aa]">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Notes */}
              <div className="p-4 rounded-xl bg-[#0a0a0c] border border-white/10">
                <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-2">
                  System Architecture & Design Decisions
                </h4>
                <ul className="space-y-1.5 text-xs text-[#a1a1aa] font-mono">
                  {selectedProject.architectureNotes.map((note, idx) => (
                    <li key={idx}>&bull; {note}</li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Preview */}
              {selectedProject.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-[#161622] border-t border-x border-white/10 text-xs font-mono text-[#a1a1aa]">
                    <span>{selectedProject.codeSnippet.filename}</span>
                    <span className="uppercase text-white font-bold">{selectedProject.codeSnippet.language}</span>
                  </div>
                  <pre className="p-4 rounded-b-xl bg-[#0a0a0c] border border-white/10 text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
                    <code>{selectedProject.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions Footer */}
            <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-4 sm:px-8 sm:py-4 bg-[#0a0a0e] border-t border-white/10">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs shadow-md hover:bg-[#e4e4e7] transition-all hover:scale-105"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
