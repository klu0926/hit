import { loginPage } from "./pages/loginPage.js";
import { agentsPage } from "./pages/agentsPage.js";
import { accountPage } from "./pages/accountPage.js";
import { shopPage } from "./pages/shopPage.js";
import { rulesPage } from "./pages/rulesPages.js";

export function router() {
  const app = document.getElementById('app')
  const route = window.location.hash

  switch (route) {
    case '#/login':
      loginPage(app)
      break
    case '#/create':
      accountPage(app)
      break
    case '#/agents':
      agentsPage(app);
      break
    case '#/shop':
      shopPage(app);
      break;
    case '#/rules':
      rulesPage(app);
      break;
    default:
      window.location.hash = '#/login' // default to login
  }
}