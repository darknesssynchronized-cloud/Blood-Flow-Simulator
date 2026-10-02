export const PARAM_LIMITS = {
  radius: { min: 0.1, max: 15.0, default: 2.0 }, // mm
  length: { min: 1.0, max: 100.0, default: 20.0 }, // cm
  viscosity: { min: 1.0, max: 10.0, default: 3.5 }, // cP
  pressureDiff: { min: 0.1, max: 100.0, default: 2.0 }, // mmHg
  density: { min: 1000, max: 1100, default: 1060 }, // kg/m³
};

export function clamp(val: number, min: number, max: number): number {
  if (isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}
