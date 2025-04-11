export function loginPage(app) {
  app.innerHTML = ''

  const loginForm = document.createElement('div');
  loginForm.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="username" placeholder="Enter your alias" />
    <button id="loginBtn">Login</button>
  `;

  app.appendChild(loginForm);

  // add validation later
  document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.hash = '#/leaderboard';
  });
}