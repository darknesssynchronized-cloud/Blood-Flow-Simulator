'use client';

import React from 'react';
import { PARAM_LIMITS, clamp } from '@/lib/validation';

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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-cyan-400">Simulation Controls</h2>
        <button
          onClick={onReset}
          className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
        >
          Reset Defaults
        </button>
      </div>

      <div className="space-y-4">
        {/* Radius */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label htmlFor="radius-slider" className="font-medium text-slate-300">
              Vessel Radius (r)
            </label>
            <span className="font-mono text-cyan-400">{radiusMm.toFixed(1)} mm</span>
          </div>
          <input
            id="radius-slider"
            type="range"
            min={PARAM_LIMITS.radius.min}
            max={PARAM_LIMITS.radius.max}
            step={0.1}
            value={radiusMm}
            onChange={(e) => onChangeRadius(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Length */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label htmlFor="length-slider" className="font-medium text-slate-300">
              Vessel Length (L)
            </label>
            <span className="font-mono text-cyan-400">{lengthCm.toFixed(1)} cm</span>
          </div>
          <input
            id="length-slider"
            type="range"
            min={PARAM_LIMITS.length.min}
            max={PARAM_LIMITS.length.max}
            step={1}
            value={lengthCm}
            onChange={(e) => onChangeLength(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Viscosity */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label htmlFor="viscosity-slider" className="font-medium text-slate-300">
              Blood Viscosity (μ)
            </label>
            <span className="font-mono text-cyan-400">{viscosityCp.toFixed(1)} cP</span>
          </div>
          <input
            id="viscosity-slider"
            type="range"
            min={PARAM_LIMITS.viscosity.min}
            max={PARAM_LIMITS.viscosity.max}
            step={0.1}
            value={viscosityCp}
            onChange={(e) => onChangeViscosity(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Pressure Difference */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label htmlFor="pressure-slider" className="font-medium text-slate-300">
              Pressure Difference (ΔP)
            </label>
            <span className="font-mono text-cyan-400">{pressureMmHg.toFixed(1)} mmHg</span>
          </div>
          <input
            id="pressure-slider"
            type="range"
            min={PARAM_LIMITS.pressureDiff.min}
            max={PARAM_LIMITS.pressureDiff.max}
            step={0.1}
            value={pressureMmHg}
            onChange={(e) => onChangePressure(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Advanced Settings */}
      <details className="border-t border-slate-800 pt-4 text-xs text-slate-400">
        <summary className="cursor-pointer font-medium hover:text-slate-300 mb-3">Advanced Settings</summary>
        <div className="space-y-3 pl-2">
          <div className="flex justify-between items-center">
            <span>Blood Density (ρ):</span>
            <input
              type="number"
              value={density}
              onChange={(e) => onChangeDensity(clamp(parseFloat(e.target.value), 1000, 1100))}
              className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-right text-white font-mono"
            />
            <span className="ml-1">kg/m³</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Flow Unit Display:</span>
            <select
              value={flowUnit}
              onChange={(e) => onChangeFlowUnit(e.target.value as 'mL/s' | 'mL/min')}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
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
