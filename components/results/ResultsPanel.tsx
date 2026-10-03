'use client';

import React from 'react';
import { PhysicsResult } from '../../lib/physics/poiseuille';
import { formatScientific } from '../../lib/format';

interface ResultsProps {
  results: PhysicsResult;
  flowUnit: 'mL/s' | 'mL/min';
  flowValueFormatted: number;
}

export function ResultsPanel({ results, flowUnit, flowValueFormatted }: ResultsProps) {
  const getRegimeBadge = () => {
    switch (results.regime) {
      case 'LAMINAR':
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400',
          dot: 'bg-emerald-400',
          label: 'LAMINAR FLOW',
          desc: 'Re < 2000 (Parallel, smooth streamlines)',
        };
      case 'TRANSITIONAL':
        return {
          bg: 'bg-amber-950/80 border-amber-500/50 text-amber-400',
          dot: 'bg-amber-400',
          label: 'TRANSITIONAL FLOW',
          desc: '2000 ≤ Re ≤ 4000 (Instabilities developing)',
        };
      case 'TURBULENT':
        return {
          bg: 'bg-rose-950/80 border-rose-500/50 text-rose-400',
          dot: 'bg-rose-400',
          label: 'TURBULENT FLOW',
          desc: 'Re > 4000 (Recirculation, vortices)',
        };
    }
  };

  const badge = getRegimeBadge();

  return (
    <div className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
          <span>📊</span> Live Quantitative Results
        </h2>
        <span className="text-[10px] font-mono text-slate-500">Real-Time Hagen–Poiseuille Calculation</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Volumetric Flow Rate */}
        <div className="bg-[#070a12] border border-slate-800/90 p-4 rounded-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            VOLUMETRIC FLOW RATE (Q)
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-400 tracking-tight">
            {flowValueFormatted.toFixed(2)}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1 flex justify-between items-center">
            <span>{flowUnit}</span>
            <span className="text-[10px] text-cyan-500/80">↑ Active Simulation</span>
          </div>
        </div>

        {/* Mean Flow Velocity */}
        <div className="bg-[#070a12] border border-slate-800/90 p-4 rounded-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            MEAN VELOCITY (v)
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-100 tracking-tight">
            {results.velocity.toFixed(3)}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">m / s</div>
        </div>

        {/* Reynolds Number */}
        <div className="bg-[#070a12] border border-slate-800/90 p-4 rounded-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            REYNOLDS NUMBER (Re)
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-100 tracking-tight">
            {results.reynoldsNumber.toFixed(1)}
          </div>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${badge.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
            {badge.label}
          </div>
        </div>

        {/* Wall Shear Stress */}
        <div className="bg-[#070a12] border border-slate-800/90 p-4 rounded-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            WALL SHEAR STRESS (τ_w)
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-100 tracking-tight">
            {results.shearStress.toFixed(2)}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">Pa (N/m²)</div>
        </div>
      </div>

      {/* Hydraulic Resistance Banner */}
      <div className="bg-[#070a12] border border-slate-800/90 px-4 py-3 rounded-lg flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-2">
        <span className="text-slate-400">HYDRAULIC RESISTANCE (R_h):</span>
        <span className="text-cyan-300 font-bold text-sm">
          {formatScientific(results.resistance)} <span className="text-xs text-slate-500">Pa·s/m³</span>
        </span>
      </div>
    </div>
  );
}
