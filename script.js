const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

document.addEventListener('DOMContentLoaded', () => {
  const shown = sessionStorage.getItem('welcome_shown');
  if (!shown) {
    alert('Welcome! Explore the animations and try the buttons ✨');
    sessionStorage.setItem('welcome_shown', '1');
  }

  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  populateSelect('#dept', ['IT','CSE','ECE','EEE','CIVIL','MECH']);
  populateSelect('#year', ['I','II','III','IV']);

  const btn = document.getElementById('btnClickMe');
  const hero = document.getElementById('hero');
  if (btn && hero) {
    btn.addEventListener('click', () => {
      hero.style.background = randomSoftGradient();
      const title = hero.querySelector('.title');
      if (title) title.textContent = 'Nice! You just changed the look 🎉';
      hero.classList.toggle('pulse');
      setTimeout(() => hero.classList.remove('pulse'), 500);
    });
  }

  const regForm = document.getElementById('registrationForm');
  if (regForm) regForm.addEventListener('submit', handleRegistrationSubmit);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
});

function populateSelect(selector, items) {
  const el = document.querySelector(selector);
  if (!el) return;
  items.forEach((val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    el.appendChild(opt);
  });
}

function validateEmail(email) {
  const pattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
}

function randomSoftGradient() {
  const colors = ['#e0f2fe','#ffe4e6','#e9d5ff','#dcfce7','#fef9c3','#ede9fe','#fae8ff'];
  const a = colors[Math.floor(Math.random()*colors.length)];
  const b = colors[Math.floor(Math.random()*colors.length)];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const name = $('#name');
  const email = $('#email');
  const dept = $('#dept');
  const year = $('#year');
  const title = $('#title');

  const nameError = $('#nameError');
  const emailError = $('#emailError');
  const deptError = $('#deptError');
  const yearError = $('#yearError');
  const titleError = $('#titleError');

  [nameError, emailError, deptError, yearError, titleError].forEach(el => el.textContent = '');

  let valid = true;

  if (!name.value.trim()) { nameError.textContent = 'Name is required.'; valid = false; }
  if (!email.value.trim()) { emailError.textContent = 'Email is required.'; valid = false; }
  if (email.value && !validateEmail(email.value.trim())) { emailError.textContent = 'Please enter a valid email.'; valid = false; }
  if (!dept.value.trim()) { deptError.textContent = 'Select a department.'; valid = false; }
  if (!year.value.trim()) { yearError.textContent = 'Select your year.'; valid = false; }
  if (!title.value.trim()) { titleError.textContent = 'Project title is required.'; valid = false; }

  if (valid) {
    alert('Registration Successful');
    // e.target.reset();
  }
}

function handleContactSubmit(e) {
  e.preventDefault();

  const cname = $('#cname');
  const cemail = $('#cemail');
  const cmessage = $('#cmessage');

  const cnameError = $('#cnameError');
  const cemailError = $('#cemailError');
  const cmessageError = $('#cmessageError');

  [cnameError, cemailError, cmessageError].forEach(el => el.textContent = '');

  let valid = true;
  if (!cname.value.trim()) { cnameError.textContent = 'Name is required.'; valid = false; }
  if (!cemail.value.trim()) { cemailError.textContent = 'Email is required.'; valid = false; }
  if (cemail.value && !validateEmail(cemail.value.trim())) { cemailError.textContent = 'Enter a valid email.'; valid = false; }
  if (!cmessage.value.trim() || cmessage.value.trim().length < 10) { cmessageError.textContent = 'Please write at least 10 characters.'; valid = false; }

  if (valid) {
    const thanks = $('#contactThanks');
    if (thanks) {
      thanks.classList.remove('hidden');
      thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    e.target.reset();
  }
}
