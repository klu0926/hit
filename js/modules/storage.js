import { getCurrentTarget } from "./game.js"
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
      return null
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
  const target = getCurrentTarget()
  // win, gain rank (if target is higher rank)
  // if (result.isWon && player.rank < target.rank) {
  //   // player.rank = target.rank
  //   // push target to the end
  // }


  // set gold
  player.gold += result.gold

  // set day
  player.day++

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