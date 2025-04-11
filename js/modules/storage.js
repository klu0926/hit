// deal with all local storage data
const USERS_KEY = 'HIT_USERS'
const PLAYER_KEY = 'HIT_PLAYER'
const GAME_KEY = 'HIT_GAME'

export function getLocalUsers() {
  try {
    const usersString = localStorage.getItem(USERS_KEY)
    if (usersString) {
      return JSON.parse(usersString)
    } else {
      return []
    }
  } catch (err) {
    console.error('getLocalUser:', err.message)
  }
}

export function setLocalUsers(usersArray) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersArray))
  } catch (err) {
    console.error('setLocalUsers:', err.message)
  }
}


export function getLocalPlayer() {
  try {
    const playerString = localStorage.getItem(PLAYER_KEY)
    if (playerString) {
      return JSON.parse(playerString)
    } else {
      return {}
    }
  } catch (err) {
    console.error('getLocalPlayer:', err.message)
  }
}

export function setLocalPlayer(playerObject) {
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(playerObject))
  } catch (err) {
    console.error('setLocalPlayer:', err.message)
  }
}

export function getLocalGame() {
  try {
    const gameString = localStorage.getItem(GAME_KEY)
    if (gameString) {
      return JSON.parse(gameString)
    } else {
      return {}
    }
  } catch (err) {
    console.error('getLocalGame:', err.message)
  }
}

export function setLocalGame(gameObject) {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(gameObject))
  } catch (err) {
    console.error('setLocalGame:', err.message)
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(USERS_KEY)
    localStorage.removeItem(PLAYER_KEY)
    localStorage.removeItem(GAME_KEY)
  } catch (err) {
    console.error('clearLocal:', err.message)
  }
}