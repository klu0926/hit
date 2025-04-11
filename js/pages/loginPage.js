import { login } from "../api/reqresIn.js";

export function loginPage(app) {
  app.innerHTML = ''

  const loginForm = document.createElement('div');
  loginForm.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="name" placeholder="Enter your alias" required />
    <input type="password" id="password" placeholder="Enter your password" required />
    <button id="loginBtn">Login</button>
  `;

  app.appendChild(loginForm);


  // on login button pressed
  document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value

    if (name.trim() === '' || password.trim() === '') {
      alert('Missing name or password')
    }

    // login
    const res = await login(name, password)
    console.log(res.message)
  });
}