'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SimulationControls } from '../components/controls/SimulationControls';
import { VesselVisualization } from '../components/visualization/VesselVisualization';
import { RadiusFlowChart } from '../components/visualization/RadiusFlowChart';
import { ResultsPanel } from '../components/results/ResultsPanel';
import { ScientificTheory } from '../components/theory/ScientificTheory';
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="border-b border-slate-800/80 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>BIOMEDICAL ENGINEERING HEMODYNAMICS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
                Blood Flow Simulator
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Explore how vessel radius, length, blood viscosity, and pressure differences influence hemodynamic flow governed by the Hagen–Poiseuille law.
              </p>
            </div>
          </div>
        </section>

        <section id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
              reynoldsNumber={results.reynoldsNumber}
            />
            <ResultsPanel
              results={results}
              flowUnit={flowUnit}
              flowValueFormatted={flowValueFormatted}
            />
          </div>
        </section>

        <section id="visualization">
          <RadiusFlowChart
            currentRadiusMm={radiusMm}
            lengthCm={lengthCm}
            viscosityCp={viscosityCp}
            pressureMmHg={pressureMmHg}
          />
        </section>

        <ScientificTheory />
        <AssumptionsDisclaimer />
      </main>

      <footer id="about" className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p>Blood Flow Simulator — Biomedical Engineering Educational Tool</p>
          <p className="text-[11px] text-slate-600">Built with Next.js 14, TypeScript & HTML5 Canvas</p>
        </div>
      </footer>
    </div>
  );
}
