// logic
import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { getTargets } from "../api/getTargets.js";
import { setLocalTargets, setTokenPlayer } from "../modules/storage.js";

// elements
import { navbar, updateProgressbar} from "../components/navbar.js";
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

    // agents leaderboard
    const agentsDiv = document.createElement('div')
    agentsDiv.id = 'agents-div'
    page.appendChild(agentsDiv)

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

    // !-- check if this is first time
    // [first time] sort with lethality, and store rank
    let sortedTargets = []
    if (!targets[0].rank) {
      sortedTargets = targets.sort((a, b) => b.stats.lethality - a.stats.lethality)

      // Assign ranks based on sorted order
      sortedTargets.forEach((t, i) => {
        t.rank = i + 1;
      });

      // remove player from the array
      const index = sortedTargets.findIndex(t => Number(t.id) === Number(player.id))
      const removePlayerInTargets = [...sortedTargets]
      removePlayerInTargets.splice(index, 1)

      // store player
      setTokenPlayer(player)

      // store targets
      setLocalTargets(removePlayerInTargets)
    } else {
      sortedTargets = targets.sort((a, b) => a.rank - b.rank)
    }

    // Fill leaderboard and assign "rank" (rank is not save in storage)
    for (let i = 0; i < sortedTargets.length; i++) {
      const target = sortedTargets[i];

      if (target === player) {
        const _playerCard = targetCard(target, true);
        agentsDiv.appendChild(_playerCard);
      } else {
        const _targetCard = targetCard(target);
        agentsDiv.appendChild(_targetCard);
      }
    }

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