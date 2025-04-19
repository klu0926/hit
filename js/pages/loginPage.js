import { login } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { notification } from "../modules/notification.js";

// element
import { backgroundCover } from "../components/backgroundCover.js";

let _loginPage
let form

export function loginPage(app) {
  // player already login, return to game page
  const player = isAuth()
  if (player) {
    window.location.hash = '#/agents'
  }

  // Page Render
  app.innerHTML = ''

  // Background Cover
  const _backgroundCover = backgroundCover('login')
  app.appendChild(_backgroundCover);

  // Page
  _loginPage = document.createElement('div')
  _loginPage.classList.add('page', 'login-page')
  app.appendChild(_loginPage)

  // Title
  const title = document.createElement('h1');
  title.innerText = 'LOGIN';
  title.classList.add('title')
  _loginPage.appendChild(title);

  // Form
  form = document.createElement('form');
  form.classList.add('login-form')
  form.noValidate = true;
  _loginPage.appendChild(form);

  // Name input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.placeholder = 'username';
  nameInput.required = true;
  form.appendChild(nameInput);

  // Password input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.placeholder = 'password';
  passwordInput.required = true;
  form.appendChild(passwordInput);

  // Login button
  const loginBtn = document.createElement('button');
  loginBtn.id = 'loginBtn';
  loginBtn.innerText = 'Login';
  form.appendChild(loginBtn);

  // Create account link + button
  const createLink = document.createElement('a');
  createLink.href = '/#/create';
  createLink.innerText = 'Create Account'
  _loginPage.appendChild(createLink)

  // Event
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
      console.error(err)
      notification(`[LOGIN ERROR] : ${err.message}`)
    }

  });
}