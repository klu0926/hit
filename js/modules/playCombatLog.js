const combatLog = [
  "You fire — target dodges fast",
  "You strike — blade glances off",
  "You lunge — target blocks cleanly",
  "Your shot lands — partial damage",
  "You miss — poor visibility",
  "You counter — hit connects hard",
  "You deflect — target breaks stance",
  "You dodge — bullet whizzes past",
  "You stab — light wound inflicted",
  "You parry — clean defense made",
  "You slash — armor dulls impact",
  "You dive — avoid fatal shot",
  "You shoot — target takes hit",
  "You swing — target stumbles back",
  "You reload — target charges in",
  "You fake — strike lands clean",
  "You evade — smoke covers exit",
  "You rush — target isn't ready",
  "You grapple — target slips free",
  "You react — strike lands first"
];
const combatWin = [
  "Target Terminated — You Win",
];

const combatLoseDie = [
  "Shot in the head — You Die",
  "Stabbed in the chest — You Die",
  "Left bleeding out — You Die"
];

const combatLoseSurvived = [
  "Wounded and limping — You Survived",
  "Under heavy fire — You Survived",
  "Barely breathing — You Survived"
];

export function playCombatLog(element, callback, isWon = false, isSurvived = false) {
  const logCount = 10
  const logInterval = 300

  // clear
  element.innerHTML = '';

  // use math random to shuffled (50%)
  const shuffled = [...combatLog].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, logCount);

  // Determine ending lines
  let ending;
  if (isWon) {
    ending = combatWin;
  } else {
    ending = isSurvived ? combatLoseSurvived : combatLoseDie;
  }

  // Combine full log
  const fullLog = [...selected, ...ending];

  // Interval to show each line
  let index = 0;
  const interval = setInterval(() => {
    const p = document.createElement('p');
    p.textContent = fullLog[index];
    element.appendChild(p);
    index++;

    if (index >= fullLog.length) {
      clearInterval(interval);
      if (typeof callback === 'function') callback();
    }
  }, logInterval);
}
