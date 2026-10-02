import { describe, it, expect } from 'vitest';
import {
  mmToMeters,
  metersToMm,
  cmToMeters,
  cPToPas,
  mmHgToPascal,
  m3sToMls,
} from '../lib/units';

describe('Unit Conversions', () => {
  it('converts mm to meters and back', () => {
    expect(mmToMeters(2)).toBe(0.002);
    expect(metersToMm(0.002)).toBe(2);
  });

  it('converts cm to meters', () => {
    expect(cmToMeters(20)).toBe(0.2);
  });

  it('converts cP to Pa·s', () => {
    expect(cPToPas(3.5)).toBe(0.0035);
  });

  it('converts mmHg to Pascal', () => {
    expect(mmHgToPascal(1)).toBeCloseTo(133.322, 2);
  });

  it('converts m3/s to mL/s', () => {
    expect(m3sToMls(0.000001)).toBe(1);
  });
});
