'use client';

import React, { useState, useMemo } from 'react';
import { calculatePoiseuille } from '@/lib/physics/poiseuille';
import { mmToMeters, cmToMeters, cPToPas, mmHgToPascal, m3sToMls, m3sToMlmin } from '@/lib/units';
import { SimulationControls } from '@/components/controls/SimulationControls';
import { ResultsPanel } from '@/components/results/ResultsPanel';
import { VesselVisualization } from '@/components/visualization/VesselVisualization';
import { ScientificExplanation } from '@/components/explanation/ScientificExplanation';

export default function Page() {
  const [radiusMm, setRadiusMm] = useState(2.0);
  const [lengthCm, setLengthCm] = useState(10.0);
  const [viscosityCp, setViscosityCp] = useState(3.5);
  const [pressureMmHg, setPressureMmHg] = useState(10.0);
  const [density, setDensity] = useState(1060);
  const [flowUnit, setFlowUnit] = useState<'mL/s' | 'mL/min'>('mL/s');

  const results = useMemo(() => {
    return calculatePoiseuille({
      radius: mmToMeters(radiusMm),
      length: cmToMeters(lengthCm),
      viscosity: cPToPas(viscosityCp),
      pressureDiff: mmHgToPascal(pressureMmHg),
      density: density,
    });
  }, [radiusMm, lengthCm, viscosityCp, pressureMmHg, density]);

  const flowValueFormatted = useMemo(() => {
    return flowUnit === 'mL/s'
      ? m3sToMls(results.flowRateM3s)
      : m3sToMlmin(results.flowRateM3s);
  }, [results.flowRateM3s, flowUnit]);

  const handleReset = () => {
    setRadiusMm(2.0);
    setLengthCm(10.0);
    setViscosityCp(3.5);
    setPressureMmHg(10.0);
    setDensity(1060);
    setFlowUnit('mL/s');
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <span className="text-cyan-400">🩸</span> Hemodynamic Flow Simulator
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Interactive Hagen–Poiseuille fluid dynamics model & blood vessel visualizer
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

        <div className="lg:col-span-8 space-y-6">
          <ResultsPanel
            results={results}
            flowUnit={flowUnit}
            flowValueFormatted={flowValueFormatted}
          />
          <VesselVisualization
            radiusMm={radiusMm}
            velocity={results.velocity}
            flowRateMls={m3sToMls(results.flowRateM3s)}
            regime={results.regime}
          />
        </div>
      </div>

      <ScientificExplanation />
    </main>
  );
}
