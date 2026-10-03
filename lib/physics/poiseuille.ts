export interface PoiseuilleParams {
  radiusMm: number;
  lengthCm: number;
  viscosityCp: number;
  pressureMmHg: number;
  density: number;
}

export interface PhysicsResult {
  flowRateM3s: number;
  velocity: number;
  reynoldsNumber: number;
  shearStress: number;
  resistance: number;
  regime: 'LAMINAR' | 'TRANSITIONAL' | 'TURBULENT';
}

export function calculatePoiseuille({
  radiusMm,
  lengthCm,
  viscosityCp,
  pressureMmHg,
  density,
}: PoiseuilleParams): PhysicsResult {
  // Convert inputs to SI units
  const radius = radiusMm * 1e-3; // meters
  const length = lengthCm * 1e-2; // meters
  const viscosity = viscosityCp * 1e-3; // Pa·s
  const pressureDiff = pressureMmHg * 133.322; // Pascals

  // Hagen-Poiseuille Flow Rate: Q = (π * r^4 * ΔP) / (8 * η * L)
  const flowRateM3s =
    (Math.PI * Math.pow(radius, 4) * pressureDiff) / (8 * viscosity * length);

  // Mean Velocity: v = Q / (π * r^2)
  const area = Math.PI * Math.pow(radius, 2);
  const velocity = flowRateM3s / area;

  // Hydraulic Resistance: R = (8 * η * L) / (π * r^4)
  const resistance = (8 * viscosity * length) / (Math.PI * Math.pow(radius, 4));

  // Wall Shear Stress: τ = (r * ΔP) / (2 * L)
  const shearStress = (radius * pressureDiff) / (2 * length);

  // Reynolds Number: Re = (ρ * v * D) / η
  const diameter = 2 * radius;
  const reynoldsNumber = (density * velocity * diameter) / viscosity;

  // Flow Regime Categorization
  let regime: 'LAMINAR' | 'TRANSITIONAL' | 'TURBULENT' = 'LAMINAR';
  if (reynoldsNumber > 4000) {
    regime = 'TURBULENT';
  } else if (reynoldsNumber >= 2000) {
    regime = 'TRANSITIONAL';
  }

  return {
    flowRateM3s,
    velocity,
    reynoldsNumber,
    shearStress,
    resistance,
    regime,
  };
}
