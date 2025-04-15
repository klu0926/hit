import { getLocalTargets, setLocalTargets } from "../modules/storage.js";
import { bulkTargetsCreate } from "../modules/characterCreate.js";

export async function getTargets(count = 87) {
  try {
    const oldTargets = getLocalTargets()
    if (oldTargets) {
      return oldTargets
    }
    // use random user api to get targets
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const res = await response.json();
    const people = res.results

    // convert them to target with stats
    const targets = bulkTargetsCreate(people)

    // store target
    setLocalTargets(targets)

    return targets;
  } catch (err) {
    console.error('[ERROR] getTargets:', err.message)
  }
}