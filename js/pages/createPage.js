import { createAccount } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { notification } from "../modules/notification.js";
import { login } from "../api/reqresIn.js";

let _createPage;
let form

export function createPage(app) {
  // Redirect if already logged in
  const player = isAuth();
  if (player) {
    window.location.hash = '#/agents';
    return;
  }

  // Clear 
  app.innerHTML = '';

  // Background Cover
  const backgroundCover = document.createElement('div');
  backgroundCover.classList.add('background-cover', 'create-page-cover');
  app.appendChild(backgroundCover);

  // Page
  _createPage = document.createElement('div');
  _createPage.classList.add('page', 'create-page');
  app.appendChild(_createPage);

  // Title
  const title = document.createElement('h2');
  title.textContent = 'CREATE';
  title.classList.add('title')
  _createPage.appendChild(title);

  // Form
  form = document.createElement('form');
  form.classList.add('create-form')
  form.id = 'createForm';
  form.noValidate = true;
  _createPage.appendChild(form);

  // Name Input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'newName';
  nameInput.placeholder = 'username';
  nameInput.required = true;
  form.appendChild(nameInput);


  // Password Input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'newPassword';
  passwordInput.placeholder = 'password';
  passwordInput.required = true;
  form.appendChild(passwordInput);


  // Submit Button
  const createBtn = document.createElement('button');
  createBtn.type = 'submit';
  createBtn.id = 'createBtn';
  createBtn.textContent = 'Create Account';
  form.appendChild(createBtn);


  // Create account link + button
  const loginLink = document.createElement('a');
  loginLink.href = '/#/login';
  loginLink.innerText = 'Login to Account'
  _createPage.appendChild(loginLink)

  // Event
  // Submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = nameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!name || !password) {
        throw new Error('Missing name or password');
      }

      const res = await createAccount(name, password);
      if (res.ok) {
        // login
        const res = await login(name, password)
        if (res.ok) {
          window.location.hash = '#/game'
        } else {
          throw new Error(res.message)
        }
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error(err);
      notification(`[CREATE ERROR] : ${err.message}`)
    }
  });
}



