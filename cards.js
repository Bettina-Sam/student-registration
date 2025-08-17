const createBtn = document.getElementById('createCardBtn');
const clearBtn  = document.getElementById('clearAllBtn');
const container = document.getElementById('cardContainer');

let counter = 1;

createBtn.addEventListener('click', () => {
  const card = document.createElement('div');
  card.className = 'profile-card';

  const title = document.createElement('h3');
  title.textContent = `Card #${counter++}`;

  const meta = document.createElement('p');
  meta.className = 'small';
  meta.textContent = 'Created via DOM API: createElement + appendChild';

  const del = document.createElement('button');
  del.className = 'btn secondary';
  del.textContent = 'Delete';
  del.addEventListener('click', () => card.remove());

  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(del);

  container.appendChild(card);
});

clearBtn.addEventListener('click', () => {
  container.innerHTML = '';
  counter = 1;
});
