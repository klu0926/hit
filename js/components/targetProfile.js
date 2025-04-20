// logic
import { renderChart } from "../modules/chartHelper.js"
import { getWinPercentage } from "../modules/game.js"
import { animateNumber } from "../modules/animateNumber.js";
import { getPlayerStatsWithGears } from "../modules/player.js"

// element
import { renderCombatDisplay } from "./combatDisplay.js";
import { getLocalTokenPlayer } from "../modules/storage.js";

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
let status
let stats
let buttonDiv
let simulatePercent
let simulateBtn
let hitBtn
let close

// items
let _itemsDisplay
let _itemsBtn


// target
let currentTarget

export function renderTargetProfile(container, target, isPlayer = false) {
  removeTargetProfile()
  removeItemDisplay()
  container.appendChild(targetProfile(target, isPlayer))
}

export function removeTargetProfile() {
  if (_targetProfile) {
    _targetProfile.remove()
    _targetProfile = null
  }
}

function targetProfile(target, isPlayer = false) {
  _targetProfile = document.createElement('div')
  _targetProfile.id = 'target-profile'
  _targetProfile.classList.add('active')
  if (isPlayer) _targetProfile.classList.add('player')
  if (target.isDead) _targetProfile.classList.add('dead')

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
  name.innerText = 'Name : ' + (target.name || target.firstName || '?')
  infoDiv.appendChild(name)

  gender = document.createElement('span')
  gender.innerText = 'Gender : ' + (target.gender || '?')
  infoDiv.appendChild(gender)

  idSpan = document.createElement('span')
  idSpan.innerText = 'ID : ' + (target.id || '?').slice(0, 10)
  infoDiv.appendChild(idSpan)

  status = document.createElement('span')
  const statusString = target.isDead ? 'Terminated' : 'Active'
  status.innerHTML = `Status : <span class='status-string'>${statusString}</span>`
  infoDiv.appendChild(status)

  // Stats section
  stats = document.createElement('div')
  stats.id = 'target-profile-stats'
  mainDiv.appendChild(stats)

  let statsObject = target.stats
  if (isPlayer) {
    statsObject = getPlayerStatsWithGears()
  }
  const statsArray = Object.entries(statsObject).map(([label, value]) => ({ label, value }))
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
  if (target.isDead) simulateBtn.disabled = true

  simulatePercent = document.createElement('div')
  simulatePercent.classList.add('simulate-percent')
  simulatePercent.innerText = '---'
  buttonDiv.appendChild(simulatePercent)

  close = document.createElement('button')
  close.innerText = 'x'
  close.classList.add('close')
  _targetProfile.appendChild(close)

  // player gear button
  if (isPlayer) {
    _itemsBtn = document.createElement('button')
    _itemsBtn.classList.add('items-btn')
    _itemsBtn.innerHTML = '<i class="fa-solid fa-briefcase"></i>'
    _targetProfile.appendChild(_itemsBtn)
  }

  // EVENT
  // close button
  close.addEventListener('click', () => {
    if (_targetProfile) _targetProfile.classList.remove('active')
  })
  // calculate win chance based on lethality
  simulateBtn.addEventListener('click', async () => {
    const percentage = getWinPercentage()
    // animated percentage
    await animateNumber(simulatePercent, percentage, {
      callback: () => {
        hitBtn.disabled = false
      },
      endString: '%'
    })
  })

  // (on Hit btn press) combat display
  hitBtn.addEventListener('click', () => {
    const app = document.querySelector('#app')
    _targetProfile.classList.remove('active')
    renderCombatDisplay(app)
  })

  // items button
  if (_itemsBtn) {
    _itemsBtn.addEventListener('click', itemDisplay)
  }

  // Profile
  // click outside the profile to close profile
  document.addEventListener('click', (event) => {
    const profile = document.getElementById('target-profile');
    if (!profile) return;

    const isActive = profile.classList.contains('active');

    let isInside = false
    if (profile.contains(event.target)) isInside = true
    if (_itemsDisplay) {
      if (_itemsDisplay.contains(event.target)) isInside = true
    }
    if (isActive && !isInside) {
      profile.classList.remove('active');
      // remove itemsDisplay
      removeItemDisplay()
    }
  });
  return _targetProfile
}


function itemDisplay() {
  const app = document.querySelector('#app')
  if (_itemsDisplay) {
    removeItemDisplay()
    return
  }
  _itemsDisplay = document.createElement('div')
  _itemsDisplay.classList.add('items-display')

  // render each items
  const player = getLocalTokenPlayer()
  const gears = player.gears

  if (gears && gears.length > 0) {
    gears.forEach(item => {
      // render each item
      const itemDiv = document.createElement('div')
      itemDiv.classList.add('item-div')
      _itemsDisplay.appendChild(itemDiv)

      // hold icon and upperRight [type, name]
      const upperDiv = document.createElement('div')
      upperDiv.classList.add('item-upper-div')
      itemDiv.appendChild(upperDiv)

      const icon = document.createElement('div')
      icon.classList.add('item-icon')
      icon.innerHTML = item.icon
      upperDiv.appendChild(icon)

      // hold type and name
      const upperDivRight = document.createElement('div')
      upperDivRight.classList.add('item-upper-right')
      upperDiv.appendChild(upperDivRight)

      const type = document.createElement('div')
      type.classList.add('item-type')
      type.innerText = item.type
      upperDivRight.appendChild(type)

      const name = document.createElement('span')
      name.classList.add('item-name')
      name.innerText = item.name
      upperDivRight.appendChild(name)

      // stats
      const statsDiv = document.createElement('div')
      statsDiv.classList.add('stats-div')
      itemDiv.appendChild(statsDiv)

      const lethality = document.createElement('span')
      lethality.classList.add('stats-lethality')
      lethality.innerText = `LETH ${item.stats.lethality}`
      statsDiv.appendChild(lethality)

      const survival = document.createElement('span')
      survival.classList.add('stats-survival')
      survival.innerText = `SUR ${item.stats.survival}`
      statsDiv.appendChild(survival)

      const cool = document.createElement('span')
      cool.classList.add('stats-cool')
      cool.innerText = `CL ${item.stats.cool}`
      statsDiv.appendChild(cool)

      const price = document.createElement('span')
      price.classList.add('item-price')
      price.innerText = `$${item.price}`
      itemDiv.appendChild(price)
    })
  }
  // append to app
  app.appendChild(_itemsDisplay)

  // toggle item buttons .active class
  _itemsBtn.classList.add('active')
}


function removeItemDisplay() {
  if (_itemsDisplay) {
    _itemsDisplay.remove()
    _itemsDisplay = null
    _itemsBtn.classList.remove('active')

  }
}