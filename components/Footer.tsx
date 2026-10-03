'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] py-6 px-4 text-center text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          BLOODFLOW SIMULATOR — Hemodynamics & Biomedical Engineering Platform
        </div>
        <div>
          Hagen–Poiseuille Modeling Framework Engine v2.0
        </div>
      </div>
    </footer>
  );
}
