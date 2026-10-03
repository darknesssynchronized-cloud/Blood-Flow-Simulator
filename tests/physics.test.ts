import { calculatePoiseuille } from '../lib/physics/poiseuille';

function testPhysics() {
  const res = calculatePoiseuille({
    radius: 0.002,
    length: 0.2,
    viscosity: 0.0035,
    pressureDiff: 266.644,
  });

  console.assert(res.flowRate > 0, 'Flow rate should be greater than zero');
  console.assert(res.isLaminar === true, 'Flow should be laminar under default parameters');
  console.log('Physics tests passed!');
}

testPhysics();
