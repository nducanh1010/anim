'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CommandOutput {
  id: number;
  command: string;
  response: React.ReactNode;
}

export function TerminalView() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 0,
      command: 'welcome',
      response: (
        <div className="text-ink-mute space-y-1">
          <p className="text-accent font-semibold">Welcome to anhnd.studio OS Terminal [v1.2.0]</p>
          <p>Type <span className="text-signature">help</span> to view available commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-ink-mute">
            <p><span className="text-accent">whoami</span>    — display current user information</p>
            <p><span className="text-accent">skills</span>    — core technologies & tools</p>
            <p><span className="text-accent">contact</span>   — reach out via email / socials</p>
            <p><span className="text-accent">clear</span>     — clear terminal output</p>
          </div>
        );
        break;
      case 'whoami':
        response = (
          <p className="text-ink">
            anhnd — Creative developer & design engineer building tactile software in HCMC.
          </p>
        );
        break;
      case 'skills':
        response = (
          <p className="text-ink">
            React 19, Next.js 15, TypeScript, Framer Motion, GSAP, Three.js, OKLCH, Tailwind CSS.
          </p>
        );
        break;
      case 'contact':
        response = (
          <p className="text-ink">
            Email: <span className="text-accent">ducanh.dev@example.com</span> | GitHub: <span className="text-accent">github.com/ducanh</span>
          </p>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = (
          <p className="text-warn">
            zsh: command not found: {cmd}. Type &apos;help&apos; for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        command: input,
        response,
      },
    ]);
    setInput('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="font-mono text-xs leading-relaxed flex flex-col min-h-full cursor-text"
    >
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-ink-faint">
              <span className="text-accent">anhnd@studio</span>
              <span>~ %</span>
              <span className="text-ink font-semibold">{item.command}</span>
            </div>
            <div className="pl-4">{item.response}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-3 pl-0">
        <span className="text-accent">anhnd@studio</span>
        <span className="text-ink-faint">~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-ink outline-none border-none p-0 focus:ring-0 font-mono text-xs"
          autoFocus
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}

