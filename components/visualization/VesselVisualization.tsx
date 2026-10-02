'use client';

import React from 'react';

interface VesselVisualizationProps {
  radiusMm: number;
  velocity: number;
  flowRateMls: number;
}

export function VesselVisualization({ radiusMm, velocity, flowRateMls }: VesselVisualizationProps) {
  const visualHeight = Math.max(12, Math.min(120, radiusMm * 10));
  const normalizedSpeed = Math.min(Math.max(velocity * 10, 0.5), 8);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cyan-400">Vessel Cross-Section & Flow</h2>
        <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">
          Radius: {radiusMm} mm
        </span>
      </div>

      <div className="relative w-full h-48 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          <defs>
            <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          <rect
            x="20"
            y={80 - visualHeight}
            width="360"
            height={visualHeight * 2}
            fill="url(#vesselGrad)"
            stroke="#ef4444"
            strokeWidth="3"
            rx="4"
          />

          {[30, 80, 130, 180, 230, 280, 330].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={80}
              r={Math.max(2, visualHeight * 0.15)}
              fill="#f87171"
              opacity="0.8"
            >
              <animate
                attributeName="cx"
                from={x}
                to={x + 50}
                dur={`${2 / normalizedSpeed}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        <div className="absolute bottom-2 right-3 text-xs font-mono text-slate-400">
          Velocity: {velocity.toFixed(2)} m/s | Flow: {flowRateMls.toFixed(2)} mL/s
        </div>
      </div>
    </div>
  );
}
