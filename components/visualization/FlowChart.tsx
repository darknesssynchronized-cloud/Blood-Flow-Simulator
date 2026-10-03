'use client';

import React, { useMemo } from 'react';
import { cPToPas, cmToMeters, mmHgToPascal, m3sToMls } from '../../lib/units';
import { calculatePoiseuille } from '../../lib/physics/poiseuille';

interface FlowChartProps {
  currentRadiusMm: number;
  lengthCm: number;
  viscosityCp: number;
  pressureMmHg: number;
}

export function FlowChart({
  currentRadiusMm,
  lengthCm,
  viscosityCp,
  pressureMmHg,
}: FlowChartProps) {
  // Generate curve data points for Radius (0.5 mm to 5.0 mm)
  const curvePoints = useMemo(() => {
    const points: { r: number; q: number }[] = [];
    for (let r = 0.5; r <= 5.0; r += 0.1) {
      const res = calculatePoiseuille({
        radius: r * 1e-3,
        length: cmToMeters(lengthCm),
        viscosity: cPToPas(viscosityCp),
        pressureDiff: mmHgToPascal(pressureMmHg),
      });
      points.push({ r, q: m3sToMls(res.flowRate) });
    }
    return points;
  }, [lengthCm, viscosityCp, pressureMmHg]);

  const maxQ = Math.max(...curvePoints.map((p) => p.q), 0.1);

  // Map SVG coordinates (Width 500, Height 200)
  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 35;

  const getSvgX = (r: number) => padding + ((r - 0.5) / 4.5) * (svgWidth - padding * 2);
  const getSvgY = (q: number) => svgHeight - padding - (q / maxQ) * (svgHeight - padding * 2);

  const pathD = curvePoints.reduce((acc, p, index) => {
    const x = getSvgX(p.r);
    const y = getSvgY(p.q);
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Current operating point calculations
  const currentQ = useMemo(() => {
    const res = calculatePoiseuille({
      radius: currentRadiusMm * 1e-3,
      length: cmToMeters(lengthCm),
      viscosity: cPToPas(viscosityCp),
      pressureDiff: mmHgToPascal(pressureMmHg),
    });
    return m3sToMls(res.flowRate);
  }, [currentRadiusMm, lengthCm, viscosityCp, pressureMmHg]);

  const currentX = getSvgX(Math.min(Math.max(currentRadiusMm, 0.5), 5.0));
  const currentY = getSvgY(currentQ);

  return (
    <div id="analysis" className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
            <span>📈</span> Radius vs. Flow Rate Analysis Curve
          </h2>
          <p className="text-[11px] text-slate-400">
            Interactive visualization of $Q \propto r^4$ non-linear power curve
          </p>
        </div>
        <div className="text-xs font-mono bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded text-cyan-300">
          Q ∝ r⁴ POWER LAW
        </div>
      </div>

      <div className="relative w-full bg-[#050811] rounded-lg border border-slate-800/80 p-3 overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
            const y = svgHeight - padding - ratio * (svgHeight - padding * 2);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={svgWidth - padding}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text x={padding - 5} y={y + 3} fill="#64748b" fontSize="8" textAnchor="end" fontFamily="monospace">
                  {(ratio * maxQ).toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {[0.5, 1.5, 2.5, 3.5, 4.5].map((r) => {
            const x = getSvgX(r);
            return (
              <text key={r} x={x} y={svgHeight - 10} fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {r.toFixed(1)}mm
              </text>
            );
          })}

          {/* $r^4$ Curve Path */}
          <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

          {/* Active User Point Tracing Lines */}
          <line
            x1={currentX}
            y1={svgHeight - padding}
            x2={currentX}
            y2={currentY}
            stroke="#f43f5e"
            strokeDasharray="2 2"
            strokeWidth="1.5"
          />
          <line
            x1={padding}
            y1={currentY}
            x2={currentX}
            y2={currentY}
            stroke="#f43f5e"
            strokeDasharray="2 2"
            strokeWidth="1.5"
          />

          {/* Active Operating Point Circle */}
          <circle cx={currentX} cy={currentY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />

          {/* Axis Labels */}
          <text x={svgWidth / 2} y={svgHeight - 2} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Vessel Radius r (mm)
          </text>
          <text
            x={12}
            y={svgHeight / 2}
            fill="#94a3b8"
            fontSize="9"
            textAnchor="middle"
            fontFamily="sans-serif"
            transform={`rotate(-90, 12, ${svgHeight / 2})`}
          >
            Flow Q (mL/s)
          </text>
        </svg>

        {/* Operating Point Indicator Legend */}
        <div className="absolute top-4 right-5 bg-[#070a12]/90 border border-slate-800 p-2 rounded text-[11px] font-mono space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">
              Current State: r = <span className="text-cyan-300 font-bold">{currentRadiusMm.toFixed(2)} mm</span>
            </span>
          </div>
          <div className="text-slate-400 pl-4">
            Flow Q = <span className="text-rose-400 font-bold">{currentQ.toFixed(2)} mL/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
