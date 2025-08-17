export function createProfileCard(name, role) {
  const card = document.createElement('div');
  card.className = 'profile-card';

  const h3 = document.createElement('h3');
  h3.textContent = name;

  const p = document.createElement('p');
  p.innerHTML = `Role: <span class="badge">${role}</span>`;

  const remove = document.createElement('button');
  remove.className = 'btn secondary';
  remove.textContent = 'Remove';
  remove.addEventListener('click', () => card.remove());

  card.append(h3, p, remove);
  return card;
}
