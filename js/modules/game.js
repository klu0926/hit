import { getPlayerStatsWithGears } from "./player.js"

// [TEST] God Mode
let _godMode = false

// Target
let currentTarget = null

export function setCurrentTarget(target) {
  currentTarget = target
}

export function getCurrentTarget() {
  return currentTarget
}

export function roll(chance, min = 0) {
  if (_godMode) {
    console.log('God Mode Roll')
    return true
  }
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
  const BASE_PAYMENT = 2500
  const GOLD_PER_PERCENT = 300
  const MIN_PERCENT = 47;

  // math
  const difficulty = 1 - chance
  const percent = Math.floor(difficulty * 100);
  const diff = percent - MIN_PERCENT;

  if (diff <= 0) return BASE_PAYMENT;
  return BASE_PAYMENT + diff * GOLD_PER_PERCENT;
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

  // if lose, survived?
  if (!isWon) {
    // add 0.2(20%) extra chance to player survive
    isSurvived = roll(getChance(playerSurvival, targetLeth), 0.2)
  }

  // if win, gain gold
  if (isWon) {
    basedGold = payoutFromChance(winChance)
    multiplier = Math.max(1, Math.round((statsWithGear.cool / 100) * 100) / 100); // 2 decimal
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

export function setGodMode(isOn = false) {
  _godMode = isOn
}