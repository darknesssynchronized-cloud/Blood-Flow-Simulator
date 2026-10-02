// Length conversions
export const mmToMeters = (mm: number): number => mm * 1e-3;
export const metersToMm = (m: number): number => m * 1e3;

export const cmToMeters = (cm: number): number => cm * 1e-2;
export const metersToCm = (m: number): number => m * 1e2;

// Viscosity conversions (cP <-> Pa·s)
export const cPToPas = (cP: number): number => cP * 1e-3;
export const pasToCp = (pas: number): number => pas * 1e3;

// Pressure conversions (mmHg <-> Pa)
export const mmHgToPascal = (mmHg: number): number => mmHg * 133.322368;
export const pascalToMmHg = (pa: number): number => pa / 133.322368;

// Volumetric Flow Rate conversions (m³/s <-> mL/s, mL/min)
export const m3sToMls = (m3s: number): number => m3s * 1e6;
export const mlsToM3s = (mls: number): number => mls * 1e-6;

export const m3sToMlmin = (m3s: number): number => m3s * 6e7;
export const mlminToM3s = (mlmin: number): number => mlmin / 6e7;
