export function targetCard(target) {
  const _targetCard = document.createElement('div')
  _targetCard.classList.add('target-card')

  // set target uuid to dataset
  _targetCard.dataset.target = target.login.uuid

  // target photo
  const image = document.createElement('img')
  image.src = target.picture.large
  _targetCard.appendChild(image)

  return _targetCard
}