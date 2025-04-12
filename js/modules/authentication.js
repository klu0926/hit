import { getLocalToken, getLocalTokenPlayer } from "./storage.js";

export function isAuth() {
  console.log('Authenticating...')
  const player = getLocalTokenPlayer()
  if (player) {
    console.log('Authenticated!')
    console.log('current player:', player)
    return player
  } else {
    console.log('Fail to Authenticated, back to login page')
    return null
  }
}