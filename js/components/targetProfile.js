import { renderChart } from "../modules/chartHelper.js"
import { getPercentage } from "../modules/gameCalculation.js"
import { animateNumber } from "../modules/animateNumber.js";


// player
import { getLocalTokenPlayer } from "../modules/storage.js";
const player = getLocalTokenPlayer()


// Cached elements for easy update
let profile
let mainDiv
let topDiv
let avatar
let picture
let infoDiv
let rank
let name
let gender
let uuid
let stats
let buttonDiv
let simulatePercent
let simulateBtn
let hitBtn
let close

// target
let currentTarget


export function targetProfile(target, isPlayer = false) {
  profile = document.createElement('div')
  profile.id = 'target-profile'
  profile.classList.add('active')
  if (isPlayer) profile.classList.add('player')

  currentTarget = target

  mainDiv = document.createElement('div')
  mainDiv.className = 'target-profile-main'
  profile.appendChild(mainDiv)

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
  infoDiv.appendChild(rank)

  name = document.createElement('span')
  infoDiv.appendChild(name)

  gender = document.createElement('span')
  infoDiv.appendChild(gender)

  uuid = document.createElement('span')
  infoDiv.appendChild(uuid)

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
  profile.appendChild(close)

  close.addEventListener('click', () => {
    if (profile) profile.classList.remove('active')
  })

  updateTargetProfile(target, isPlayer)

  // EVENT
  // calculate win chance based on lethality
  simulateBtn.addEventListener('click', () => {
    const playerLeth = player.stats.lethality
    const targetLeth = currentTarget.stats.lethality
    const percentage = getPercentage(playerLeth, targetLeth)
    // animated percentage
    animateNumber(simulatePercent, percentage, () => {
      // unlock hit button when complete
      hitBtn.disabled = false
    })
  })

  return profile
}

export function updateTargetProfile(target, isPlayer = false) {
  if (!profile) return
  currentTarget = target

  profile.classList.add('active')
  if (isPlayer) profile.classList.add('player')
  else profile.classList.remove('player')

  if (avatar) avatar.src = target.avatar || ''
  if (target.picture && picture) picture.src = target.picture
  else if (!target.picture && picture) picture.remove()

  if (rank) rank.innerHTML = `<i class="fa-brands fa-web-awesome"></i><span>RANK : ${target.rank || '?'}</span>`

  if (name) name.innerText = 'NAME : ' + (target.name || target.firstName || '?')

  if (gender) gender.innerText = 'GENDER : ' + (target.gender || '?')

  if (uuid) uuid.innerText = 'UUID : ' + (target.uuid || '?').slice(0, 5)

  const statsArray = Object.entries(target.stats).map(([label, value]) => ({ label, value }))
  renderChart(stats, statsArray)

  if (hitBtn) hitBtn.disabled = true

  if (simulatePercent) simulatePercent.innerText = '---'
}
