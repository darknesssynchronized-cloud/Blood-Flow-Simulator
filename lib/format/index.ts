export function formatScientific(num: number, digits = 3): string {
  if (num === 0 || !isFinite(num)) return '0';
  if (Math.abs(num) >= 1e4 || Math.abs(num) < 1e-3) {
    return num.toExponential(digits);
  }
  return num.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}
