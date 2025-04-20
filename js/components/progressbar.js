import { getLocalTokenPlayer } from "../modules/storage.js"
import { renderTargetProfile } from "./targetProfile.js"

// events
import { EVENTS, attachEvent } from "../events.js"

let _progressbar
let dayDiv
let playerDiv
let playerAvatarDiv
let playerAvatar
let PlayerName
let PlayerGold
let playerRank

export function progressbar() {
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

  // return 
  return _progressbar;
}

export function updateProgressbar() {
  if (!_progressbar) return
  // remove the old one
  const parent = _progressbar.parentElement
  _progressbar.remove()
  // create a new one
  parent.appendChild(progressbar())
}

// [Custome Event Listener]
attachEvent(EVENTS.SET_PLAYER, () => {
  updateProgressbar()
})
