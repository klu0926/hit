import { renderChart } from "../modules/chartHelper.js"

// Cached elements for easy update
let profile
let avatar
let picture
let rank
let name
let gender
let uuid
let stats
let simulatePercent

export function targetProfile(target, isPlayer = false) {
  profile = document.createElement('div')
  profile.id = 'target-profile'
  profile.classList.add('active')
  if (isPlayer) profile.classList.add('player')

  const mainDiv = document.createElement('div')
  mainDiv.className = 'target-profile-main'
  profile.appendChild(mainDiv)

  // Top section
  const topDiv = document.createElement('div')
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
  const infoDiv = document.createElement('div')
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
  const buttonDiv = document.createElement('div')
  buttonDiv.classList.add('target-profile-buttons')
  mainDiv.appendChild(buttonDiv)

  const hitBtn = document.createElement('button')
  hitBtn.type = 'button'
  hitBtn.innerText = 'Hit'
  hitBtn.disabled = true
  buttonDiv.appendChild(hitBtn)

  const simulateBtn = document.createElement('button')
  simulateBtn.type = 'button'
  simulateBtn.innerText = 'Simulate'
  buttonDiv.appendChild(simulateBtn)

  simulatePercent = document.createElement('div')
  simulatePercent.classList.add('simulate-percent')
  simulatePercent.innerText = '100%'
  buttonDiv.appendChild(simulatePercent)

  const close = document.createElement('button')
  close.innerText = 'x'
  close.classList.add('close')
  profile.appendChild(close)

  close.addEventListener('click', () => {
    if (profile) profile.classList.remove('active')
  })

  updateTargetProfile(target, isPlayer)

  return profile
}

export function updateTargetProfile(target, isPlayer = false) {
  if (!profile) return

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

  if (simulatePercent) simulatePercent.innerText = '100%'
}
