import { getLocalTargets, setLocalTargets } from "../modules/storage.js";

export async function getTargets(count = 50) {
  try {
    const oldTargets = getLocalTargets()
    if (oldTargets) {
      console.log('getTarget: use old targets')
      return oldTargets
    }
    console.log('getTarget: fetch new targets...')

    // use random user api to get targets
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const res = await response.json();
    const targets = res.results

    // store target
    setLocalTargets(targets)

    console.log('Successfully get targets:', res.results);
    return targets;
  } catch (err) {
    console.error('[ERROR] getTargets:', err.message)
  }
}