// Simple front-end validation
document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Elements
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const dept = document.getElementById('dept');
  const year = document.getElementById('year');
  const title = document.getElementById('title');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const deptError = document.getElementById('deptError');
  const yearError = document.getElementById('yearError');
  const titleError = document.getElementById('titleError');

  // Reset errors
  [nameError, emailError, deptError, yearError, titleError].forEach(el => el.textContent = '');

  // Trimmed values
  const vName = name.value.trim();
  const vEmail = email.value.trim();
  const vDept = dept.value.trim();
  const vYear = year.value.trim();
  const vTitle = title.value.trim();

  let valid = true;

  // Required checks
  if (!vName) { nameError.textContent = 'Name is required.'; valid = false; }
  if (!vEmail) { emailError.textContent = 'Email is required.'; valid = false; }
  if (!vDept) { deptError.textContent = 'Please select a department.'; valid = false; }
  if (!vYear) { yearError.textContent = 'Please select your year.'; valid = false; }
  if (!vTitle) { titleError.textContent = 'Project title is required.'; valid = false; }

  // Email format (simple pattern)
  const emailPattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  if (vEmail && !emailPattern.test(vEmail)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (valid) {
    alert('Registration Successful');
    // Optionally reset
    // this.reset();
  }
});
