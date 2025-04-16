import { getCurrentTarget, setCurrentTarget } from "./game.js"
import { EVENTS, dispatchEvent } from "../events.js"
// deal with all local storage data
const TARGET_KEY = 'HIT_TARGET'
const PLAYER_KEY = 'HIT_PLAYER'
const TOKEN_KEY = 'HIT_TOKEN' // current player id

export function getLocalTargets() {
  try {
    const player = getLocalTokenPlayer()
    return player.targets
  } catch (err) {
    console.error('[ERROR] getLocalTargets:', err.message)
  }
}
export function setLocalTargets(targets) {
  try {
    const player = getLocalTokenPlayer()
    player.targets = targets
    setTokenPlayer(player)
  } catch (err) {
    console.error('[ERROR] targetsArray:', err.message)
  }
}

export function getLocalPlayers() {
  try {
    const playerString = localStorage.getItem(PLAYER_KEY)
    if (playerString) {
      return JSON.parse(playerString)
    } else {
      return []
    }
  } catch (err) {
    console.error('[ERROR] getLocalPlayers:', err.message)
  }
}

export function setLocalPlayers(playerArray) {
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(playerArray))
  } catch (err) {
    console.error('[ERROR] setLocalPlayers:', err.message)
  }
}

export function getLocalToken() {
  try {
    const tokenString = localStorage.getItem(TOKEN_KEY)
    if (tokenString) {
      return tokenString
    } else {
      return null
    }
  } catch (err) {
    console.error('[ERROR] getLocalToken:', err.message)
  }
}

export function getLocalTokenPlayer() {
  try {
    console.log('Getting player data with token...')
    const token = getLocalToken()
    if (!token) {
      console.warn('No saved token')
      return null;
    }
    const [name, id, timestamp] = token.split('&');

    // find player
    const players = getLocalPlayers()
    const currentPlayer = players.find(p => Number(p.id) === Number(id))
    if (!currentPlayer) {
      console.warn('Cannot find current player with token')
      return null
    }
    return currentPlayer;
  } catch (err) {
    console.error('[ERROR] parseLocalToken:', err.message)
  }
}

export function setTokenPlayer(player) {
  try {
    console.log('Updating player data with token...');
    const token = getLocalToken();
    if (!token) {
      console.warn('No saved token');
      return;
    }

    const [name, id, timestamp] = token.split('&');
    const players = getLocalPlayers();

    const index = players.findIndex(p => Number(p.id) === Number(id));
    if (index === -1) {
      console.warn('Cannot find player in local storage to update');
      return;
    }

    // Replace with new player data
    players[index] = player;

    // Save updated players array
    setLocalPlayers(players);
    console.log('Player data updated.');

    // [Custome Event Dispatch]
    dispatchEvent(EVENTS.SET_PLAYER)
  } catch (err) {
    console.error('[ERROR] setTokenPlayer:', err);
  }
}

export function afterCombatTokenPlayerSave(result) {
  const player = getLocalTokenPlayer()
  const currentTarget = result.currentTarget
  const targets = getLocalTargets()

  // Win Combat
  if (result.isWon) {
    if (Number(player.rank) > Number(currentTarget.rank)) {
      player.rank = currentTarget.rank
    }

    // push target to the end
    currentTarget.isDead = true
    const index = targets.findIndex(t => t.id === currentTarget.id)
    targets.splice(index, 1)

    // sort targets on rank
    targets.sort((a, b) => a.rank - b.rank);

    // update rank
    for (let i = 0; i < targets.length; i++) {
      const rank = targets[i].rank = i + 1
      if (rank === player.rank) continue
      if (targets[i].isDead) continue
      targets[i].rank = i + 1
    }
    // push dead target to the end
    currentTarget.rank = targets.length
    targets.push(currentTarget)

    // update player targets
    player.targets = targets

    // empty current target
    setCurrentTarget(null)
  }
  // set gold
  player.gold += result.gold

  // set day
  player.day++

  // save
  setTokenPlayer(player)
}


// TOKEN
export function setLocalToken(player) {
  try {
    const token = `${player.name}&${player.id}&${new Date().toISOString()}`
    localStorage.setItem(TOKEN_KEY, token)
  } catch (err) {
    console.error('[ERROR] setLocalToken:', err.message)
  }
}

export function removeLocalToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (err) {
    console.error('[ERROR] removeLocalToken:', err.message)
  }
}

export function removeAllLocal() {
  try {
    localStorage.removeItem(TARGET_KEY)
    localStorage.removeItem(PLAYER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  } catch (err) {
    console.error('[ERROR] clearLocal:', err.message)
  }
}