'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SimulationControls } from '../components/controls/SimulationControls';
import { VesselVisualization } from '../components/visualization/VesselVisualization';
import { FlowChart } from '../components/visualization/FlowChart';
import { R4Demonstration } from '../components/visualization/R4Demonstration';
import { ResultsPanel } from '../components/results/ResultsPanel';
import { ScientificExplanation } from '../components/explanation/ScientificExplanation';
import { AssumptionsDisclaimer } from '../components/results/AssumptionsDisclaimer';
import { Footer } from '../components/Footer';

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
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* HERO HEADER SECTION */}
        <section className="bg-gradient-to-r from-[#0d1322] via-[#0f172a] to-[#0d1322] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-rose-950/80 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-mono text-rose-300">
              <span>●</span>
              <span>HEMODYNAMIC SIMULATION ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Biomedical Blood Flow Simulator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore how vessel radius, vessel length, fluid viscosity, and driving pressure gradient dynamically govern blood velocity, volumetric flow rate, and hydrodynamic wall shear stress.
            </p>
          </div>
        </section>

        {/* MAIN INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CONTROL PANEL */}
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

          {/* VISUALIZATION AND RESULTS */}
          <div className="lg:col-span-8 space-y-8">
            <VesselVisualization
              radiusMm={radiusMm}
              velocity={results.velocity}
              flowRateMls={flowRateMls}
              regime={results.regime}
            />

            <ResultsPanel
              results={results}
              flowUnit={flowUnit}
              flowValueFormatted={flowValueFormatted}
            />

            <FlowChart
              currentRadiusMm={radiusMm}
              lengthCm={lengthCm}
              viscosityCp={viscosityCp}
              pressureMmHg={pressureMmHg}
            />

            <R4Demonstration currentRadiusMm={radiusMm} />

            <ScientificExplanation />
          </div>
        </div>

        <AssumptionsDisclaimer />
      </main>

      <Footer />
    </div>
  );
}
