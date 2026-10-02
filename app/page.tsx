'use client';

import React, { useState, useMemo } from 'react';
import { SimulationControls } from '../components/controls/SimulationControls';
import { VesselVisualization } from '../components/visualization/VesselVisualization';
import { R4Demonstration } from '../components/visualization/R4Demonstration';
import { ResultsPanel } from '../components/results/ResultsPanel';
import { AssumptionsDisclaimer } from '../components/results/AssumptionsDisclaimer';

import { PARAM_LIMITS } from '../lib/validation';
import { calculatePoiseuille } from '../lib/physics/poiseuille';
import {
  mmToMeters,
  cmToMeters,
  cPToPas,
  mmHgToPascal,
  m3sToMls,
  m3sToMlmin,
} from '../lib/units';

export default function Home() {
  const [radiusMm, setRadiusMm] = useState(PARAM_LIMITS.radius.default);
  const [lengthCm, setLengthCm] = useState(PARAM_LIMITS.length.default);
  const [viscosityCp, setViscosityCp] = useState(PARAM_LIMITS.viscosity.default);
  const [pressureMmHg, setPressureMmHg] = useState(PARAM_LIMITS.pressureDiff.default);
  const [density, setDensity] = useState(PARAM_LIMITS.density.default);
  const [flowUnit, setFlowUnit] = useState<'mL/s' | 'mL/min'>('mL/s');

  const results = useMemo(() => {
    return calculatePoiseuille({
      radius: mmToMeters(radiusMm),
      length: cmToMeters(lengthCm),
      viscosity: cPToPas(viscosityCp),
      pressureDiff: mmHgToPascal(pressureMmHg),
      density,
    });
  }, [radiusMm, lengthCm, viscosityCp, pressureMmHg, density]);

  const flowRateMls = useMemo(() => m3sToMls(results.flowRate), [results.flowRate]);
  const flowValueFormatted = useMemo(() => {
    return flowUnit === 'mL/s' ? flowRateMls : m3sToMlmin(results.flowRate);
  }, [flowUnit, flowRateMls, results.flowRate]);

  const handleReset = () => {
    setRadiusMm(PARAM_LIMITS.radius.default);
    setLengthCm(PARAM_LIMITS.length.default);
    setViscosityCp(PARAM_LIMITS.viscosity.default);
    setPressureMmHg(PARAM_LIMITS.pressureDiff.default);
    setDensity(PARAM_LIMITS.density.default);
    setFlowUnit('mL/s');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-tight">
          Blood Flow Simulator
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Biomedical Engineering Educational Tool for Hemodynamics and Hagen–Poiseuille Law
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SimulationControls
            radiusMm={radiusMm}
            lengthCm={lengthCm}
            viscosityCp={viscosityCp}
            pressureMmHg={pressureMmHg}
            density={density}
            flowUnit={flowUnit}
            onChangeRadius={setRadiusMm}
            onChangeLength={setLengthCm}
            onChangeViscosity={setViscosityCp}
            onChangePressure={setPressureMmHg}
            onChangeDensity={setDensity}
            onChangeFlowUnit={setFlowUnit}
            onReset={handleReset}
          />
        </div>

        <div className="lg:col-span-8 space-y-8">
          <VesselVisualization
            radiusMm={radiusMm}
            velocity={results.velocity}
            flowRateMls={flowRateMls}
          />
          <ResultsPanel
            results={results}
            flowUnit={flowUnit}
            flowValueFormatted={flowValueFormatted}
          />
          <R4Demonstration currentRadiusMm={radiusMm} />
        </div>
      </div>

      <AssumptionsDisclaimer />
    </main>
  );
}
