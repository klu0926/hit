// where it deal with page change for a SPA
import { renderLogin } from "./views/login.js";
import { renderLeaderboard } from "./views/leaderboard.js";

export function router() {
  const app = document.getElementById('app')
  const route = window.location.hash

  // clear screen
  app.innerHTML = ''

  switch (route) {
    case '#/login':
      renderLogin();
      break;
    case '#/leaderboard':
      renderLeaderboard();
      break;
    default:
      window.location.hash = '#/login' // default to login
  }
}