import { getLocalTokenPlayer } from "../modules/storage.js"
import { renderTargetProfile } from "./targetProfile.js"

let _progressbar
let dayDiv
let playerDiv
let playerAvatarDiv
let playerAvatar
let PlayerName
let PlayerGold
let playerRank

export function updateProgressbar() {
  const wrapper = document.querySelector('#progressbar-wrapper')
  wrapper.appendChild(progressbar())
}

function progressbar() {
  const player = getLocalTokenPlayer()
  _progressbar = document.createElement('div');
  _progressbar.id = ('progressbar');

  playerDiv = document.createElement('div')
  playerDiv.classList.add('progressbar-player-div')
  _progressbar.appendChild(playerDiv)

  playerAvatarDiv = document.createElement('div')
  playerAvatarDiv.id = 'progressbar-player-avatar-div'
  playerDiv.appendChild(playerAvatarDiv)

  playerAvatar = document.createElement('img')
  playerAvatar.src = player.avatar
  playerAvatar.classList.add('progressbar-player-avatar')
  playerAvatarDiv.appendChild(playerAvatar)

  PlayerName = document.createElement('span')
  PlayerName.classList.add('progressbar-player-name')
  PlayerName.innerText = player.name
  playerAvatarDiv.appendChild(PlayerName)

  dayDiv = document.createElement('div')
  dayDiv.classList.add('progressbar-day-div')
  dayDiv.innerText = `DAY ${player.day}`
  playerDiv.appendChild(dayDiv)

  playerRank = document.createElement('div')
  playerRank.classList.add('progressbar-player-rank')
  playerRank.innerHTML = `<i class="fa-brands fa-web-awesome"></i><span>${player.rank || ''}</span>`
  playerDiv.appendChild(playerRank)

  PlayerGold = document.createElement('div')
  PlayerGold.classList.add('progressbar-player-gold')
  PlayerGold.innerHTML = `<i class="fa-solid fa-coins"></i><span>${player.gold || '0'}</span>`
  playerDiv.appendChild(PlayerGold)


  // EVENT
  // open player profile
  playerAvatarDiv.addEventListener('click', (e) => {
    e.stopPropagation();
    const app = document.querySelector('#app')
    renderTargetProfile(app, getLocalTokenPlayer(), true)
  })

  return _progressbar;
}


export function navbar(currentPage) {
  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');
  navbar.innerHTML = `
    <div class='navigation'>
    <ul class="nav-links">
      <li><a href="#/agents" class="${currentPage === 'agents' ? 'active' : ''}">
      <i class="fa-solid fa-earth-asia"></i>
      AGENTS</a></li>
      <li><a href="#/shop" class="${currentPage === 'shop' ? 'active' : ''}">
<i class="fa-regular fa-credit-card"></i>
      SHOP</a></li>
      <li><a href="#/rules" class="${currentPage === 'rules' ? 'active' : ''}">
       <i class="fa-solid fa-book"></i>
      RULES</a></li>
    </ul>
    </div>
    <div id='progressbar-wrapper'></div>
  `;
  return navbar;
}
