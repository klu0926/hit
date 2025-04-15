// logic
import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { fetchTargets } from "../api/fetchTargets.js";
import { sortTargets } from "../modules/sortTargets.js";

// elements
import { navbar, updateProgressbar } from "../components/navbar.js";
import { targetCard } from "../components/targetCard.js";

let targetsDiv

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
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'AGENTS'
    title.classList.add('title')
    page.appendChild(title)

    // targets div
    targetsDiv = document.createElement('div')
    targetsDiv.id = 'targets-div'
    page.appendChild(targetsDiv)

    // logout
    const logoutBtn = document.createElement('button')
    logoutBtn.id = 'logout'
    logoutBtn.innerText = 'Logout'
    page.append(logoutBtn)

    // fetch targets
    await fetchTargets()

    // sort targets with players (update rank attributes)
    let sortedTargets = sortTargets()

    // Fill leaderboard 
    renderTargetsDiv(player, sortedTargets)

    // EVENTS
    // Profile
    // click outside the profile to close profile
    document.addEventListener('click', (event) => {
      const profile = document.getElementById('target-profile');
      if (!profile) return;

      const isActive = profile.classList.contains('active');
      const isInside = profile.contains(event.target);

      if (isActive && !isInside) {
        profile.classList.remove('active');
      }
    });

    // logout button
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
    console.error("[ERROR] agentsPage", err)
  }
}

export function renderTargetsDiv(player, targets) {
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];

    if (target.id === player.id) {
      const _playerCard = targetCard(target, true);
      targetsDiv.appendChild(_playerCard);
    } else {
      const _targetCard = targetCard(target);
      targetsDiv.appendChild(_targetCard);
    }
  }
}