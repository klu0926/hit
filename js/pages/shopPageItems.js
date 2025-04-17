const itemTypes = ["weapon", "gear", "gadget", "suit"];

const typeIcons = {
  weapon: '<i class="fa-solid fa-gun"></i>',
  gear: '<i class="fa-solid fa-shield-halved"></i>',
  gadget: '<i class="fa-solid fa-toolbox"></i>',
  suit: '<i class="fa-solid fa-user-tie"></i>'
};

const namePool = {
  weapon: ["Blaster", "Reaper", "Viper", "Phantom", "Destructor", "Cobra", "Venom", "Rogue", "Warden", "Dagger"],
  gear: ["ArmorX", "ShieldCore", "PulseVest", "Defender", "TitanShell", "Fortress", "EchoRig", "Sentinel", "NanoGear", "Hardplate"],
  gadget: ["MultiTool", "HackChip", "StealthOrb", "PulseLink", "Tracker", "GhostEye", "NanoBot", "GlitchDrive", "SmartPatch", "ZapBox"],
  suit: ["AgentSuit", "VelvetVoid", "MidnightWeave", "EchoFiber", "ShadowCloak", "PhantomSkin", "SilkCircuit", "NeonVeil", "QuantumWear", "Stylus"]
};

const statRules = {
  weapon: {
    lethality: [10, 30],
    survival: [0, 0],
    cool: [0, 2],
    coolChance: 0.2
  },
  gear: {
    lethality: [0, 0],
    survival: [10, 30],
    cool: [0, 2],
    coolChance: 0.2
  },
  gadget: {
    lethality: [1, 10],
    survival: [1, 10],
    cool: [1, 3],
    coolChance: 1
  },
  suit: {
    lethality: [0, 0],
    survival: [1, 5],
    cool: [5, 10],
    coolChance: 1
  }
};

// Control the worth of item
const minPrice = 2000;
const maxPrice = 10000;

const pricePerPoint = {
  lethality: 200,
  survival: 200,
  cool: 500
};

function calculatePrice(stats) {
  return (
    stats.lethality * pricePerPoint.lethality +
    stats.survival * pricePerPoint.survival +
    stats.cool * pricePerPoint.cool
  );
}

// Pick a random int within range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateItems(amount = 12) {
  const result = [];

  // generate
  for (let i = 0; i < amount; i++) {
    // pick a random type (using item types)
    const type = itemTypes[getRandomInt(0, itemTypes.length - 1)];
    // get the stat rule for the type
    const rule = statRules[type];

    let stats, price;

    // use do while loop just in case price condition met the first time
    do {
      stats = {
        lethality: getRandomInt(...rule.lethality),
        survival: getRandomInt(...rule.survival),
        cool: Math.random() < rule.coolChance ? getRandomInt(...rule.cool) : 0
      };
      price = calculatePrice(stats);
      // make sure is within price range
    } while (price < minPrice || price > maxPrice);

    // randomly pick a name for the item
    const nameList = namePool[type];
    const name = nameList[getRandomInt(0, nameList.length - 1)];

    // icons
    const icon = typeIcons[type]

    // push to array
    result.push({ name, type, stats, price, icon });
  }

  return result;
}