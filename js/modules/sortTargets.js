import { getLocalTokenPlayer, setTokenPlayer, setLocalTargets } from "./storage.js";

export function sortTargets() {
  const player = getLocalTokenPlayer();

  if (!player || !player.targets) {
    console.warn('[WARNING] No player or targets found');
    return [];
  }

  // Combine player + targets
  let sortedMix = [player, ...player.targets];

  // sort with leth
  if (!sortedMix[0].rank) {
    // Sort by lethality and assign ranks
    sortedMix = sortedMix.sort((a, b) => b.stats.lethality - a.stats.lethality);
    sortedMix.forEach((t, i) => {
      t.rank = i + 1;
    });

    // Update player's rank from sortedMix
    const updatedPlayer = sortedMix.find(t => Number(t.id) === Number(player.id));
    const updatedTargets = sortedMix.filter(t => Number(t.id) !== Number(player.id));

    // Update localStorage
    setTokenPlayer(updatedPlayer);
    setLocalTargets(updatedTargets);

    return sortedMix;
  } else {
    // Just sort by rank
    return sortedMix.sort((a, b) => a.rank - b.rank);
  }
}



