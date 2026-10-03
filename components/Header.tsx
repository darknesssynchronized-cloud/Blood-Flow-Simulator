'use client';

import React from 'react';

export function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070a12]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-md bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-500 font-bold text-lg shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            🩸
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-slate-100 flex items-center gap-2">
              BLOODFLOW <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 font-mono">SIM-V2</span>
            </h1>
            <p className="text-[11px] text-slate-400 tracking-tight">
              Biomedical Hemodynamics Research Laboratory
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs font-medium">
          <button
            onClick={() => scrollToSection('simulator')}
            className="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            [Simulator]
          </button>
          <button
            onClick={() => scrollToSection('visualization')}
            className="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            [Visualization]
          </button>
          <button
            onClick={() => scrollToSection('analysis')}
            className="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            [Theory]
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            [About]
          </button>
        </nav>
      </div>
    </header>
  );
}
