import {
  getLocalPlayers,
  setLocalPlayers,
  removeLocalToken,
  setLocalToken
} from "../modules/storage.js";
import { resMessage } from "../../utils/resMessage.js";

// Simulate POST to create an account and store hashed user locally
export async function createAccount(name, password) {
  try {
    if (name.trim() === '') throw new Error('Missing name');
    if (password.trim() === '') throw new Error('Missing password');
    console.log('Creating new account...');

    // Using bcrypt CDN from index.html
    const salt = dcodeIO.bcrypt.genSaltSync(10);
    const hash = dcodeIO.bcrypt.hashSync(password, salt);

    // Simulate API POST (won’t store anything remotely)
    const res = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password: hash,
      })
    });

    const { id } = await res.json();

    // Create new player object
    const player = {
      id,
      name,
      password: hash,
      lethality: 100,
      survival: 100,
      cool: 0
    };

    // Append player to local players array
    const existingPlayers = getLocalPlayers() || [];
    existingPlayers.push(player);
    setLocalPlayers(existingPlayers);

    return resMessage(true, player, 'Account created');
  } catch (err) {
    console.error('[ERROR] createAccount:', err.message);
    return resMessage(false, null, err.message);
  }
}

// Simulate login by checking against stored hashed players
export async function login(name, password) {
  try {
    console.log('login...')
    if (name.trim() === '') throw new Error('Missing name');
    if (password.trim() === '') throw new Error('Missing password');

    const players = getLocalPlayers();
    if (!players || players.length === 0) {
      throw new Error('No saved player data');
    }

    // Find player with matching name
    const player = players.find(p => p.name === name);
    if (!player) throw new Error('User not found');

    // Check password
    const isMatch = dcodeIO.bcrypt.compareSync(password, player.password);
    if (!isMatch) throw new Error('Incorrect password');

    // Simulate login with dummy request
    await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'eve.holt@reqres.in', // placeholder (doesn't matter)
        password: 'cityslicka' // placeholder (doesn't matter)
      })
    });

    // Store login session token locally
    setLocalToken(player);

    return resMessage(true, player, 'Login successful');
  } catch (err) {
    console.error('[ERROR] login:', err.message);
    return resMessage(false, null, err.message);
  }
}

export function logout() {
  try {
    console.log('logout...')
    removeLocalToken();
    window.location.hash = '#/login';
  } catch (err) {
    console.error('[ERROR] logout:', err.message);
    return resMessage(false, null, err.message);
  }
}