import { playerDie } from "./player.js"


const combatLog = [
  "You — fire and miss",
  "Target — dodges sideways",
  "You — punch the chest",
  "Target — blocks with arm",
  "You — shoot the leg",
  "Target — counters fast",
  "You — stab the ribs",
  "Target — slips behind",
  "You — swing and hit",
  "Target — kicks low",
  "You — dive for cover",
  "Target — reloads quickly",
  "You — slash the arm",
  "Target — ducks low",
  "You — rush forward",
  "Target — flinches back",
  "You — roll aside",
  "Target — breaks free",
  "You — strike the jaw",
]

const combatWin = [
  "Headshot Confirmed — Target Terminated",
  "Throat Slit — Target Terminated",
  "Target Bled Out — Target Terminated",
  "Neck Snapped — Target Terminated",
  "Crushed by Impact — Target Terminated",
  "Thrown off Ledge — Target Terminated",
  "Chest Pierced — Target Terminated",
  "Explosive Kill — Target Terminated",
  "Knife to Heart — Target Terminated",
  "Target Burned — Target Terminated",
  "Poison Took Effect — Target Terminated",
  "Sniper Hit Landed — Target Terminated",
  "Silent Takedown — Target Terminated",
  "Final Blow Struck — Target Terminated",
  "Broken Spine — Target Terminated"
]

const combatLoseDie = [
  "Shot in the head — You Die",
  "Stabbed in the chest — You Die",
  "Kicked off the building — You Die",
  "Strangled from behind — You Die",
  "Neck snapped clean — You Die",
  "Impaled through the back — You Die",
  "Blown up by grenade — You Die",
  "Hit by sniper round — You Die",
  "Crushed under debris — You Die",
  "Burned alive — You Die",
  "Slit throat — You Die",
  "Electrocuted — You Die",
  "Thrown off a ledge — You Die",
  "Poisoned quietly — You Die",
  "Drowned slowly — You Die"
]

const combatLoseSurvived = [
  "You crawled behind a wall — You Survived",
  "You slipped through a gate — You Survived",
  "You jumped off the roof — You Survived",
  "You fled down the alley — You Survived",
  "You rolled behind crates — You Survived",
  "You vanished into traffic — You Survived",
  "You dove into the river — You Survived",
  "You escaped down a shaft — You Survived",
  "You jammed the back door — You Survived",
  "You slid under a truck — You Survived",
  "You limped across the street — You Survived",
  "You hid under rubble — You Survived",
  "You ducked into a vent — You Survived",
  "You dropped into a tunnel — You Survived",
  "You crawled through a drain — You Survived"
]

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function playCombatLog(element, callback, result) {
  const { isWon, isSurvived } = result
  const logCount = 10
  const logInterval = 300

  // clear
  element.innerHTML = '';

  // use math random to shuffled (50%)
  // combat log
  const shuffled = [...combatLog].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, logCount);

  // Determine ending lines
  let ending;
  if (isWon) {
    ending = pickRandom(combatWin);
  } else {
    ending = isSurvived ? pickRandom(combatLoseSurvived) : pickRandom(combatLoseDie);
  }

  // Combine full log
  const fullLog = [...selected, ending];

  // Interval to show each line
  let index = 0;
  const interval = setInterval(() => {
    const p = document.createElement('p');
    p.textContent = fullLog[index];
    element.appendChild(p);
    index++;

    if (index >= fullLog.length) {
      clearInterval(interval);

      // win or lose but survived
      if (typeof callback === 'function') callback();

      // lose and die
      if (!isWon && !isSurvived) {
        setTimeout(() => {
          playerDie();
        }, 500)
        return
      }
    }
  }, logInterval);
}
