// deal with all local storage data
const TARGET_KEY = 'HIT_TARGET'
const PLAYER_KEY = 'HIT_PLAYER'
const GAME_KEY = 'HIT_GAME'
const TOKEN_KEY = 'HIT_TOKEN' // current player id

export function getLocalTargets() {
  try {
    const targets = localStorage.getItem(TARGET_KEY)
    if (targets) {
      return JSON.parse(targets)
    } else {
      return null
    }
  } catch (err) {
    console.error('[ERROR] getLocalTargets:', err.message)
  }
}

export function setLocalTargets(targetsArray) {
  try {
    localStorage.setItem(TARGET_KEY, JSON.stringify(targetsArray))
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

export function getLocalGame() {
  try {
    const gameString = localStorage.getItem(GAME_KEY)
    if (gameString) {
      return JSON.parse(gameString)
    } else {
      return null
    }
  } catch (err) {
    console.error('[ERROR] getLocalGame:', err.message)
  }
}

export function setLocalGame(gameObject) {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(gameObject))
  } catch (err) {
    console.error('[ERROR] setLocalGame:', err.message)
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
    localStorage.removeItem(GAME_KEY)
    localStorage.removeItem(TOKEN_KEY)
  } catch (err) {
    console.error('[ERROR] clearLocal:', err.message)
  }
}