import { createAccount } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";

export function createAccountPage(app) {
  // player already login, return to game page
  const player = isAuth()
  if (player) {
    window.location.hash = '#/game'
  }

  // Page Render
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
    try {
      e.preventDefault();
      const name = document.querySelector('#newName').value;
      const password = document.querySelector('#newPassword').value;

      if (name.trim() === '' || password.trim() === '') {
        throw new Error('Missing name or password');
      }

      const res = await createAccount(name, password);
      if (res.ok) {
        window.location.hash = '#/login'
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      alert(err.message)
    }

  });
}
