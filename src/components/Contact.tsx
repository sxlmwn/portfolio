import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, Send, ArrowUp, Clock, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', organization: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  // Live PKT (UTC+5) Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeString(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setFormSent(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#d4d4d8', '#a1a1aa'],
    });

    setTimeout(() => {
      setFormData({ name: '', organization: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 sm:px-10 lg:px-16 relative z-10 w-full overflow-x-hidden">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>Connect & Opportunities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Great.
        </h2>
        <p className="text-sm sm:text-base text-[#a1a1aa] mt-2 max-w-2xl">
          Whether you're looking for an engineering intern, discussing low-latency C++, or exploring local AI agents, connect directly through the channels below.
        </p>
      </div>

      {/* Grid: Left Connection Channels + Right Direct Transmission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 overflow-x-hidden">
        {/* Left Column: Direct Links & Status */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Direct Channels Card */}
          <div className="p-6 rounded-2xl glass-panel border border-white/20 relative overflow-hidden group">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                Direct Channels
              </span>
              <span className="text-[10px] font-mono text-[#a1a1aa] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-[#a1a1aa]">Response Time</span>
                <span className="text-xs font-mono font-bold text-white">&lt;24 Hours</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-[#a1a1aa]">Primary Focus</span>
                <span className="text-xs font-mono font-bold text-white">SWE Internships & C++ / AI</span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <GitHubIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-[#71717a]">@sxlmwn</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-white">GitHub</div>
                <div className="text-xs text-[#a1a1aa]">Repositories & Code</div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <LinkedInIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-[#71717a]">/in/sxlmwn</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-white">LinkedIn</div>
                <div className="text-xs text-[#a1a1aa]">Professional Network</div>
              </div>
            </a>
          </div>

          {/* Location & Time Indicator */}
          <div className="p-4 rounded-xl glass-panel-subtle border border-white/5 flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Islamabad, PK (UTC+5)</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>{timeString || 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Note Transmission Form */}
        <div className="lg:col-span-7 w-full min-w-0">
          <form
            onSubmit={handleSubmit}
            className="w-full min-w-0 p-7 sm:p-8 rounded-2xl glass-panel border border-white/10 flex flex-col gap-4 relative"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                Transmit a Direct Note
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#a1a1aa]">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Encrypted & Private</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
              <div className="w-full min-w-0">
                <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                  Your Name / Identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full min-w-0 px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                  Organization / Team (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Company / University"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full min-w-0 px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="w-full min-w-0">
              <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                Message / Opportunity Details
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hey Salman, let's connect regarding a software engineering role or project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-w-0 max-w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#e4e4e7] text-black font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Transmit Note</span>
              <Send className="w-4 h-4" />
            </button>

            {formSent && (
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white text-center flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Note dispatched successfully! Looking forward to connecting.</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
        <div>
          &copy; {new Date().getFullYear()} Salman Younus ({PERSONAL_INFO.handle}). All Systems Nominal.
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#a1a1aa]">GitHub Pages & Actions</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};
