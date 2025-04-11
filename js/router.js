// where it deal with page change for a SPA
import { loginPage } from "./pages/loginPage.js";
import { gamePage } from "./pages/gamePage.js";

export function router() {
  const app = document.getElementById('app')
  const route = window.location.hash

  switch (route) {
    case '#/login':
      loginPage(app);
      break;
    case '#/game':
      gamePage(app);
      break;
    default:
      window.location.hash = '#/login' // default to login
  }
}