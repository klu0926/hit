import { getRouteUrl } from "../../utils/setRoute.js"
import { getLocalTokenPlayer } from "../modules/storage.js"
import { renderTargetProfile, removeTargetProfile } from "./targetProfile.js"

let _sidebar

export function sidebar() {
  if (_sidebar) {
    _sidebar.remove()
    _sidebar = null
  }
  const player = getLocalTokenPlayer()

  const hash = location.hash
  console.log('hash:', hash)


  _sidebar = document.createElement('div')
  _sidebar.id = 'sidebar'

  // agenets page link
  const agentLink = document.createElement('a');
  agentLink.href = getRouteUrl('#/agents')
  if (hash === '#/agents') agentLink.classList.add('active');
  agentLink.innerHTML = `<i class="fa-solid fa-earth-asia"></i>`;
  _sidebar.appendChild(agentLink)


  // shop page link
  const shopLink = document.createElement('a');
  shopLink.href = getRouteUrl('#/shop')
  if (hash === '#/shop') shopLink.classList.add('active');
  shopLink.innerHTML = `<i class="fa-regular fa-credit-card"></i>`;
  _sidebar.appendChild(shopLink)

  // player profile
  const playerIcon = document.createElement('div');
  playerIcon.classList.add('sidebar-player-icon')
  playerIcon.innerHTML = `<i class="fa-solid fa-user-tie"></i>`
  _sidebar.appendChild(playerIcon)


  // music ?

  // logout? 


  // Append to app
  const app = document.querySelector('#app')
  app.appendChild(_sidebar)


  // Event
  // open player profile
  playerIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const profile = getProfile()

    if (profile) {

      // is player
      if (profile.classList.contains('player')) {
        removeTargetProfile()
      } else {
        renderTargetProfile(app, getLocalTokenPlayer(), true)
      }
    } else {
      renderTargetProfile(app, getLocalTokenPlayer(), true)
    }
  })

}


function getProfile() {
  return document.querySelector('#target-profile')
}