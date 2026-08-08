import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Code, CheckCircle2, ChevronRight } from 'lucide-react';
import { GitHubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Systems', 'DSA', 'AI', 'Web'];

  const filteredProjects = filterCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 px-5 sm:px-8 lg:px-12 relative z-10 max-w-7xl mx-auto w-full">
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              className="group relative rounded-2xl p-7 sm:p-8 glass-panel border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-white/5"
            >
              <div>
                {/* Top Meta: Category & Metrics */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20">
                    {project.category}
                  </span>

                  {project.metrics[0] && (
                    <span className="text-[11px] font-mono text-[#a1a1aa] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {project.metrics[0].label}: <strong className="text-white">{project.metrics[0].value}</strong>
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#71717a] mt-1">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#a1a1aa] mt-3.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Badges Row */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-[#71717a] truncate">{m.label}</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-[#161622] text-[11px] font-mono text-[#d4d4d8] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between gap-3 mt-7 pt-5 border-t border-white/10">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-white/80 transition-colors font-semibold"
                >
                  <Code className="w-3.5 h-3.5 text-white" />
                  <span>Architecture & Code</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-105"
                      title="Live Site / Preview"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-white/25 p-6 sm:p-8 shadow-2xl shadow-black">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
              aria-label="Close Project Modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase font-semibold">
                {selectedProject.category} System
              </span>
              <span className="text-xs font-mono text-[#71717a]">
                {selectedProject.subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {selectedProject.title}
            </h3>

            <p className="text-sm sm:text-base text-[#d4d4d8] mt-4 leading-relaxed">
              {selectedProject.extendedDescription}
            </p>

            {/* Key Features List */}
            <div className="mt-6">
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
            <div className="mt-6 p-4 rounded-xl bg-[#0a0a0c] border border-white/10">
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
              <div className="mt-6">
                <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-[#161622] border-t border-x border-white/10 text-xs font-mono text-[#a1a1aa]">
                  <span>{selectedProject.codeSnippet.filename}</span>
                  <span className="uppercase text-white font-bold">{selectedProject.codeSnippet.language}</span>
                </div>
                <pre className="p-4 rounded-b-xl bg-[#0a0a0c] border border-white/10 text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
                  <code>{selectedProject.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
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
