// logic
import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { getTargets } from "../api/getTargets.js";

// elements
import { navbar } from "../components/navbar.js";
import { targetCard } from "../components/targetCard.js";


export async function agentsPage(app) {
  try {
    // player is not login
    const player = isAuth()
    if (!player) {
      window.location.hash = '#/login'
    }


    // Page Sekeleton ---------------
    app.innerHTML = ''

    // navbar
    const _navbar = navbar('agents')
    app.appendChild(_navbar)

    // page
    const page = document.createElement('div')
    page.classList.add('page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'AGENTS'
    title.classList.add('title')
    page.appendChild(title)

    // agents leaderboard
    const leaderboard = document.createElement('div')
    leaderboard.id = 'leaderboard'
    page.appendChild(leaderboard)

    // logout
    const logoutBtn = document.createElement('button')
    logoutBtn.id = 'logout'
    logoutBtn.innerText = 'Logout'
    page.append(logoutBtn)

    // get targets
    const targets = await getTargets()

    // put player to the targets array
    targets.push(player)

    // sort agents ranking
    const sortedTargets = targets.sort((a, b) => b.stats.lethality - a.stats.lethality)

    // Fill leaderboard and assign "rank" (rank is not save in storage)
    for (let i = 0; i < sortedTargets.length; i++) {
      const target = sortedTargets[i];
      target.rank = i + 1; // rank starts at 1

      if (target === player) {
        const _playerCard = targetCard(target, true);
        leaderboard.appendChild(_playerCard);
      } else {
        const _targetCard = targetCard(target);
        leaderboard.appendChild(_targetCard);
      }
    }

    // EVENTS
    logoutBtn.addEventListener('click', (e) => {
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
    })

  } catch (err) {
    console.error("[ERROR] agentsPage", err.message)
  }

}