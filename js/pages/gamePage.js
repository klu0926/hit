import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";

export function gamePage(app) {
  // player is not login
  const plalyer = isAuth()
  if (!plalyer){
    window.location.hash = '#/login' 
  }

  // Page Render
  app.innerHTML = ''

  app.innerHTML = `
    <h2>Leaderboard</h2>
    <ul>
      <li>1. Lulu</li>
      <li>2. Pete</li>
      <li>3. Anna</li>
    </ul>
  `;

  const logoutBtn = document.createElement('button')
  logoutBtn.id = 'logout'
  logoutBtn.innerText = 'Logout'
  app.append(logoutBtn)


  logoutBtn.addEventListener('click', (e) => {
    try {
      const res = logout()
      if (res.ok) {
        window.location.hash = '#/login'
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      alert(err.message)
    }
  })
}