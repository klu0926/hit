import { generateItems } from "../pages/shopPageItems.js"
import { randomInRange } from "../../utils/randomInRange.js";

export function playerDayPassed(player) {
  const updatedPlayer = player

  // level up all targets
  updatedPlayer.targets.forEach(t => {
    t.stats.lethality += randomInRange(t.growth.lethality)
    t.stats.survival += randomInRange(t.growth.survival)
    t.stats.cool += randomInRange(t.growth.cool)
  })
  // level up player? No

  // update shop items
  updatedPlayer.shop = generateItems()

  // increase day
  updatedPlayer.day++
  return updatedPlayer
}