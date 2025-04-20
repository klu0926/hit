import { login } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { notification } from "../modules/notification.js";

// element
import { backgroundCover } from "../components/backgroundCover.js";
import { setRoute } from "../../utils/setRoute.js";

let _loginPage
let form

export function loginPage(app) {
  // player already login, return to game page
  const player = isAuth()
  if (player) {
    setRoute('#/agents')
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
  const title = document.createElement('h2');
  title.innerText = 'Access Connection';
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
  nameInput.placeholder = 'Codename';
  nameInput.required = true;
  form.appendChild(nameInput);

  // Password input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.placeholder = 'Access Key';
  passwordInput.required = true;
  form.appendChild(passwordInput);

  // Login button
  const loginBtn = document.createElement('button');
  loginBtn.id = 'loginBtn';
  loginBtn.innerText = 'Authentication';
  form.appendChild(loginBtn);

  // Create account link + button
  const createLink = document.createElement('a');
  createLink.href = '/#/create';
  createLink.innerText = 'Register Credential'
  _loginPage.appendChild(createLink)


  // Event
  // on login button pressed
  document.getElementById('loginBtn').addEventListener('click', async (e) => {
    try {
      e.preventDefault()
      const name = document.querySelector('#name').value
      const password = document.querySelector('#password').value

      if (name.trim() === '' || password.trim() === '') {
        throw new Error('Missing codename or access key')
      }

      // login
      const res = await login(name, password)
      if (res.ok) {
        setRoute('#/agents')
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      console.error(err)
      notification(err.message)
    }
  });
}