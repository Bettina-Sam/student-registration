// Simple client-side "API" using localStorage to mimic CRUD

const LS_KEY = "day9_students";

const $ = (sel) => document.querySelector(sel);
const tbody = $("#tbody");
const count = $("#count");
const form = $("#studentForm");
const formTitle = $("#formTitle");
const submitBtn = $("#submitBtn");
const cancelEdit = $("#cancelEdit");
const editId = $("#editId");
const nameIn = $("#name");
const rollIn = $("#rollNo");
const deptIn = $("#department");
const marksIn = $("#marks");
const msg = $("#message");
const search = $("#search");

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getStudents() {
  const raw = localStorage.getItem(LS_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStudents(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function seedIfEmpty() {
  const list = getStudents();
  if (list.length === 0) {
    setStudents([
      { _id: uid(), name: "Anu", rollNo: "22IT001", department: "IT", marks: 88, createdAt: Date.now() },
      { _id: uid(), name: "Bala", rollNo: "22IT002", department: "CSE", marks: 76, createdAt: Date.now() - 10000 },
      { _id: uid(), name: "Chitra", rollNo: "22IT003", department: "ECE", marks: 91, createdAt: Date.now() - 20000 }
    ]);
  }
}

function render(filter = "") {
  const list = getStudents()
    .sort((a,b) => b.createdAt - a.createdAt)
    .filter(s => {
      if (!filter) return true;
      const f = filter.toLowerCase();
      return (
        s.name.toLowerCase().includes(f) ||
        s.rollNo.toLowerCase().includes(f) ||
        s.department.toLowerCase().includes(f)
      );
    });

  count.textContent = `(${list.length})`;
  tbody.innerHTML = "";
  for (const s of list) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHTML(s.name)}</td>
      <td>${escapeHTML(s.rollNo)}</td>
      <td>${escapeHTML(s.department)}</td>
      <td>${Number(s.marks)}</td>
      <td class="actionsCell">
        <button class="btn warn" data-edit="${s._id}">Edit</button>
        <button class="btn danger" data-del="${s._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showMessage(text, ok = true) {
  msg.innerHTML = `<div class="alert ${ok ? "ok" : "err"}">${escapeHTML(text)}</div>`;
  setTimeout(() => (msg.innerHTML = ""), 2200);
}

function resetForm() {
  editId.value = "";
  formTitle.textContent = "Add Student";
  submitBtn.textContent = "Add";
  cancelEdit.hidden = true;
  rollIn.disabled = false;
  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    name: nameIn.value.trim(),
    rollNo: rollIn.value.trim(),
    department: deptIn.value.trim(),
    marks: Number(marksIn.value)
  };

  if (!payload.name || !payload.rollNo || !payload.department || isNaN(payload.marks)) {
    showMessage("Please fill all fields correctly.", false);
    return;
  }
  if (payload.marks < 0 || payload.marks > 100) {
    showMessage("Marks must be between 0 and 100.", false);
    return;
  }

  const list = getStudents();

  if (editId.value) {
    // update (rollNo is fixed like in real app)
    const id = editId.value;
    const idx = list.findIndex(s => s._id === id);
    if (idx === -1) return showMessage("Student not found.", false);
    list[idx] = { ...list[idx], ...payload };
    setStudents(list);
    showMessage("Student updated.");
    resetForm();
    render(search.value);
  } else {
    // create (enforce unique rollNo)
    if (list.some(s => s.rollNo.toLowerCase() === payload.rollNo.toLowerCase())) {
      showMessage("Duplicate Roll No. Please use a unique value.", false);
      return;
    }
    const created = { _id: uid(), ...payload, createdAt: Date.now() };
    setStudents([created, ...list]);
    showMessage("Student added.");
    form.reset();
    render(search.value);
  }
});

cancelEdit.addEventListener("click", resetForm);

tbody.addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches("[data-edit]")) {
    const id = t.getAttribute("data-edit");
    const list = getStudents();
    const s = list.find(x => x._id === id);
    if (!s) return;
    editId.value = s._id;
    nameIn.value = s.name;
    rollIn.value = s.rollNo;
    rollIn.disabled = true; // mimic backend behavior
    deptIn.value = s.department;
    marksIn.value = s.marks;
    formTitle.textContent = "Update Student";
    submitBtn.textContent = "Update";
    cancelEdit.hidden = false;
    nameIn.focus();
  }
  if (t.matches("[data-del]")) {
    const id = t.getAttribute("data-del");
    const list = getStudents();
    const s = list.find(x => x._id === id);
    if (!s) return;
    if (confirm(`Delete ${s.name} (${s.rollNo})?`)) {
      setStudents(list.filter(x => x._id !== id));
      showMessage("Student deleted.");
      if (editId.value === id) resetForm();
      render(search.value);
    }
  }
});

search.addEventListener("input", () => render(search.value));

// init
seedIfEmpty();
render();
