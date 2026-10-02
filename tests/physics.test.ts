import { describe, it, expect } from 'vitest';
import { calculatePoiseuille } from '../lib/physics/poiseuille';
import { mmToMeters, cmToMeters, cPToPas, mmHgToPascal } from '../lib/units';

describe('Poiseuille Physics Invariants', () => {
  it('satisfies Q ∝ r⁴ invariant (r = 2mm -> 4mm produces exact 16x flow)', () => {
    const baseParams = {
      length: cmToMeters(20),
      viscosity: cPToPas(3.5),
      pressureDiff: mmHgToPascal(2),
    };

    const res2mm = calculatePoiseuille({ ...baseParams, radius: mmToMeters(2) });
    const res4mm = calculatePoiseuille({ ...baseParams, radius: mmToMeters(4) });

    const ratio = res4mm.flowRate / res2mm.flowRate;
    expect(ratio).toBeCloseTo(16.0, 5);
  });
});
