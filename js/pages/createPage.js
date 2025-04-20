// logic
import { createAccount } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { notification } from "../modules/notification.js";
import { login } from "../api/reqresIn.js";
import { setRoute } from "../../utils/setRoute.js";

// element
import { backgroundCover } from "../components/backgroundCover.js"


let _createPage;
let form

export function createPage(app) {
  // Redirect if already logged in
  const player = isAuth();
  if (player) {
    setRoute('#/agents')
    return;
  }

  // Clear 
  app.innerHTML = '';

  // Background Cover
  const _backgroundCover = backgroundCover('create')
  app.appendChild(_backgroundCover);

  // Page
  _createPage = document.createElement('div');
  _createPage.classList.add('page', 'create-page');
  app.appendChild(_createPage);

  // Title
  const title = document.createElement('h2');
  title.textContent = 'New Credential';
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
  nameInput.placeholder = 'Codename';
  nameInput.required = true;
  form.appendChild(nameInput);


  // Password Input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'newPassword';
  passwordInput.placeholder = 'Access Key';
  passwordInput.required = true;
  form.appendChild(passwordInput);


  // Submit Button
  const createBtn = document.createElement('button');
  createBtn.type = 'submit';
  createBtn.id = 'createBtn';
  createBtn.textContent = 'Register';
  form.appendChild(createBtn);


  // Create account link + button
  const loginLink = document.createElement('a');
  loginLink.href = '/#/login';
  loginLink.innerText = 'Access Network'
  _createPage.appendChild(loginLink)

  // Event
  // Submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const name = nameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!name || !password) {
        throw new Error('Missing codename or access key');
      }

      const res = await createAccount(name, password);
      if (res.ok) {
        // login
        const res = await login(name, password)
        if (res.ok) {
          setRoute('#/agents')
        } else {
          throw new Error(res.message)
        }
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error(err);
      notification(err.message)
    }
  });
}



