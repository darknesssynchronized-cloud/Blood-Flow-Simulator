export interface PhysicsInput {
  radius: number;       // meters
  length: number;       // meters
  viscosity: number;    // Pa*s
  pressureDiff: number; // Pascals
  density?: number;     // kg/m^3
}

export type FlowRegime = 'LAMINAR' | 'TRANSITIONAL' | 'TURBULENT';

export interface PhysicsResult {
  flowRate: number;        // m^3/s
  resistance: number;      // Pa*s/m^3
  velocity: number;        // m/s
  shearStress: number;     // Pa
  reynoldsNumber: number;  // Dimensionless
  regime: FlowRegime;
  r4Multiplier: number;
}

export const DEFAULT_DENSITY = 1060; // kg/m^3 (Human Blood)

export function calculatePoiseuille(input: PhysicsInput): PhysicsResult {
  const { radius, length, viscosity, pressureDiff, density = DEFAULT_DENSITY } = input;

  if (radius <= 0 || length <= 0 || viscosity <= 0 || pressureDiff <= 0) {
    return {
      flowRate: 0,
      resistance: 0,
      velocity: 0,
      shearStress: 0,
      reynoldsNumber: 0,
      regime: 'LAMINAR',
      r4Multiplier: 0,
    };
  }

  // Q = (PI * r^4 * ΔP) / (8 * η * L)
  const flowRate = (Math.PI * Math.pow(radius, 4) * pressureDiff) / (8 * viscosity * length);
  
  // R = (8 * η * L) / (PI * r^4)
  const resistance = (8 * viscosity * length) / (Math.PI * Math.pow(radius, 4));
  
  // v = Q / A = Q / (PI * r^2)
  const area = Math.PI * Math.pow(radius, 2);
  const velocity = flowRate / area;
  
  // τ = (4 * η * Q) / (PI * r^3) = (r * ΔP) / (2 * L)
  const shearStress = (r * pressureDiff) / (2 * length);
  
  // Re = (ρ * v * D) / η
  const diameter = 2 * radius;
  const reynoldsNumber = (density * velocity * diameter) / viscosity;

  let regime: FlowRegime = 'LAMINAR';
  if (reynoldsNumber >= 2000 && reynoldsNumber <= 4000) {
    regime = 'TRANSITIONAL';
  } else if (reynoldsNumber > 4000) {
    regime = 'TURBULENT';
  }

  return {
    flowRate,
    resistance,
    velocity,
    shearStress,
    reynoldsNumber,
    regime,
    r4Multiplier: Math.pow(radius / 0.002, 4),
  };
}
