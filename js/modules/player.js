import { getLocalTokenPlayer } from "./storage.js"


export function getPlayerStatsWithGears() {
  const player = getLocalTokenPlayer()
  // return raw stats
  const gears = player.gears
  if (!gears || gears.length === 0) {
    console.log('using raw stats')
    return player.stats
  }

  // return stats with gears
  let lethality = player.stats.lethality
  let survival = player.stats.survival
  let cool = player.stats.cool

  gears.forEach(gear => {
    console.log('gear', gear)
    lethality += gear.stats.lethality || 0
    survival += gear.stats.survival || 0
    cool += gear.stats.cool || 0
  })

  const statsWithGear = {
    lethality, survival, cool
  }
  console.log('using gear + stats:', statsWithGear)

  return statsWithGear
}