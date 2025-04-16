// logic
import { isAuth } from "../modules/authentication.js";

// element
import { navbar, updateProgressbar } from "../components/navbar.js";


export async function shopPage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      window.location.hash = '#/login'
    }
    // Page Sekeleton ---------------
    app.innerHTML = ''

    // navbar
    const _navbar = navbar('agents')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'SHOP'
    title.classList.add('title')
    page.appendChild(title)
  }
  catch (err) {
    console.error("[ERROR] shopPage", err)
  }
}