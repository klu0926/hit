import { login } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";

export function loginPage(app) {
  // player already login, return to game page
  const player = isAuth()
  if (player) {
    window.location.hash = '#/agents'
  }

  // Page Render
  app.innerHTML = ''

  const loginForm = document.createElement('div');
  loginForm.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="name" placeholder="Enter your alias" required />
    <input type="password" id="password" placeholder="Enter your password" required />
    <button id="loginBtn">Login</button>
    <a href='/#/create'><button>Create Account</button></a>

  `;

  app.appendChild(loginForm);


  // on login button pressed
  document.getElementById('loginBtn').addEventListener('click', async (e) => {
    try {
      e.preventDefault()
      const name = document.querySelector('#name').value
      const password = document.querySelector('#password').value

      if (name.trim() === '' || password.trim() === '') {
        throw new Error('Missing name or password')
      }

      // login
      const res = await login(name, password)
      if (res.ok) {
        window.location.hash = '#/game'
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      alert(err.message)
    }

  });
}