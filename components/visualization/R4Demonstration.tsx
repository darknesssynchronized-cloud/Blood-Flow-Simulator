'use client';

import React from 'react';

interface R4Props {
  currentRadiusMm: number;
}

export function R4Demonstration({ currentRadiusMm }: R4Props) {
  const multipliers = [0.5, 0.75, 1.0, 1.5, 2.0];

  return (
    <div className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
          Fourth-Power Relationship Impact
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Demonstrating how scaling radius ($r$) scales volumetric flow ($Q$) exponentially
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {multipliers.map((m) => {
          const r4 = Math.pow(m, 4);
          const isBaseline = m === 1.0;

          return (
            <div
              key={m}
              className={`p-3 rounded-lg border text-center transition-all ${
                isBaseline
                  ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                  : 'bg-[#070a12] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400">Radius Scaling</div>
              <div className="text-base font-bold font-mono text-slate-100 mt-0.5">r × {m}</div>
              <div className="text-xl font-extrabold font-mono text-cyan-400 mt-2">
                {r4 < 1 ? `1/${(1 / r4).toFixed(1)}` : `${r4}×`}
              </div>
              <div className="text-[9px] font-mono text-slate-500 uppercase mt-1">Flow Factor</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
