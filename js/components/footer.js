// logic 
import { logout } from "../api/reqresIn.js";

// Elements
let _footer

export function footer() {
  _footer = document.createElement('div')
  _footer.classList.add('footer')

  _footer.innerHTML = `
    <p>&copy; 2025 H.I.T. — Hunt • Infiltrate • Terminate. All rights reserved.</p>
`

  // logout
  const logout = document.createElement('span')
  logout.id = 'logout'
  logout.innerText = 'Logout'
  _footer.append(logout)


  // Event
  logout.addEventListener('click', onLogoutClick)

  return _footer
}


function onLogoutClick() {
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
}