export function targetCard(target) {
  const _targetCard = document.createElement('div')
  _targetCard.classList.add('target-card')

  // set target uuid to dataset
  _targetCard.dataset.target = target.uuid || target.id

  // inner div
  const innerDiv = document.createElement('div')
  innerDiv.classList.add('target-inner')
  _targetCard.appendChild(innerDiv)

  // target photo
  const image = document.createElement('img')
  image.src = target.avatar
  innerDiv.appendChild(image)

  return _targetCard
}

export function playerCard(player) {
  const _playerCard = document.createElement('div')
  _playerCard.classList.add('target-card', 'player')
  _playerCard.id = 'player'

  // inner div
  const innerDiv = document.createElement('div')
  innerDiv.classList.add('target-inner')
  _playerCard.appendChild(innerDiv)

  // player photo
  const image = document.createElement('img')
  image.src = player.avatar
  innerDiv.appendChild(image)

  return _playerCard
}