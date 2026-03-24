import { loginPage } from "./pages/loginPage.js";
import { agentsPage } from "./pages/agentsPage.js";
import { createPage } from "./pages/createPage.js";
import { shopPage } from "./pages/shopPage.js";
import { rulesPage } from "./pages/rulesPage.js";
import { setRoute } from "../utils/setRoute.js";
import { getLocalPlayers } from "./modules/storage.js";

let currentPage = ''

export function getCurrentPage() {
  return currentPage
}

function getLandingRoute() {
  const players = getLocalPlayers() || []
  return players.length > 0 ? '#/login' : '#/create'
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
      setRoute(getLandingRoute())
  }
}
