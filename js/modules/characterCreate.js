import { simplifyUsers } from "./simpleUsers.js";
import { randomInRange } from "../../utils/randomInRange.js";

const START_GOLD = 5000 // player start gold


// Create base character on game start 
const npcTier = {
  weak: {
    lethality: [50, 150],
    survival: [50, 120],
    cool: [20, 60],
    growth: {
      lethality: [5, 10],
      survival: [1, 3],
      cool: [1, 3],
    }
  },
  mid: {
    lethality: [200, 300],
    survival: [130, 180],
    cool: [50, 100],
    growth: {
      lethality: [5, 15],
      survival: [1, 6],
      cool: [1, 6],
    }
  },
  elite: {
    lethality: [350, 400],
    survival: [300, 350],
    cool: [80, 120],
    growth: {
      lethality: [15, 25],
      survival: [1, 10],
      cool: [1, 10],
    }
  }
};

export function generateTargetStats(tier) {
  const config = npcTier[tier];
  if (!config) {
    throw new Error(`Invalid tier: ${tier}`);
  }

  return {
    tier,
    level: 1,
    stats: {
      lethality: randomInRange(config.lethality),
      survival: randomInRange(config.survival),
      cool: randomInRange(config.cool)
    },
    // growth is [min, max]
    growth: {
      lethality: config.growth.lethality,
      survival: config.growth.survival,
      cool: config.growth.cool
    }
  };
}

// for player
export function playerCreate(player) {

  const playerStats = generateTargetStats('weak');
  // Player bonus stats
  playerStats.stats.lethality += 0;
  playerStats.stats.survival += 100;
  playerStats.stats.cool += 100

  return {
    id: player.id,
    name: player.name,
    password: player.password,
    avatar: "./assets/images/avatar/player-avatar.png",
    gold: START_GOLD, // start gold
    gears: [],
    rank: 0, // set up when game run
    day: 1,  // each player progression
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

    // set up isTerminated boolean
    targets[i].isDead = false
  }
  return targets
}
