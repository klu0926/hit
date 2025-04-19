// logic 
import { logout } from "../api/reqresIn.js";


// Elements
import { musicToggleButton } from "../../utils/music.js";

import { callPromptMessage } from '../../utils/promptMessage.js'

let _footer

export function footer() {
  _footer = document.createElement('div')
  _footer.classList.add('footer')

  _footer.innerHTML = `
    <p>Hunt • Infiltrate • Terminate</p><p>&copy; 2025 H.I.T. — All rights reserved</p>
`

  // buttonsDivs 
  const buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('footer-buttons')
  _footer.appendChild(buttonsDiv)

  // logout
  const logout = document.createElement('button')
  logout.id = 'logout'
  logout.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>'
  buttonsDiv.append(logout)

  // music toggle
  const _musicToggleButton = musicToggleButton()
  buttonsDiv.append(_musicToggleButton)

  // Event
  logout.addEventListener('click', onLogoutClick)
  return _footer
}

async function onLogoutClick() {
  try {
    // prompt to logout
    const result = await callPromptMessage("Confirm system disconnect?")
    if (!result) return

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