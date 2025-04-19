// logic
import { isAuth } from "../modules/authentication.js";

// element
import { navbar, updateProgressbar } from "../components/navbar.js";
import { backgroundCover } from "../components/backgroundCover.js";
import { footer } from "../components/footer.js";


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
    const _backgroundCover = backgroundCover('rules')
    app.appendChild(_backgroundCover);

    // navbar
    const _navbar = navbar('rules')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page', 'rules-page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'RULES'
    title.classList.add('title')
    page.appendChild(title)

    // footer 
    const _footer = footer()
    app.appendChild(_footer)
  }
  catch (err) {
    console.error("[ERROR] rulesPage", err)
  }
}