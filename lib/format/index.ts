export function formatScientific(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) >= 0.01 && Math.abs(num) < 100000) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return num.toExponential(3);
}
