import React, { useState, useRef, useEffect } from 'react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  command: string;
  output: string;
  animated?: boolean;
}

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  onTick?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, onTick }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    if (!text) {
      onCompleteRef.current?.();
      return;
    }

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      onTickRef.current?.();

      if (index >= text.length) {
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, 10);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
};

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: `Salman Younus (Sal) - Interactive Systems Shell v2.5.0\nType "help" to view available system commands.`,
      animated: false,
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        document.body.classList.remove('modal-active');
        document.body.style.overflow = '';
      };
    } else {
      document.body.classList.remove('modal-active');
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const markAsAnimated = (index: number) => {
    setHistory((prev) =>
      prev.map((item, i) => (i === index ? { ...item, animated: true } : item))
    );
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = TERMINAL_COMMANDS[trimmed] || `Command not found: "${trimmed}". Type "help" for a list of commands.`;
    setHistory((prev) => [...prev, { command: input, output, animated: false }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl h-[600px] max-h-[85vh] rounded-2xl bg-[#0a0a0e] border border-white/25 shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="flex items-center px-4 py-3 bg-[#111116] border-b border-white/10 select-none shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Terminal"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              style={{
                width: '20px',
                height: '20px',
                minWidth: '20px',
                minHeight: '20px',
                maxWidth: '20px',
                maxHeight: '20px',
                flexShrink: 0,
                padding: 0,
                margin: 0,
                border: 'none',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxSizing: 'border-box',
                lineHeight: 0,
              }}
            >
              <X
                style={{
                  width: '10px',
                  height: '10px',
                  minWidth: '10px',
                  minHeight: '10px',
                  maxWidth: '10px',
                  maxHeight: '10px',
                  display: 'block',
                }}
                strokeWidth={2.5}
                className="text-white"
              />
            </button>
            <span className="text-[11px] text-[#a1a1aa] flex items-center gap-1.5 font-bold">
              <TerminalIcon className="w-3.5 h-3.5 text-white" />
              sxlmwn@workstation: ~/portfolio-v2
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto smooth-scroll-area space-y-3 leading-relaxed text-[#d4d4d8]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-[#71717a]">➜</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              {item.output && (
                <pre className="whitespace-pre-wrap font-mono text-[#a1a1aa] text-xs pl-4 border-l border-white/10">
                  {item.animated ? (
                    item.output
                  ) : (
                    <TypewriterText
                      text={item.output}
                      onTick={() => bottomRef.current?.scrollIntoView()}
                      onComplete={() => markAsAnimated(idx)}
                    />
                  )}
                </pre>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-[#111116] border-t border-white/10 shrink-0">
          <span className="text-[#71717a] font-bold">➜</span>
          <span className="text-white font-bold">sxlmwn $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'skills', 'projects'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-[#52525b]"
          />
        </form>
      </div>
    </div>
  );
};
