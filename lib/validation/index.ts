export const PARAM_LIMITS = {
  radius: { min: 0.1, max: 15.0 },
  length: { min: 1.0, max: 50.0 },
  viscosity: { min: 1.0, max: 10.0 },
  pressureDiff: { min: 1.0, max: 100.0 },
};

export function clamp(val: number, min: number, max: number): number {
  if (Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}
