import { renderTargetProfile } from "./targetProfile.js";


export function targetCard(target, isPlayer = false) {

  const card = document.createElement('div');
  card.classList.add('target-card');
  if (isPlayer) {
    card.classList.add('player');
    card.id = 'player';
  }

  // Set data attribute (for NPCs only)
  if (!isPlayer) {
    card.dataset.target = target.uuid || target.id;
  }

  // Inner container
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('target-inner');
  card.appendChild(innerDiv);

  // Image
  const image = document.createElement('img');
  image.src = target.avatar;
  innerDiv.appendChild(image);

  // Rank
  const Rankspan = document.createElement('span');
  Rankspan.innerText = target.rank || "?"
  Rankspan.classList.add('rank')
  innerDiv.appendChild(Rankspan);


  // first name
  const nameSpan = document.createElement('span');
  nameSpan.innerText = target.firstName || target.name || "?"
  nameSpan.classList.add('name')
  innerDiv.appendChild(nameSpan);

  // EVENT ------------------

  // click card to open target profile
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    const app = document.querySelector('#app')
    const isPlayer = card.classList.contains('player')
    renderTargetProfile(app, target, isPlayer)
  })

  // return
  return card;
}