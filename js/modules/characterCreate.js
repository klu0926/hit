import { simplifyUsers } from "./simpleUsers.js";

// Create base character on game start 
const npcTier = {
  weak: {
    lethality: [80, 120],
    survival: [80, 120],
    growth: {
      lethality: [5, 10],
      survival: [3, 6]
    }
  },
  mid: {
    lethality: [150, 200],
    survival: [130, 180],
    growth: {
      lethality: [10, 15],
      survival: [6, 10]
    }
  },
  elite: {
    lethality: [250, 300],
    survival: [200, 250],
    growth: {
      lethality: [15, 25],
      survival: [10, 15]
    }
  }
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTargetStats(tier) {
  const config = npcTier[tier];
  if (!config) {
    throw new Error(`Invalid tier: ${tier}`);
  }

  return {
    tier,
    level: 1,
    stats: {
      lethality: randomInRange(...config.lethality),
      survival: randomInRange(...config.survival)
    },
    growthRate: {
      lethality: randomInRange(...config.growth.lethality),
      survival: randomInRange(...config.growth.survival)
    }
  };
}

// for player
export function playerCreate(player) {
  const playerStats = generateTargetStats('weak');

  return {
    id: player.id,
    name: player.name,
    password: player.password,
    avatar: "./assets/images/avatar/player-avatar.png",
    gold: 0,
    gears: [],
    ...playerStats
  };
}

// for targets NPC
export function bulkTargetsCreate(userArray) {
  // remove all unused data
  const targets = simplifyUsers(userArray)

  // caculate targget tier count
  const total = targets.length;
  const eliteCount = Math.floor(total * 0.1);
  const midCount = Math.floor(total * 0.3);
  const weakCount = total - eliteCount - midCount;

  // Assign tiers and stats
  for (let i = 0; i < targets.length; i++) {
    let tier = 'weak';
    if (i < eliteCount) tier = 'elite';
    else if (i < eliteCount + midCount) tier = 'mid';

    // set stats based on tier
    const npcStats = generateTargetStats(tier);
    Object.assign(targets[i], npcStats);

    // set avatar
    if (targets[i].gender === 'male') {
      const maleAvatars = [
        './assets/images/avatar/male-1.png',
        './assets/images/avatar/male-2.png'
      ];
      targets[i].avatar = maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
    } else {
      const femaleAvatars = [
        './assets/images/avatar/female-1.png',
        './assets/images/avatar/female-2.png'
      ];
      targets[i].avatar = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
    }
  }
  return targets
}
