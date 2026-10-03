'use client';

import React from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-500 font-black text-sm tracking-widest shadow-inner shadow-rose-950">
            BF
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-ink-100 tracking-wider text-base">BLOODFLOW</span>
              <span className="hidden sm:inline px-1.5 py-0.5 text-xs font-mono font-semibold bg-rose-950/60 text-rose-400 border border-rose-800/50 rounded">
                HEMODYNAMICS LAB
              </span>
            </div>
            <p className="text-xs text-ink-400 font-mono hidden sm:block">
              Hagen–Poiseuille Flow Simulation Tool
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-mono">
          <a href="#simulator" className="px-3 py-1.5 text-accent-400 hover:text-accent-300 font-semibold border-b-2 border-accent-500 transition-colors">
            Simulator
          </a>
          <a href="#visualization" className="px-3 py-1.5 text-ink-400 hover:text-ink-200 transition-colors">
            Visualization
          </a>
          <a href="#theory" className="px-3 py-1.5 text-ink-400 hover:text-ink-200 transition-colors">
            Theory
          </a>
          <a href="#about" className="px-3 py-1.5 text-ink-400 hover:text-ink-200 transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
