export function roll(chance) {
  return Math.random() < chance
}

export function getChance(playerStat, targetStat) {
  const total = playerStat + targetStat
  if (total === 0) return 1
  return playerStat / total
}

// Return in percentage number (no '%')
// This is for display only
export function getPercentage(playerStat, targetStat) {
  const chance = getChance(playerStat, targetStat)
  return (chance * 100).toFixed(0)
}


