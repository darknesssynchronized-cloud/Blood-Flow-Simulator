'use client';

import React from 'react';

export function ScientificExplanation() {
  return (
    <div className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <span>🧠</span> Scientific Theory & Hagen–Poiseuille Law
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Mathematical derivation governing steady laminar hemodynamics in cylindrical vessels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Hagen-Poiseuille Formula Box */}
        <div className="bg-[#070a12] border border-slate-800 p-5 rounded-lg text-center space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
            THE HAGEN–POISEUILLE EQUATION
          </span>
          <div className="text-2xl font-mono font-bold text-cyan-300 tracking-wider py-2 bg-slate-900/60 border border-slate-800 rounded">
            $$Q = \frac{\pi r^4 \Delta P}{8 \eta L}$$
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Volumetric flow rate <strong className="text-slate-200">$Q$</strong> is directly proportional to pressure gradient <strong className="text-slate-200">$\Delta P$</strong> and radius to the 4th power <strong className="text-rose-400">$r^4$</strong>, and inversely proportional to viscosity <strong className="text-slate-200">$\eta$</strong> and vessel length <strong className="text-slate-200">$L$</strong>[cite: 1].
          </p>
        </div>

        {/* Clinical Insight */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wide">
            Clinical Significance of $r^4$
          </h3>
          <p>
            In human vasculature, small changes in vascular caliber (vasoconstriction or vasodilation) produce profound changes in organ perfusion.
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 font-mono text-[11px]">
            <li>
              <strong className="text-slate-200">50% Vessel Stenosis ($r \to 0.5r$):</strong> Reduces blood flow by 93.75% ($1/16^{\text{th}}$ original flow).
            </li>
            <li>
              <strong className="text-slate-200">20% Vasodilation ($r \to 1.2r$):</strong> Increases blood flow by ~107% ($2.07\times$).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
