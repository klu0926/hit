// logic
import { renderChart } from "../modules/chartHelper.js"
import { getWinPercentage } from "../modules/game.js"
import { animateNumber } from "../modules/animateNumber.js";

// element
import { renderCombatDisplay } from "./combatDisplay.js";


// Cached elements for easy update
let _targetProfile
let mainDiv
let topDiv
let avatar
let picture
let infoDiv
let rank
let name
let gender
let idSpan
let stats
let buttonDiv
let simulatePercent
let simulateBtn
let hitBtn
let close

// target
let currentTarget

export function renderTargetProfile(container, target, isPlayer = false) {
  if (_targetProfile) {
    _targetProfile.remove()
  }
  container.appendChild(targetProfile(target, isPlayer))
}


function targetProfile(target, isPlayer = false) {
  _targetProfile = document.createElement('div')
  _targetProfile.id = 'target-profile'
  _targetProfile.classList.add('active')
  if (isPlayer) _targetProfile.classList.add('player')

  currentTarget = target

  mainDiv = document.createElement('div')
  mainDiv.className = 'target-profile-main'
  _targetProfile.appendChild(mainDiv)

  // Top section
  topDiv = document.createElement('div')
  topDiv.className = 'target-profile-top'
  mainDiv.appendChild(topDiv)

  avatar = document.createElement('img')
  avatar.className = 'target-profile-avatar'
  avatar.src = target.avatar
  topDiv.appendChild(avatar)

  if (target.picture) {
    picture = document.createElement('img')
    picture.className = 'target-profile-picture'
    picture.src = target.picture
    topDiv.appendChild(picture)
  }

  // Info section
  infoDiv = document.createElement('div')
  infoDiv.className = 'target-profile-info'
  mainDiv.appendChild(infoDiv)

  rank = document.createElement('span')
  rank.className = 'target-profile-rank'
  rank.innerHTML = `<i class="fa-brands fa-web-awesome"></i><span>RANK : ${target.rank || '?'}</span>`
  infoDiv.appendChild(rank)

  name = document.createElement('span')
  name.innerText = 'NAME : ' + (target.name || target.firstName || '?')
  infoDiv.appendChild(name)

  gender = document.createElement('span')
  gender.innerText = 'GENDER : ' + (target.gender || '?')
  infoDiv.appendChild(gender)

  idSpan = document.createElement('span')
  idSpan.innerText = 'ID : ' + (target.id || '?').slice(0, 5)
  infoDiv.appendChild(idSpan)

  // Stats section
  stats = document.createElement('div')
  stats.id = 'target-profile-stats'
  mainDiv.appendChild(stats)

  const statsArray = Object.entries(target.stats).map(([label, value]) => ({ label, value }))
  renderChart(stats, statsArray)

  // Buttons
  buttonDiv = document.createElement('div')
  buttonDiv.classList.add('target-profile-buttons')
  mainDiv.appendChild(buttonDiv)

  hitBtn = document.createElement('button')
  hitBtn.disabled = true
  hitBtn.type = 'button'
  hitBtn.innerText = 'Hit'
  hitBtn.disabled = true
  buttonDiv.appendChild(hitBtn)

  simulateBtn = document.createElement('button')
  simulateBtn.type = 'button'
  simulateBtn.innerText = 'Simulate'
  buttonDiv.appendChild(simulateBtn)

  simulatePercent = document.createElement('div')
  simulatePercent.classList.add('simulate-percent')
  simulatePercent.innerText = '---'
  buttonDiv.appendChild(simulatePercent)

  close = document.createElement('button')
  close.innerText = 'x'
  close.classList.add('close')
  _targetProfile.appendChild(close)


  // EVENT
  // close button
  close.addEventListener('click', () => {
    if (_targetProfile) _targetProfile.classList.remove('active')
  })
  // calculate win chance based on lethality
  simulateBtn.addEventListener('click', async () => {
    const percentage = getWinPercentage()
    // animated percentage
    await animateNumber(simulatePercent, percentage, () => {
      // unlock hit button when complete
      hitBtn.disabled = false
    })
  })

  // (on Hit btn press) combat display
  hitBtn.addEventListener('click', () => {
    const app = document.querySelector('#app')
    _targetProfile.classList.remove('active')
    renderCombatDisplay(app)
  })

  return _targetProfile
}