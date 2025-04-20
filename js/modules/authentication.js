import { getLocalToken, getLocalTokenPlayer } from "./storage.js";

export function isAuth() {
  // return current player data with storage token
  const currentPlayer = getLocalTokenPlayer()
  if (currentPlayer) {
    return currentPlayer
  } else {
    return null
  }
}