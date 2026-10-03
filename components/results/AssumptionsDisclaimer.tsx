'use client';

import React from 'react';

export function AssumptionsDisclaimer() {
  return (
    <div id="about" className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 text-slate-400 space-y-4 text-xs">
      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <span>⚠️</span> Model Scope, Assumptions & Medical Disclaimer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
        <div className="bg-[#070a12] p-3 rounded border border-slate-800/80">
          <span className="font-semibold text-slate-300 block mb-1">Hagen–Poiseuille Mathematical Assumptions:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Incompressible Newtonian fluid (constant viscosity)[cite: 1]</li>
            <li>Laminar, steady, non-pulsatile flow regime[cite: 1]</li>
            <li>Rigid, non-distensible, straight cylindrical lumen[cite: 1]</li>
            <li>Zero-velocity boundary conditions at wall (no-slip)[cite: 1]</li>
          </ul>
        </div>
        <div className="bg-[#070a12] p-3 rounded border border-slate-800/80">
          <span className="font-semibold text-slate-300 block mb-1">In Vivo Human Circulatory Differences:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Whole blood is non-Newtonian (shear-thinning red blood cells)</li>
            <li>Flow is pulsatile driven by cardiac cycle dynamics</li>
            <li>Arteries are viscoelastic and compliant</li>
          </ul>
        </div>
      </div>

      <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded text-amber-300/90 text-[11px]">
        <strong>Educational Disclaimer:</strong> This web application is an educational simulation designed for Biomedical Engineering students and instructors. It does not replace clinical measurement systems or clinical decision-making.
      </div>
    </div>
  );
}
