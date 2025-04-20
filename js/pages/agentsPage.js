// logic
import { isAuth } from "../modules/authentication.js";
import { fetchTargets } from "../api/fetchTargets.js";
import { sortTargets } from "../modules/sortTargets.js";
import { getLocalTokenPlayer, getLocalTargets } from "../modules/storage.js";
import { getCurrentPage } from "../router.js";
import { setRoute } from "../../utils/setRoute.js";

// elements
import { navbar } from "../components/navbar.js";
import { updateProgressbar } from "../components/progressbar.js";
import { footer } from "../components/footer.js";
import { targetCard } from "../components/targetCard.js";
import { backgroundCover } from "../components/backgroundCover.js"
import { callPromptMessage } from "../../utils/promptMessage.js"

// events
import { EVENTS, attachEvent } from "../events.js"

let _agentsPage
let targetsDiv

export async function agentsPage(app) {
  try {
    // player is not login
    const player = isAuth()
    if (!player) {
      setRoute('#/login')
    }

    // clear 
    app.innerHTML = ''

    // Background Cover
    const _backgroundCover = backgroundCover('agents')
    app.appendChild(_backgroundCover);

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

    // footer 
    const _footer = footer()
    app.appendChild(_footer)

    // fetch targets
    await fetchTargets()

    //Sort and Fill leaderboard 
    sortAndRenderTagets()

    // EVENTS
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


