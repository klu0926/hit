export function targetCard(target) {
  const _targetCard = document.createElement('div')
  _targetCard.classList.add('target-card')

  // set target uuid to dataset
  _targetCard.dataset.target = target.login.uuid || target.id

  // target photo
  const image = document.createElement('img')
  image.src = target.picture.large || target.avatar
  _targetCard.appendChild(image)

  return _targetCard
}

export function playerCard(player) {
  const _playerCard = document.createElement('div')
  _playerCard.classList.add('target-card', 'player')
  _playerCard.id = 'player'

  // player photo
  const image = document.createElement('img')
  image.src = player.avatar
  _playerCard.appendChild(image)

  return _playerCard
}