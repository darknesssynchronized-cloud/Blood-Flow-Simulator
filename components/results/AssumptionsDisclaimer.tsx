'use client';

import React from 'react';

export function AssumptionsDisclaimer() {
  return (
    <div className="bg-ink-900/80 border border-ink-800/80 rounded-2xl p-6 text-ink-400 space-y-4 text-xs font-sans">
      <h3 className="text-xs font-mono uppercase tracking-wider text-ink-300 font-bold">
        Model Assumptions & Educational Disclaimer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-ink-950/60 border border-ink-800/60 p-4 rounded-xl">
          <span className="font-semibold text-ink-200 block mb-2 font-mono text-xs text-accent-400 uppercase">
            Hagen–Poiseuille Physics Assumptions:
          </span>
          <ul className="list-disc list-inside space-y-1.5 text-ink-300 text-xs">
            <li>Incompressible Newtonian fluid (constant viscosity)</li>
            <li>Laminar, non-pulsatile steady state flow</li>
            <li>Rigid, straight cylindrical vessel geometry</li>
            <li>No-slip condition at the vascular wall boundary</li>
          </ul>
        </div>

        <div className="bg-ink-950/60 border border-ink-800/60 p-4 rounded-xl">
          <span className="font-semibold text-ink-200 block mb-2 font-mono text-xs text-rose-400 uppercase">
            Real Human Circulation Differences:
          </span>
          <ul className="list-disc list-inside space-y-1.5 text-ink-300 text-xs">
            <li>Blood is non-Newtonian (shear-thinning non-linear fluid)</li>
            <li>Flow is pulsatile driven by cardiac cycle rhythm</li>
            <li>Vessels are flexible, elastic, and compliant</li>
          </ul>
        </div>
      </div>

      <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl text-amber-300/90 text-xs font-mono leading-relaxed">
        <strong>Academic Disclaimer:</strong> This simulator is developed strictly as an educational biomedical engineering tool for teaching hemodynamics. It is not intended for diagnostic or clinical medical use.
      </div>
    </div>
  );
}
