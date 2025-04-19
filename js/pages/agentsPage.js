// logic
import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { fetchTargets } from "../api/fetchTargets.js";
import { sortTargets } from "../modules/sortTargets.js";
import { getLocalTokenPlayer, getLocalTargets } from "../modules/storage.js";
import { getCurrentPage } from "../router.js";

// elements
import { navbar, updateProgressbar } from "../components/navbar.js";
import { targetCard } from "../components/targetCard.js";

// events
import { EVENTS, attachEvent } from "../events.js"

let _agentsPage
let targetsDiv

export async function agentsPage(app) {
  try {
    // player is not login
    const player = isAuth()
    if (!player) {
      window.location.hash = '#/login'
    }

    // clear 
    app.innerHTML = ''

    // Background Cover
    const backgroundCover = document.createElement('div');
    backgroundCover.classList.add('background-cover', 'agents-page-cover');
    app.appendChild(backgroundCover);

    // navbar
    const _navbar = navbar('agents')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const _agentsPage = document.createElement('div')
    _agentsPage.classList.add('page', 'agents-page')
    _agentsPage.id = 'agents-page'
    app.appendChild(_agentsPage)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'AGENTS'
    title.classList.add('title')
    _agentsPage.appendChild(title)

    // targets div
    targetsDiv = document.createElement('div')
    targetsDiv.id = 'targets-div'
    _agentsPage.appendChild(targetsDiv)

    // logout
    const logoutBtn = document.createElement('button')
    logoutBtn.id = 'logout'
    logoutBtn.innerText = 'Logout'
    _agentsPage.append(logoutBtn)

    // fetch targets
    await fetchTargets()

    //Sort and Fill leaderboard 
    sortAndRenderTagets()

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

export function sortAndRenderTagets() {
  const player = getLocalTokenPlayer()
  let sortedTargets = sortTargets()

  targetsDiv.innerHTML = ''

  for (let i = 0; i < sortedTargets.length; i++) {
    const target = sortedTargets[i];

    if (target.id === player.id) {
      // player
      const _playerCard = targetCard(target, true);
      targetsDiv.appendChild(_playerCard);
    } else {
      // target
      const _targetCard = targetCard(target);
      if (target.isDead) {
        _targetCard.classList.add('dead')
      }
      targetsDiv.appendChild(_targetCard);
    }
  }
}

// [Custome Event Listener]
attachEvent(EVENTS.SET_PLAYER, () => {
  if (getCurrentPage() !== 'agents') return
  sortAndRenderTagets()
})