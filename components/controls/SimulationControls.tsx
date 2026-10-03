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
    <div className="bg-ink-900/90 border border-ink-800 rounded-2xl p-6 text-ink-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-ink-800/80 pb-4">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-accent-400 font-bold">
            Vessel Parameters
          </h2>
          <p className="text-sm text-ink-400 mt-0.5">Adjust hemodynamic variables in real-time</p>
        </div>
        <button
          onClick={onReset}
          className="px-3 py-1.5 whitespace-nowrap text-sm font-mono bg-ink-800 hover:bg-ink-700 text-ink-300 rounded-lg border border-ink-700/60 transition-all active:scale-95"
        >
          Reset Defaults
        </button>
      </div>

      <div className="space-y-5">
        {/* Vessel Radius */}
        <div className="bg-ink-950/60 border border-ink-800/60 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="radius-slider" className="font-semibold text-ink-200">
              Vessel Radius (<span className="italic font-serif">r</span>)
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="number"
                min={PARAM_LIMITS.radius.min}
                max={PARAM_LIMITS.radius.max}
                step={0.1}
                value={radiusMm}
                onChange={(e) => onChangeRadius(clamp(parseFloat(e.target.value), PARAM_LIMITS.radius.min, PARAM_LIMITS.radius.max))}
                className="w-20 bg-ink-900 border border-ink-700 rounded px-1.5 py-0.5 text-right text-accent-400 font-mono text-sm font-bold focus:outline-none focus:border-accent-500"
              />
              <span className="font-mono text-ink-400">mm</span>
            </div>
          </div>
          <input
            id="radius-slider"
            type="range"
            min={PARAM_LIMITS.radius.min}
            max={PARAM_LIMITS.radius.max}
            step={0.1}
            value={radiusMm}
            onChange={(e) => onChangeRadius(parseFloat(e.target.value))}
            className="w-full accent-accent-400 bg-ink-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-ink-400">
            <span>{PARAM_LIMITS.radius.min} mm</span>
            <span className="text-rose-400 font-semibold">Factor r⁴ Effect</span>
            <span>{PARAM_LIMITS.radius.max} mm</span>
          </div>
        </div>

        {/* Vessel Length */}
        <div className="bg-ink-950/60 border border-ink-800/60 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="length-slider" className="font-semibold text-ink-200">
              Vessel Length (<span className="italic font-serif">L</span>)
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="number"
                min={PARAM_LIMITS.length.min}
                max={PARAM_LIMITS.length.max}
                step={1}
                value={lengthCm}
                onChange={(e) => onChangeLength(clamp(parseFloat(e.target.value), PARAM_LIMITS.length.min, PARAM_LIMITS.length.max))}
                className="w-20 bg-ink-900 border border-ink-700 rounded px-1.5 py-0.5 text-right text-accent-400 font-mono text-sm font-bold focus:outline-none focus:border-accent-500"
              />
              <span className="font-mono text-ink-400">cm</span>
            </div>
          </div>
          <input
            id="length-slider"
            type="range"
            min={PARAM_LIMITS.length.min}
            max={PARAM_LIMITS.length.max}
            step={1}
            value={lengthCm}
            onChange={(e) => onChangeLength(parseFloat(e.target.value))}
            className="w-full accent-accent-400 bg-ink-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-ink-400">
            <span>{PARAM_LIMITS.length.min} cm</span>
            <span>{PARAM_LIMITS.length.max} cm</span>
          </div>
        </div>

        {/* Blood Viscosity */}
        <div className="bg-ink-950/60 border border-ink-800/60 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="viscosity-slider" className="font-semibold text-ink-200">
              Blood Viscosity (<span className="italic font-serif">μ</span>)
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="number"
                min={PARAM_LIMITS.viscosity.min}
                max={PARAM_LIMITS.viscosity.max}
                step={0.1}
                value={viscosityCp}
                onChange={(e) => onChangeViscosity(clamp(parseFloat(e.target.value), PARAM_LIMITS.viscosity.min, PARAM_LIMITS.viscosity.max))}
                className="w-20 bg-ink-900 border border-ink-700 rounded px-1.5 py-0.5 text-right text-accent-400 font-mono text-sm font-bold focus:outline-none focus:border-accent-500"
              />
              <span className="font-mono text-ink-400">cP</span>
            </div>
          </div>
          <input
            id="viscosity-slider"
            type="range"
            min={PARAM_LIMITS.viscosity.min}
            max={PARAM_LIMITS.viscosity.max}
            step={0.1}
            value={viscosityCp}
            onChange={(e) => onChangeViscosity(parseFloat(e.target.value))}
            className="w-full accent-accent-400 bg-ink-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-ink-400">
            <span>{PARAM_LIMITS.viscosity.min} cP (Plasma)</span>
            <span>{PARAM_LIMITS.viscosity.max} cP (High Hct)</span>
          </div>
        </div>

        {/* Pressure Difference */}
        <div className="bg-ink-950/60 border border-ink-800/60 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="pressure-slider" className="font-semibold text-ink-200">
              Pressure Difference (Δ<span className="italic font-serif">P</span>)
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="number"
                min={PARAM_LIMITS.pressureDiff.min}
                max={PARAM_LIMITS.pressureDiff.max}
                step={0.1}
                value={pressureMmHg}
                onChange={(e) => onChangePressure(clamp(parseFloat(e.target.value), PARAM_LIMITS.pressureDiff.min, PARAM_LIMITS.pressureDiff.max))}
                className="w-20 bg-ink-900 border border-ink-700 rounded px-1.5 py-0.5 text-right text-accent-400 font-mono text-sm font-bold focus:outline-none focus:border-accent-500"
              />
              <span className="font-mono text-ink-400">mmHg</span>
            </div>
          </div>
          <input
            id="pressure-slider"
            type="range"
            min={PARAM_LIMITS.pressureDiff.min}
            max={PARAM_LIMITS.pressureDiff.max}
            step={0.1}
            value={pressureMmHg}
            onChange={(e) => onChangePressure(parseFloat(e.target.value))}
            className="w-full accent-accent-400 bg-ink-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-ink-400">
            <span>{PARAM_LIMITS.pressureDiff.min} mmHg</span>
            <span>{PARAM_LIMITS.pressureDiff.max} mmHg</span>
          </div>
        </div>
      </div>

      {/* Advanced Configurations */}
      <details className="border-t border-ink-800/80 pt-3 text-sm text-ink-400">
        <summary className="cursor-pointer font-mono text-xs font-medium hover:text-ink-200 transition-colors select-none">
          ⚙ Advanced Properties
        </summary>
        <div className="mt-3 space-y-3 pl-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-ink-300">Fluid Density (ρ):</span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min={PARAM_LIMITS.density.min}
                max={PARAM_LIMITS.density.max}
                step={1}
                value={density}
                onChange={(e) => onChangeDensity(clamp(parseFloat(e.target.value), PARAM_LIMITS.density.min, PARAM_LIMITS.density.max))}
                className="w-20 bg-ink-950 border border-ink-700 rounded px-2 py-1 text-right text-accent-400 font-mono"
              />
              <span className="text-xs text-ink-400 font-mono">kg/m³</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-300">Flow Unit:</span>
            <select
              value={flowUnit}
              onChange={(e) => onChangeFlowUnit(e.target.value as 'mL/s' | 'mL/min')}
              className="bg-ink-950 border border-ink-700 rounded px-2 py-1 text-accent-400 font-mono"
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
