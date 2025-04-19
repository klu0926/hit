import { getPlayerStatsWithGears } from "./player.js"

let currentTarget = null

export function setCurrentTarget(target) {
  console.log('setCurrentTarget:', target)
  currentTarget = target
}

export function getCurrentTarget() {
  return currentTarget
}

export function roll(chance, min = 0) {
  console.log('rool chance:', chance)
  return Math.random() < (chance + min)
}

export function getChance(playerStat, targetStat) {
  const total = playerStat + targetStat
  if (total === 0) return 1
  return playerStat / total
}

// Return in percentage number (no '%')
// This is for display only
export function getWinPercentage() {
  const statsWithGear = getPlayerStatsWithGears()
  const playerLeth = statsWithGear.lethality
  const targetLeth = currentTarget.stats.lethality
  const chance = getChance(playerLeth, targetLeth)
  return (chance * 100).toFixed(0)
}

function payoutFromChance(chance) {
  const percent = Math.floor(chance * 100)
  if (percent >= 50) return 2000;
  return Math.round(10000 - percent * 150);
}

export function getCombatResult() {
  const statsWithGear = getPlayerStatsWithGears()
  const playerLeth = statsWithGear.lethality
  const playerSurvival = statsWithGear.survival
  const targetLeth = currentTarget.stats.lethality

  let isWon = false
  let isSurvived = true
  let basedGold = 0
  let multiplier = 0
  let gold = 0

  // win / lose
  const winChance = getChance(playerLeth, targetLeth)
  isWon = roll(winChance)
  console.log('winChance:', winChance)

  // if lose, survived?
  if (!isWon) {
    // add 0.1 (10%) extra chance to player survive
    isSurvived = roll(getChance(playerSurvival, targetLeth), 0.1)
  }

  // if win, gain gold
  if (isWon) {
    basedGold = payoutFromChance(winChance)
    multiplier = Math.round((1 + statsWithGear.cool * 0.001) * 10) / 10; // run to one decimal
    gold = Math.round(basedGold * multiplier)
  }

  const result = {
    isWon,
    isSurvived,
    basedGold,
    multiplier,
    gold,
    currentTarget,
  }
  return result
}
