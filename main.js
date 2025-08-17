import { createProfileCard } from './profileCard.js';

const btn = document.getElementById('addProfileBtn');
const profiles = document.getElementById('profiles');

btn.addEventListener('click', () => {
  const name = prompt('Enter Name:');
  const role = prompt('Enter Role:');
  if (!name || !role) return;
  profiles.appendChild(createProfileCard(name.trim(), role.trim()));
});
