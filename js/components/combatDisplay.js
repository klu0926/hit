import { playCombatLog } from "../modules/playCombatLog.js"
// player
import { getLocalTokenPlayer } from "../modules/storage.js";
const player = getLocalTokenPlayer()


let _combatDisplay
let upperDiv
let title
let combatLog
let buttonsDiv
let close


export function renderCombatDisplay(container, target) {
  if (_combatDisplay) {
    _combatDisplay.remove()
  }
  container.appendChild(combatDisplay(target))
}

function combatDisplay(target) {
  console.log('combat taget:', target)

  // singleton 
  if (_combatDisplay) {
    console.log('active old display')
    _combatDisplay.classList.add('active');
    return _combatDisplay;
  }

  // create new 
  _combatDisplay = document.createElement('div')
  _combatDisplay.id = 'combat-display'
  _combatDisplay.classList.add('active');

  upperDiv = document.createElement('div')
  upperDiv.classList.add('combat-display-upper')
  _combatDisplay.appendChild(upperDiv)

  title = document.createElement('p')
  title.classList.add('combat-display-title')
  title.innerText = 'COMBAT'
  upperDiv.appendChild(title)

  combatLog = document.createElement('div')
  combatLog.classList.add('combat-log')
  _combatDisplay.appendChild(combatLog)

  buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('combat-buttons-div')
  _combatDisplay.appendChild(buttonsDiv)


  close = document.createElement('button')
  close.id = 'combat-close'
  close.innerText = 'close'
  close.disabled = true
  buttonsDiv.appendChild(close)

  function afterCombatLog() {
    // highlight last sentence
    const ps = document.querySelectorAll('.combat-log p')
    const last = ps[ps.length - 1]
    if (last) last.classList.add('endline')

    // enable close
    close.disabled = false
  }

  playCombatLog(combatLog, afterCombatLog, true)


  // EVENT
  close.addEventListener('click', () => {
    if (_combatDisplay.classList.contains('active')) {
      _combatDisplay.classList.remove('active')
    }
  })

  return _combatDisplay
}


