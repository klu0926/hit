import { playCombatLog } from "../modules/playCombatLog.js"
import { getCombatResult } from "../modules/game.js"
import { animateNumber } from "../modules/animateNumber.js"
import { sleep } from "../modules/sleep.js"
import { afterCombatTokenPlayerSave } from "../modules/storage.js"

let _combatDisplay
let upperDiv
let title
let combatLog
let buttonsDiv
let close
let goldDiv
let multiplier

export function renderCombatDisplay(container) {
  if (_combatDisplay) {
    _combatDisplay.remove()
  }
  container.appendChild(combatDisplay())
}

function combatDisplay() {

  const result = getCombatResult()
  // create new 
  _combatDisplay = document.createElement('div')
  _combatDisplay.id = 'combat-display'
  _combatDisplay.classList.add('active');

  upperDiv = document.createElement('div')
  upperDiv.classList.add('combat-display-upper')
  _combatDisplay.appendChild(upperDiv)

  title = document.createElement('p')
  title.classList.add('combat-display-title')
  title.innerText = 'HIT'
  upperDiv.appendChild(title)

  combatLog = document.createElement('div')
  combatLog.classList.add('combat-log')
  _combatDisplay.appendChild(combatLog)


  buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('combat-buttons-div')
  _combatDisplay.appendChild(buttonsDiv)

  goldDiv = document.createElement('div')
  goldDiv.classList.add('combat-gold-div')
  goldDiv.innerText = '----'
  buttonsDiv.appendChild(goldDiv)

  multiplier = document.createElement('span')
  multiplier.classList.add('combat-gold-multiplier')
  multiplier.innerText = ''
  buttonsDiv.appendChild(multiplier)

  close = document.createElement('button')
  close.id = 'combat-close'
  close.innerText = 'close'
  close.disabled = true
  buttonsDiv.appendChild(close)

  async function afterCombatLog() {
    // highlight last sentence
    const ps = document.querySelectorAll('.combat-log p')
    const last = ps[ps.length - 1]
    if (last) last.classList.add('endline')

    // display gold gain
    if (result.isWon) {
      // display based gold
      await animateNumber(goldDiv, result.basedGold, {
        numberIncrement: 10,
        duration: 500,
        startString: '$',
        endString: ''
      })
      await sleep(300)

      // display multiplier
      multiplier.innerText = `x ${result.multiplier}`

      await sleep(200)

      // display multiplier gold
      await animateNumber(goldDiv, result.gold, {
        startNumber: result.basedGold,
        numberIncrement: 10,
        duration: 500,
        startString: '$',
        endString: ''
      })
    } else {
      // lose, die
      goldDiv.innerText = '$0'
    }

    // update player data and save (win or lose)
    afterCombatTokenPlayerSave(result)

    // enable close
    close.disabled = false
  }

  playCombatLog(combatLog, afterCombatLog, result)


  // EVENT
  close.addEventListener('click', () => {
    if (_combatDisplay.classList.contains('active')) {
      _combatDisplay.classList.remove('active')
    }
  })

  return _combatDisplay
}


