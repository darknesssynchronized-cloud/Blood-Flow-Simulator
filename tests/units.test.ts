import { mmToMeters, cmToMeters, cPToPas, mmHgToPascal } from '../lib/units';

function testUnits() {
  console.assert(mmToMeters(1) === 0.001, '1mm = 0.001m');
  console.assert(cmToMeters(1) === 0.01, '1cm = 0.01m');
  console.assert(cPToPas(1) === 0.001, '1cP = 0.001 Pa.s');
  console.assert(Math.abs(mmHgToPascal(1) - 133.322) < 0.01, '1mmHg ~ 133.32Pa');
  console.log('Unit conversion tests passed!');
}

testUnits();
