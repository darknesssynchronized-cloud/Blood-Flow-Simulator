'use client';

import React from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-500 font-black text-sm tracking-widest shadow-inner shadow-rose-950">
            BF
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-100 tracking-wider text-base">BLOODFLOW</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-rose-950/60 text-rose-400 border border-rose-800/50 rounded">
                HEMODYNAMICS LAB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Hagen–Poiseuille Flow Simulation Tool
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-6 text-xs font-mono">
          <a href="#simulator" className="px-3 py-1.5 text-cyan-400 hover:text-cyan-300 font-semibold border-b-2 border-cyan-500 transition-colors">
            Simulator
          </a>
          <a href="#visualization" className="px-3 py-1.5 text-slate-400 hover:text-slate-200 transition-colors">
            Visualization
          </a>
          <a href="#theory" className="px-3 py-1.5 text-slate-400 hover:text-slate-200 transition-colors">
            Theory
          </a>
          <a href="#about" className="px-3 py-1.5 text-slate-400 hover:text-slate-200 transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
