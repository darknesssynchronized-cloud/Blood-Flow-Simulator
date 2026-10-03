'use client';

import React from 'react';
import { PARAM_LIMITS, clamp } from '../../lib/validation';

interface ControlsProps {
  radiusMm: number;
  lengthCm: number;
  viscosityCp: number;
  pressureMmHg: number;
  density: number;
  flowUnit: 'mL/s' | 'mL/min';
  onChangeRadius: (val: number) => void;
  onChangeLength: (val: number) => void;
  onChangeViscosity: (val: number) => void;
  onChangePressure: (val: number) => void;
  onChangeDensity: (val: number) => void;
  onChangeFlowUnit: (unit: 'mL/s' | 'mL/min') => void;
  onReset: () => void;
}

export function SimulationControls({
  radiusMm,
  lengthCm,
  viscosityCp,
  pressureMmHg,
  density,
  flowUnit,
  onChangeRadius,
  onChangeLength,
  onChangeViscosity,
  onChangePressure,
  onChangeDensity,
  onChangeFlowUnit,
  onReset,
}: ControlsProps) {
  return (
    <div id="simulator" className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span>⚙</span> Hemodynamic Parameters
          </h2>
          <p className="text-[11px] text-slate-400">Adjust vessel and fluid physical variables</p>
        </div>
        <button
          onClick={onReset}
          className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-all hover:text-cyan-300"
        >
          RESET PARAMS
        </button>
      </div>

      <div className="space-y-5">
        {/* Vessel Radius (r) */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="radius-input" className="text-xs font-bold text-slate-200 tracking-wide">
              VESSEL RADIUS (r)
            </label>
            <div className="flex items-center space-x-1">
              <input
                id="radius-input"
                type="number"
                step="0.1"
                min={PARAM_LIMITS.radius.min}
                max={PARAM_LIMITS.radius.max}
                value={radiusMm}
                onChange={(e) => onChangeRadius(clamp(parseFloat(e.target.value), PARAM_LIMITS.radius.min, PARAM_LIMITS.radius.max))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-xs font-mono text-slate-400">mm</span>
            </div>
          </div>
          <input
            type="range"
            min={PARAM_LIMITS.radius.min}
            max={PARAM_LIMITS.radius.max}
            step={0.1}
            value={radiusMm}
            onChange={(e) => onChangeRadius(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>{PARAM_LIMITS.radius.min} mm</span>
            <span className="text-rose-400 font-semibold">Q ∝ r⁴ (Dominant Variable)</span>
            <span>{PARAM_LIMITS.radius.max} mm</span>
          </div>
        </div>

        {/* Vessel Length (L) */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="length-input" className="text-xs font-bold text-slate-200 tracking-wide">
              VESSEL LENGTH (L)
            </label>
            <div className="flex items-center space-x-1">
              <input
                id="length-input"
                type="number"
                step="1"
                min={PARAM_LIMITS.length.min}
                max={PARAM_LIMITS.length.max}
                value={lengthCm}
                onChange={(e) => onChangeLength(clamp(parseFloat(e.target.value), PARAM_LIMITS.length.min, PARAM_LIMITS.length.max))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-xs font-mono text-slate-400">cm</span>
            </div>
          </div>
          <input
            type="range"
            min={PARAM_LIMITS.length.min}
            max={PARAM_LIMITS.length.max}
            step={1}
            value={lengthCm}
            onChange={(e) => onChangeLength(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>{PARAM_LIMITS.length.min} cm</span>
            <span>{PARAM_LIMITS.length.max} cm</span>
          </div>
        </div>

        {/* Blood Viscosity (η) */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="viscosity-input" className="text-xs font-bold text-slate-200 tracking-wide">
              BLOOD VISCOSITY (η)
            </label>
            <div className="flex items-center space-x-1">
              <input
                id="viscosity-input"
                type="number"
                step="0.1"
                min={PARAM_LIMITS.viscosity.min}
                max={PARAM_LIMITS.viscosity.max}
                value={viscosityCp}
                onChange={(e) => onChangeViscosity(clamp(parseFloat(e.target.value), PARAM_LIMITS.viscosity.min, PARAM_LIMITS.viscosity.max))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-xs font-mono text-slate-400">cP</span>
            </div>
          </div>
          <input
            type="range"
            min={PARAM_LIMITS.viscosity.min}
            max={PARAM_LIMITS.viscosity.max}
            step={0.1}
            value={viscosityCp}
            onChange={(e) => onChangeViscosity(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>{PARAM_LIMITS.viscosity.min} cP (Anemia)</span>
            <span>{PARAM_LIMITS.viscosity.max} cP (Polycythemia)</span>
          </div>
        </div>

        {/* Pressure Difference (ΔP) */}
        <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="pressure-input" className="text-xs font-bold text-slate-200 tracking-wide">
              PRESSURE DIFFERENCE (ΔP)
            </label>
            <div className="flex items-center space-x-1">
              <input
                id="pressure-input"
                type="number"
                step="0.1"
                min={PARAM_LIMITS.pressureDiff.min}
                max={PARAM_LIMITS.pressureDiff.max}
                value={pressureMmHg}
                onChange={(e) => onChangePressure(clamp(parseFloat(e.target.value), PARAM_LIMITS.pressureDiff.min, PARAM_LIMITS.pressureDiff.max))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <span className="text-xs font-mono text-slate-400">mmHg</span>
            </div>
          </div>
          <input
            type="range"
            min={PARAM_LIMITS.pressureDiff.min}
            max={PARAM_LIMITS.pressureDiff.max}
            step={0.1}
            value={pressureMmHg}
            onChange={(e) => onChangePressure(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>{PARAM_LIMITS.pressureDiff.min} mmHg</span>
            <span>{PARAM_LIMITS.pressureDiff.max} mmHg</span>
          </div>
        </div>
      </div>

      {/* Advanced Fluid Properties */}
      <details className="border-t border-slate-800 pt-3 text-xs text-slate-400 group">
        <summary className="cursor-pointer font-mono text-[11px] hover:text-cyan-400 flex items-center justify-between">
          <span>ADVANCED FLUID SETTINGS</span>
          <span className="group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="space-y-3 pt-3 pl-1">
          <div className="flex justify-between items-center">
            <span className="text-[11px]">Blood Density (ρ):</span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={density}
                onChange={(e) => onChangeDensity(clamp(parseFloat(e.target.value), 1000, 1100))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right text-white font-mono text-xs"
              />
              <span className="text-[10px] font-mono text-slate-500">kg/m³</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px]">Flow Unit Display:</span>
            <select
              value={flowUnit}
              onChange={(e) => onChangeFlowUnit(e.target.value as 'mL/s' | 'mL/min')}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-white font-mono"
            >
              <option value="mL/s">mL/s</option>
              <option value="mL/min">mL/min</option>
            </select>
          </div>
        </div>
      </details>
    </div>
  );
}
