'use client';

import React from 'react';
import { PhysicsResult } from '@/lib/physics/poiseuille';
import { formatScientific } from '@/lib/format';

interface ResultsProps {
  results: PhysicsResult;
  flowUnit: 'mL/s' | 'mL/min';
  flowValueFormatted: number;
}

export function ResultsPanel({ results, flowUnit, flowValueFormatted }: ResultsProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-6">
      <h2 className="text-xl font-bold border-b border-slate-800 pb-3 text-cyan-400">
        Live Calculation Results
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Flow Rate */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Volumetric Flow Rate (Q)</span>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {flowValueFormatted.toFixed(2)} <span className="text-sm font-normal text-slate-400">{flowUnit}</span>
          </div>
        </div>

        {/* Velocity */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Mean Flow Velocity (v)</span>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {results.velocity.toFixed(3)} <span className="text-sm font-normal text-slate-400">m/s</span>
          </div>
        </div>

        {/* Resistance */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Hydraulic Resistance (R)</span>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {formatScientific(results.resistance)}{' '}
            <span className="text-sm font-normal text-slate-400">Pa·s/m³</span>
          </div>
        </div>

        {/* Reynolds Number */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Reynolds Number (Re)</span>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {results.reynoldsNumber.toFixed(1)}
          </div>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-[10px] rounded font-semibold ${
              results.isLaminar ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
            }`}
          >
            {results.isLaminar ? 'Laminar Flow' : 'Transitional / Turbulent Warning'}
          </span>
        </div>

        {/* Shear Stress */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Wall Shear Stress (τ)</span>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {results.shearStress.toFixed(2)} <span className="text-sm font-normal text-slate-400">Pa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
