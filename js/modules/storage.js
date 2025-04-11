// deal with all local storage data
const NPC_KEY = 'HIT_USERS'
const PLAYER_KEY = 'HIT_PLAYER'
const GAME_KEY = 'HIT_GAME'
const TOKEN_KEY = 'HIT_TOKEN' // current player id

export function getLocalNPC() {
  try {
    const NPCString = localStorage.getItem(NPC_KEY)
    if (NPCString) {
      return JSON.parse(NPCString)
    } else {
      return null
    }
  } catch (err) {
    console.error('[ERROR] NPCString:', err.message)
  }
}

export function setLocalNPC(NPCArray) {
  try {
    localStorage.setItem(NPC_KEY, JSON.stringify(NPCArray))
  } catch (err) {
    console.error('[ERROR] setLocalNPC:', err.message)
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

export function parseLocalToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const [name, id, timestamp] = token.split('&');
    return { name, id, timestamp };
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
    localStorage.removeItem(NPC_KEY)
    localStorage.removeItem(PLAYER_KEY)
    localStorage.removeItem(GAME_KEY)
    localStorage.removeItem(TOKEN_KEY)
  } catch (err) {
    console.error('[ERROR] clearLocal:', err.message)
  }
}