'use client';

import React from 'react';

export function ScientificTheory() {
  return (
    <section id="theory" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-slate-800/80 pb-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold">
          Scientific Explanation & Governing Equations
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">The Hagen–Poiseuille Law of Hemodynamics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <span className="text-xs font-mono text-slate-400 block mb-2">Hagen–Poiseuille Equation</span>
            <div className="text-2xl font-serif italic text-cyan-300 font-bold tracking-widest">
              Q = <span className="inline-block border-b border-cyan-500 pb-1">π · r⁴ · ΔP</span>
            </div>
            <div className="text-lg font-serif italic text-cyan-300 font-bold mt-1">
              8 · μ · L
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Because volumetric flow rate (<span className="font-bold text-cyan-400">Q</span>) is proportional to the <span className="font-bold text-rose-400">fourth power of vessel radius (r⁴)</span>, even tiny physiological changes in vessel radius produce massive variations in blood flow rate.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/60 p-4 rounded-xl space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold mb-1 text-[11px] uppercase tracking-wider">
            Parameter Multiplier Sensitivity (r⁴):
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Radius × 0.5:</span>
              <div className="text-rose-400 font-bold">Flow = 1 / 16 (6.25%)</div>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Radius × 2.0:</span>
              <div className="text-emerald-400 font-bold">Flow = 16× Original</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
