// logic
import { isAuth } from "../modules/authentication.js";

// element
import { navbar, updateProgressbar } from "../components/navbar.js";


export async function rulesPage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      window.location.hash = '#/login'
    }
    // clear
    app.innerHTML = ''

    // Background Cover
    const backgroundCover = document.createElement('div');
    backgroundCover.classList.add('background-cover', 'rules-page-cover');
    app.appendChild(backgroundCover);

    // navbar
    const _navbar = navbar('rules')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page','rules-page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'RULES'
    title.classList.add('title')
    page.appendChild(title)
  }
  catch (err) {
    console.error("[ERROR] rulesPage", err)
  }
}