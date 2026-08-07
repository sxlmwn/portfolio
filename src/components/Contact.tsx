import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, ArrowUp, Clock, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    
    // Confetti celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2dd4bf', '#f43f5e', '#ffffff'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto trigger fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setFormSent(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2dd4bf', '#f43f5e'],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-4 sm:px-8 lg:px-14 relative z-10 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2dd4bf] uppercase tracking-wider mb-2">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch & Collaborate</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Great.
        </h2>
        <p className="text-sm sm:text-base text-[#9ca3af] mt-2 max-w-2xl">
          Whether you're looking for an engineering intern, discussing low-latency C++, or exploring local AI agents, my inbox is open.
        </p>
      </div>

      {/* Grid: Left Contact Info Cards + Right Interactive Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Email Quick Copy Card */}
          <div className="p-6 rounded-2xl glass-panel border border-[#2dd4bf]/30 relative overflow-hidden group">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono text-[#2dd4bf] uppercase tracking-wider">
                Direct Email
              </span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                title="Copy Email Address"
                aria-label="Copy Email Address"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#2dd4bf]" />
                    <span className="text-[#2dd4bf]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-lg sm:text-xl font-bold text-white hover:text-[#2dd4bf] transition-colors break-all"
            >
              {PERSONAL_INFO.email}
            </a>

            <p className="text-xs text-[#9ca3af] mt-2">
              Fastest response time for opportunities and discussions.
            </p>
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
                <GitHubIcon className="w-5 h-5 text-white group-hover:text-[#2dd4bf] transition-colors" />
                <span className="text-[10px] font-mono text-[#6b7280]">@sxlmwn</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-white">GitHub</div>
                <div className="text-xs text-[#9ca3af]">Repositories & Code</div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#2dd4bf]/40 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <LinkedInIcon className="w-5 h-5 text-white group-hover:text-[#2dd4bf] transition-colors" />
                <span className="text-[10px] font-mono text-[#6b7280]">/in/sxlmwn</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-white">LinkedIn</div>
                <div className="text-xs text-[#9ca3af]">Professional Network</div>
              </div>
            </a>
          </div>

          {/* Location & Time Indicator */}
          <div className="p-4 rounded-xl glass-panel-subtle border border-white/5 flex items-center justify-between text-xs font-mono text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#f43f5e]" />
              <span>Karachi, PK (UTC+5)</span>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>{timeString || 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-7 rounded-2xl glass-panel border border-white/10 flex flex-col gap-4 relative"
          >
            <h3 className="text-lg font-bold text-white">
              Send a Direct Note
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="ada@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9ca3af] mb-1.5">
                Message / Opportunity Details
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hey Salman, let's discuss an engineering project or role..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] hover:from-[#38efd8] hover:to-[#2dd4bf] text-[#0a0a0c] font-bold text-sm shadow-md shadow-[#2dd4bf]/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Transmit Note</span>
              <Send className="w-4 h-4" />
            </button>

            {formSent && (
              <div className="p-3 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 text-xs font-mono text-[#2dd4bf] text-center animate-in fade-in">
                ✓ Message prepared in your mail client. Looking forward to speaking!
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6b7280]">
        <div>
          &copy; {new Date().getFullYear()} Salman Younus ({PERSONAL_INFO.handle}). All Systems Nominal.
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#9ca3af]">GitHub Pages & Actions</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#2dd4bf] hover:underline"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
