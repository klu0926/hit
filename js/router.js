import { loginPage } from "./pages/loginPage.js";
import { agentsPage } from "./pages/agentsPage.js";
import { createPage } from "./pages/createPage.js";
import { shopPage } from "./pages/shopPage.js";
import { rulesPage } from "./pages/rulesPage.js";

let currentPage = ''

export function getCurrentPage() {
  return currentPage
}

export function router() {
  const app = document.getElementById('app')
  const route = window.location.hash

  switch (route) {
    case '#/login':
      loginPage(app)
      currentPage = "login"
      break
    case '#/create':
      createPage(app)
      currentPage = "create"
      break
    case '#/agents':
      agentsPage(app);
      currentPage = "agents"
      break
    case '#/shop':
      shopPage(app);
      currentPage = "shop"
      break;
    case '#/rules':
      rulesPage(app);
      currentPage = "rules"
      break;
    default:
      window.location.hash = '#/login' // default to login
  }
}