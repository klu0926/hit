export function targetProfile(target, isPlayer = false) {
  const _targetProfile = document.createElement('div')
  _targetProfile.id = 'target-profile'

  // active it
  _targetProfile.classList.add('active')

  // is player?
  if (isPlayer) {
    profile.classList.add('player')
  }

  const mainDiv = document.createElement('div')
  mainDiv.className = 'target-profile-main'
  _targetProfile.appendChild(mainDiv)

  // top div : avtar + real photo
  const topDiv = document.createElement('div')
  topDiv.className = 'target-profile-top'
  mainDiv.appendChild(topDiv)

  // --- avatar img
  const avatar = document.createElement('img')
  avatar.className = 'target-profile-avatar'
  avatar.src = target.avatar
  topDiv.appendChild(avatar)

  // --- picture (real identity)
  // player has no picture
  if (target.picture) {
    const picture = document.createElement('img')
    picture.className = 'target-profile-picture'
    picture.src = target.picture
    topDiv.appendChild(picture)
  }

  // info div : all info
  const infoDiv = document.createElement('div')
  infoDiv.className = 'target-profile-info'
  mainDiv.appendChild(infoDiv)

  const rank = document.createElement('span')
  const rankString = 'RANK : ' + (target.rank || '?')
  rank.innerHTML = `<i class="fa-brands fa-web-awesome"></i>
  <span>${rankString}</span>
  `
  rank.classList.add('target-profile-rank')
  infoDiv.appendChild(rank)

  const name = document.createElement('span')
  name.innerText = 'NAME : ' + (target.name || target.firstName || '?')
  infoDiv.appendChild(name)

  const gender = document.createElement('span')
  gender.innerText = 'GENDER : ' + (target.gender || '?')
  infoDiv.appendChild(gender)

  const uuid = document.createElement('span')
  const uuidString = (target.uuid || '?')
  uuid.innerText = 'UUID : ' + uuidString.slice(0, 5)
  infoDiv.appendChild(uuid)

  // stats div (replace with chart.js) : 
  const stats = document.createElement('div')
  stats.id = 'target-profile-stats'
  stats.innerText = `Lethality: ${target.stats?.lethality || '?'}`
  mainDiv.appendChild(stats)

  // button div (Hit / Simulate )
  const buttonDiv = document.createElement('div')
  buttonDiv.classList.add('target-profile-buttons')
  mainDiv.appendChild(buttonDiv)

  // --- Hit button 
  const hitBtn = document.createElement('button')
  hitBtn.type = 'button'
  hitBtn.innerText = 'Hit'
  buttonDiv.appendChild(hitBtn)

  // --- Simulate (to get a win/lose %)
  const simulateBtn = document.createElement('button')
  simulateBtn.type = 'button'
  simulateBtn.innerText = 'Simulate'
  buttonDiv.appendChild(simulateBtn)

  const simulatePercent = document.createElement('div')
  simulatePercent.classList.add('simulate-percent')
  simulatePercent.innerText = '100%'
  buttonDiv.appendChild(simulatePercent)

  // close button
  const close = document.createElement('button')
  close.innerText = 'x'
  close.classList.add('close')
  _targetProfile.appendChild(close)

  close.addEventListener('click', () => {
    const profile = document.querySelector('#target-profile')
    if (profile) {
      profile.classList.remove('active')
    }
  })


  return _targetProfile
}


export function updateTargetProfile(target, isPlayer = false) {

  const profile = document.getElementById('target-profile');
  if (!profile) return;

  // active it
  if (!profile.classList.contains('active')) {
    profile.classList.add('active')
  }

  // is player?
  if (isPlayer) {
    profile.classList.add('player')
  } else {
    profile.classList.remove('player')
  }

  const avatar = profile.querySelector('.target-profile-avatar');
  if (avatar) avatar.src = target.avatar || '';

  const topDiv = profile.querySelector('.target-profile-top');

  // Handle real picture (if exists or not)
  let picture = profile.querySelector('.target-profile-picture');
  if (target.picture) {
    if (picture) {
      picture.src = target.picture;
    } else {
      picture = document.createElement('img');
      picture.classList.add('target-profile-picture');
      picture.src = target.picture;
      topDiv.appendChild(picture);
    }
  } else {
    if (picture) picture.remove();
  }

  const infoDiv = profile.querySelector('.target-profile-info');

  const rank = infoDiv.querySelector('.target-profile-rank');
  if (rank) {
    const rankString = 'RANK : ' + (target.rank || '?');
    rank.innerHTML = `<i class="fa-brands fa-web-awesome"></i><span>${rankString}</span>`;
  }

  const spans = infoDiv.querySelectorAll('span');
  if (spans[1]) {
    spans[1].innerText = 'NAME : ' + (target.name || target.firstName || '?');
  }
  if (spans[2]) {
    spans[2].innerText = 'GENDER : ' + (target.gender || '?');
  }
  if (spans[3]) {
    const uuidString = (target.uuid || '?');
    spans[3].innerText = 'UUID : ' + uuidString.slice(0, 5);
  }

  const stats = profile.querySelector('#target-profile-stats');
  if (stats) {
    stats.innerText = `Lethality: ${target.stats?.lethality ?? '?'}`;
  }

  const simulatePercent = profile.querySelector('.simulate-percent');
  if (simulatePercent) {
    simulatePercent.innerText = '100%';
  }
}
