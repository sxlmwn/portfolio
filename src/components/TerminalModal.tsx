import React, { useState, useRef, useEffect } from 'react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'welcome',
      output: `Salman Younus (sxlmwn) - Interactive Systems Shell v2.4.0\nType "help" to view available system commands or "run altradar" to simulate the C++ matching engine.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isSimulating]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'run altradar') {
      setHistory((prev) => [
        ...prev,
        { command: input, output: 'Initializing AltRadar C++ in-memory order book simulation...\n' },
      ]);
      setInput('');
      setIsSimulating(true);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            command: '',
            output: `[ALTRADAR C++20 ENGINE] - Matching L2 Order Book:\n--------------------------------------------------\nBIDS:  [Qty: 2.45 @ $64,210.00]  |  [Qty: 5.10 @ $64,208.50]\nASKS:  [Qty: 1.80 @ $64,210.00]  |  [Qty: 3.25 @ $64,212.00]\n>> MATCH EXECUTION: 1.80 BTC @ $64,210.00 (Latency: 8.4μs)\n>> STATUS: Order filled. Memory allocated: 4.2 MB. Slip: 0.000%`,
          },
        ]);
        setIsSimulating(false);
      }, 1200);
      return;
    }

    const output = TERMINAL_COMMANDS[trimmed] || `Command not found: "${trimmed}". Type "help" for a list of commands.`;
    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl h-[600px] max-h-[85vh] rounded-2xl bg-[#0a0a0e] border border-[#2dd4bf]/40 shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f43f5e] cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-[#eab308]" />
            <div className="w-3 h-3 rounded-full bg-[#2dd4bf]" />
            <span className="text-[11px] text-[#9ca3af] ml-2 flex items-center gap-1.5 font-bold">
              <TerminalIcon className="w-3.5 h-3.5 text-[#2dd4bf]" />
              sxlmwn@workstation: ~/portfolio-v2
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#9ca3af] hover:text-white"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 leading-relaxed text-[#d1d5db]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-[#2dd4bf]">
                  <span className="text-[#f43f5e]">➜</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              {item.output && (
                <pre className="whitespace-pre-wrap font-mono text-[#9ca3af] text-xs pl-4 border-l border-white/10">
                  {item.output}
                </pre>
              )}
            </div>
          ))}

          {isSimulating && (
            <div className="flex items-center gap-2 text-[#2dd4bf] pl-4 animate-pulse">
              <span>Calculating order book depth & slippage...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-[#111116] border-t border-white/10">
          <span className="text-[#f43f5e] font-bold">➜</span>
          <span className="text-[#2dd4bf] font-bold">sxlmwn $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'skills', 'projects', 'run altradar'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-[#4b5563]"
          />
        </form>
      </div>
    </div>
  );
};
