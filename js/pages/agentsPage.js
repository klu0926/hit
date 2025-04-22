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
import { sidebar } from "../components/sidebar.js";

// events
import { EVENTS, attachEvent } from "../events.js"

let _agentsPage
let targetsDiv

function displayLoading(app) {
  // loading
  const loading = document.createElement('div')
  loading.classList.add('loading')

  // info
  const info = document.createElement('p')
  info.innerText = 'Tracking targets'
  info.classList.add('info')
  loading.appendChild(info)

  app.appendChild(loading)
}

export async function agentsPage(app) {
  try {
    // player is not login
    const player = isAuth()
    if (!player) {
      setRoute('#/login')
    }
    // clear 
    app.innerHTML = ''

    // show loading 
    displayLoading(app)

    // Test
    return

    // fetch targets
    await fetchTargets()

    // Fetch complete ---- clear loading
    app.innerHTML = ''

    // navbar
    const _navbar = navbar('agents')
    app.appendChild(_navbar)
    updateProgressbar()

    // Background Cover
    const _backgroundCover = backgroundCover('agents')
    app.appendChild(_backgroundCover);

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


    //Sort and Fill leaderboard 
    sortAndRenderTagets()

    // sidebar
    sidebar()

    // footer 
    const _footer = footer()
    app.appendChild(_footer)

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


