'use client';

import React, { useMemo } from 'react';
import { cPToPas, mmHgToPascal, m3sToMls } from '../../lib/units';
import { calculatePoiseuille } from '../../lib/physics/poiseuille';

interface ChartProps {
  currentRadiusMm: number;
  lengthCm: number;
  viscosityCp: number;
  pressureMmHg: number;
}

export function RadiusFlowChart({
  currentRadiusMm,
  lengthCm,
  viscosityCp,
  pressureMmHg,
}: ChartProps) {
  // Generate curve data points for Radius vs Flow Rate
  const chartData = useMemo(() => {
    const points: { r: number; Q: number }[] = [];
    const minR = 0.5;
    const maxR = 5.0;
    const steps = 30;

    for (let i = 0; i <= steps; i++) {
      const r = minR + (i / steps) * (maxR - minR);
      const res = calculatePoiseuille({
        radius: r * 1e-3,
        length: lengthCm * 1e-2,
        viscosity: cPToPas(viscosityCp),
        pressureDiff: mmHgToPascal(pressureMmHg),
      });
      points.push({ r, Q: m3sToMls(res.flowRate) });
    }
    return points;
  }, [lengthCm, viscosityCp, pressureMmHg]);

  // Current calculation point
  const currentResult = calculatePoiseuille({
    radius: currentRadiusMm * 1e-3,
    length: lengthCm * 1e-2,
    viscosity: cPToPas(viscosityCp),
    pressureDiff: mmHgToPascal(pressureMmHg),
  });
  const currentQ = m3sToMls(currentResult.flowRate);

  // SVG Chart Dimensions
  const svgWidth = 500;
  const svgHeight = 180;
  const margin = { top: 20, right: 30, bottom: 35, left: 50 };
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  const maxQ = Math.max(...chartData.map((d) => d.Q), currentQ, 1);
  const minR = 0.5;
  const maxR = 5.0;

  const xScale = (r: number) => margin.left + ((r - minR) / (maxR - minR)) * innerWidth;
  const yScale = (Q: number) => margin.top + innerHeight - (Math.min(Q, maxQ) / maxQ) * innerHeight;

  // Construct SVG Path
  const pathD = chartData.reduce((acc, pt, idx) => {
    const x = xScale(pt.r);
    const y = yScale(pt.Q);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const clampedRadiusX = xScale(Math.min(Math.max(currentRadiusMm, minR), maxR));
  const clampedFlowY = yScale(currentQ);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Visual Analysis: Radius vs Flow Rate
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Non-linear exponential relationship ($Q \propto r^4$)</p>
        </div>
        <div className="text-right font-mono text-xs">
          <span className="text-slate-400">Current Point: </span>
          <span className="text-cyan-400 font-bold">({currentRadiusMm.toFixed(1)} mm, {currentQ.toFixed(2)} mL/s)</span>
        </div>
      </div>

      <div className="w-full flex justify-center bg-slate-950 p-3 rounded-xl border border-slate-800/60">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-52 overflow-visible">
          {/* Axis Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = margin.top + innerHeight * ratio;
            const val = (maxQ * (1 - ratio)).toFixed(1);
            return (
              <g key={ratio}>
                <line x1={margin.left} y1={y} x2={svgWidth - margin.right} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                <text x={margin.left - 8} y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Curve Path */}
          <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

          {/* Current Operating Point Marker */}
          {currentRadiusMm >= minR && currentRadiusMm <= maxR && (
            <g>
              <line x1={clampedRadiusX} y1={margin.top} x2={clampedRadiusX} y2={margin.top + innerHeight} stroke="#f43f5e" strokeDasharray="2,2" />
              <line x1={margin.left} y1={clampedFlowY} x2={svgWidth - margin.right} y2={clampedFlowY} stroke="#f43f5e" strokeDasharray="2,2" />
              <circle cx={clampedRadiusX} cy={clampedFlowY} r="6" fill="#f43f5e" stroke="#020617" strokeWidth="2" className="animate-pulse" />
            </g>
          )}

          {/* X Axis Labels */}
          <text x={svgWidth / 2} y={svgHeight - 4} fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
            Vessel Radius (r) [mm]
          </text>
        </svg>
      </div>
    </div>
  );
}
