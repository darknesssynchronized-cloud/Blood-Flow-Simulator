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
  // Reynolds status determination based on standard scientific thresholds
  const getReynoldsBadge = (re: number) => {
    if (re < 2000) {
      return {
        label: 'LAMINAR FLOW',
        bg: 'bg-emerald-950/80',
        border: 'border-emerald-500/50',
        text: 'text-emerald-400',
        indicator: 'bg-emerald-500',
      };
    } else if (re <= 4000) {
      return {
        label: 'TRANSITIONAL FLOW',
        bg: 'bg-amber-950/80',
        border: 'border-amber-500/50',
        text: 'text-amber-400',
        indicator: 'bg-amber-500',
      };
    } else {
      return {
        label: 'TURBULENT FLOW',
        bg: 'bg-rose-950/80',
        border: 'border-rose-500/50',
        text: 'text-rose-400',
        indicator: 'bg-rose-500',
      };
    }
  };

  const badge = getReynoldsBadge(results.reynoldsNumber);

  return (
    <div className="bg-ink-900/90 border border-ink-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b border-ink-800/80 pb-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-accent-400 font-bold">
          Live Scientific Metrics
        </h2>
        <span className="text-xs font-mono text-ink-400">Real-time Poiseuille Output</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Flow Rate Card */}
        <div className="bg-ink-950 border border-ink-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-ink-700 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
            Volumetric Flow Rate (<span className="text-accent-400 normal-case">Q</span>)
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-ink-100 tracking-tight">
              {flowValueFormatted.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-accent-400">{flowUnit}</span>
          </div>
          <div className="mt-3 text-xs font-mono text-emerald-400 flex items-center space-x-1">
            <span>↑ Live Simulation Result</span>
          </div>
        </div>

        {/* Mean Velocity Card */}
        <div className="bg-ink-950 border border-ink-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-ink-700 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
            Mean Flow Velocity (<span className="text-accent-400 normal-case">v</span>)
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-ink-100 tracking-tight">
              {results.velocity.toFixed(3)}
            </span>
            <span className="text-xs font-mono text-accent-400">m/s</span>
          </div>
          <div className="mt-3 text-xs font-mono text-ink-500">
            v = Q / A
          </div>
        </div>

        {/* Reynolds Number Card */}
        <div className="bg-ink-950 border border-ink-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-ink-700 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
            Reynolds Number (<span className="text-accent-400 normal-case">Re</span>)
          </div>
          <div>
            <div className="text-3xl font-black font-mono text-ink-100 tracking-tight">
              {results.reynoldsNumber.toFixed(1)}
            </div>
            <div className={`mt-2 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.indicator} animate-ping`}></span>
              <span>{badge.label}</span>
            </div>
          </div>
        </div>

        {/* Wall Shear Stress Card */}
        <div className="bg-ink-950 border border-ink-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-ink-700 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
            Wall Shear Stress (<span className="text-accent-400 normal-case">τ</span>)
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-ink-100 tracking-tight">
              {results.shearStress.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-accent-400">Pa</span>
          </div>
          <div className="mt-3 text-xs font-mono text-ink-500">
            τ = 4μQ / (πr³)
          </div>
        </div>

        {/* Hydraulic Resistance Card */}
        <div className="bg-ink-950 border border-ink-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-ink-700 transition-colors">
          <div className="text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
            Hydraulic Resistance (<span className="text-accent-400 normal-case">R</span>)
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-ink-100 tracking-tight">
              {formatScientific(results.resistance)}
            </span>
            <span className="text-xs font-mono text-accent-400">Pa·s/m³</span>
          </div>
          <div className="mt-3 text-xs font-mono text-ink-500">
            R = 8μL / (πr⁴)
          </div>
        </div>
      </div>
    </div>
  );
}
