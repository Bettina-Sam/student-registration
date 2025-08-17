import greet, { add, multiply } from './mathUtils.js';

const lines = [
  greet('StudentHub'),
  `add(2, 3) = ${add(2, 3)}`,
  `multiply(4, 5) = ${multiply(4, 5)}`
];
document.getElementById('results').innerHTML =
  `<ul>${lines.map(s => `<li>${s}</li>`).join('')}</ul>`;
