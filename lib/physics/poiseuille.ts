export interface PhysicsInput {
  radius: number; // meters
  length: number; // meters
  viscosity: number; // Pa·s
  pressureDiff: number; // Pascals
  density?: number; // kg/m³
}

export interface PhysicsResult {
  flowRate: number; // m³/s
  resistance: number; // Pa·s/m³
  velocity: number; // m/s
  shearStress: number; // Pa
  reynoldsNumber: number; // dimensionless
  isLaminar: boolean;
  r4Multiplier: number;
}

export const DEFAULT_DENSITY = 1060;

export function calculatePoiseuille(input: PhysicsInput): PhysicsResult {
  const { radius, length, viscosity, pressureDiff, density = DEFAULT_DENSITY } = input;

  if (radius <= 0 || length <= 0 || viscosity <= 0 || pressureDiff <= 0) {
    return {
      flowRate: 0,
      resistance: 0,
      velocity: 0,
      shearStress: 0,
      reynoldsNumber: 0,
      isLaminar: true,
      r4Multiplier: 0,
    };
  }

  // Hagen-Poiseuille Law: Q = (π * r⁴ * ΔP) / (8 * μ * L)
  const flowRate = (Math.PI * Math.pow(radius, 4) * pressureDiff) / (8 * viscosity * length);
  const resistance = (8 * viscosity * length) / (Math.PI * Math.pow(radius, 4));
  const area = Math.PI * Math.pow(radius, 2);
  const velocity = flowRate / area;
  const shearStress = (4 * viscosity * flowRate) / (Math.PI * Math.pow(radius, 3));
  const diameter = 2 * radius;
  const reynoldsNumber = (density * velocity * diameter) / viscosity;

  return {
    flowRate,
    resistance,
    velocity,
    shearStress,
    reynoldsNumber,
    isLaminar: reynoldsNumber < 2000,
    r4Multiplier: Math.pow(radius / 0.002, 4),
  };
}
