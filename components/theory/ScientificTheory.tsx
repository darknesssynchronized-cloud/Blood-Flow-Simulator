'use client';

import React from 'react';

export function ScientificTheory() {
  return (
    <section id="theory" className="bg-ink-900/90 border border-ink-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-ink-800/80 pb-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-accent-400 font-bold">
          Scientific Explanation & Governing Equations
        </h2>
        <p className="text-xs text-ink-400 mt-0.5">The Hagen–Poiseuille Law of Hemodynamics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="bg-ink-950 border border-ink-800 p-4 rounded-xl text-center">
            <span className="text-xs font-mono text-ink-400 block mb-2">Hagen–Poiseuille Equation</span>
            <div className="text-2xl font-serif italic text-accent-300 font-bold tracking-widest">
              Q = <span className="inline-block border-b border-accent-500 pb-1">π · r⁴ · ΔP</span>
            </div>
            <div className="text-lg font-serif italic text-accent-300 font-bold mt-1">
              8 · μ · L
            </div>
          </div>

          <p className="text-xs text-ink-300 leading-relaxed">
            Because volumetric flow rate (<span className="font-bold text-accent-400">Q</span>) is proportional to the <span className="font-bold text-rose-400">fourth power of vessel radius (r⁴)</span>, even tiny physiological changes in vessel radius produce massive variations in blood flow rate.
          </p>
        </div>

        <div className="bg-ink-950/80 border border-ink-800/60 p-4 rounded-xl space-y-3 font-mono text-xs">
          <div className="text-accent-400 font-bold mb-1 text-xs uppercase tracking-wider">
            Parameter Multiplier Sensitivity (r⁴):
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-ink-900 p-2 rounded border border-ink-800">
              <span className="text-ink-400">Radius × 0.5:</span>
              <div className="text-rose-400 font-bold">Flow = 1 / 16 (6.25%)</div>
            </div>
            <div className="bg-ink-900 p-2 rounded border border-ink-800">
              <span className="text-ink-400">Radius × 2.0:</span>
              <div className="text-emerald-400 font-bold">Flow = 16× Original</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
