import { getLocalTokenPlayer, removeCurrentPlayer } from "./storage.js"
import { callPromptMessage } from "../../utils/promptMessage.js"

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

export async function playerDie() {

  // removeCurrnetPlayer 
  removeCurrentPlayer()

  // display promptMessage
  await callPromptMessage(
    'AGENT TERMINATED\nYou were neutralized in combat. All your credentials have been purged. Thank you for your service.',
    true
  );

  // change to create page
  window.location.href = '#/create'
}