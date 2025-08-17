import greet, { add, multiply } from './mathUtils.js';

const div = document.getElementById('results');
const msgs = [
  greet('StudentHub'),
  `add(2, 3) = ${add(2, 3)}`,
  `multiply(4, 5) = ${multiply(4, 5)}`
];

div.innerHTML = `<ul>${msgs.map(m => `<li>${m}</li>`).join('')}</ul>`;
