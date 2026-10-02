'use client';

import React from 'react';

interface R4Props {
  currentRadiusMm: number;
}

export function R4Demonstration({ currentRadiusMm }: R4Props) {
  const multipliers = [0.5, 0.75, 1.0, 1.5, 2.0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-xl font-bold text-cyan-400">Educational Focus: Q ∝ r⁴</h2>
        <p className="text-xs text-slate-400 mt-1">
          Flow rate (Q) is proportional to radius (r) raised to the 4th power.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {multipliers.map((m) => {
          const r4 = Math.pow(m, 4);
          const isBaseline = m === 1.0;

          return (
            <div
              key={m}
              className={`p-3 rounded-lg border text-center ${
                isBaseline
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs text-slate-400">r × {m}</div>
              <div className="text-lg font-bold font-mono mt-1">
                {r4 < 1 ? `1/${(1 / r4).toFixed(1)}` : `${r4}×`}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Flow Factor</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
