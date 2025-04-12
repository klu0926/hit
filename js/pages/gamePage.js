import { logout } from "../api/reqresIn.js";
import { isAuth } from "../modules/authentication.js";
import { getTargets } from "../api/getTargets.js";
import { targetCard, playerCard } from "../components/targetCard.js";


export async function gamePage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      window.location.hash = '#/login'
    }


    // Page Sekeleton ---------------
    app.innerHTML = ''

    // leaderboard
    const leaderboard = document.createElement('div')
    leaderboard.id = 'leaderboard'
    app.appendChild(leaderboard)

    // logout
    const logoutBtn = document.createElement('button')
    logoutBtn.id = 'logout'
    logoutBtn.innerText = 'Logout'
    app.append(logoutBtn)

    // get users
    const users = await getTargets()

    // fill leaderboard with target
    users.forEach(target => {
      const _targetCard = targetCard(target)
      leaderboard.appendChild(_targetCard)
    });

    // add in player
    const _playerCard = playerCard(plalyer)
    leaderboard.appendChild(_playerCard)

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
    console.error("[ERROR] gamePage", err.message)
  }

}