import { getLocalToken, getLocalTokenPlayer } from "./storage.js";

export function isAuth() {
  console.log('Authenticating...')

  // return current player data with storage token
  const currentPlayer = getLocalTokenPlayer()
  if (currentPlayer) {
    console.log('Authenticated!')
    console.log('current player:', currentPlayer)
    return currentPlayer
  } else {
    console.log('Fail to Authenticated, back to login page')
    return null
  }
}