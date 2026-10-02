'use client';

import React from 'react';

export function AssumptionsDisclaimer() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
        Model Assumptions & Educational Disclaimer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold text-slate-300 block mb-1">Hagen–Poiseuille Assumptions:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Incompressible Newtonian fluid</li>
            <li>Laminar, non-pulsatile steady flow</li>
            <li>Rigid, straight cylindrical tube</li>
            <li>No-slip condition at vessel wall</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-300 block mb-1">Real Human Circulation Differences:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Blood is non-Newtonian (shear-thinning)</li>
            <li>Flow is pulsatile driven by cardiac cycle</li>
            <li>Vessels are elastic and compliance-capable</li>
          </ul>
        </div>
      </div>

      <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded text-amber-300/90 text-[11px]">
        <strong>Disclaimer:</strong> This simulator is an educational approximation for Biomedical Engineering students. It is not a diagnostic or clinical tool and must not be used for medical decisions.
      </div>
    </div>
  );
}
