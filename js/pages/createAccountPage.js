import { createAccount } from "../api/reqresIn.js";

export function createAccountPage(app) {
  app.innerHTML = '';

  const createForm = document.createElement('div');
  createForm.innerHTML = `
    <h2>Create Account</h2>
    <input type="text" id="newName" placeholder="Enter your alias" required />
    <input type="password" id="newPassword" placeholder="Enter your password" required />
    <button id="createBtn">Create Account</button>
  `;

  app.appendChild(createForm);

  document.getElementById('createBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#newName').value;
    const password = document.querySelector('#newPassword').value;

    if (name.trim() === '' || password.trim() === '') {
      alert('Missing name or password');
      return;
    }

    const res = await createAccount(name, password);
    console.log(res.message);
  });
}
