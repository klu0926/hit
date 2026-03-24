const backgroundMusic = './assets/music/prism.mp3'
let bgAudio = null;
let _musicToggleButton
let currentLevel = 'mute' // mute | low | normal

const VOLUME_LEVELS = {
  mute: 0,
  low: 0.2,
  normal: 0.5,
}

function ensureAudio() {
  if (!bgAudio) {
    bgAudio = new Audio(backgroundMusic);
    bgAudio.loop = true;
  }
}

function playBackgroundMusic() {
  ensureAudio();
  bgAudio.play();
}

function pauseAudio() {
  if (bgAudio) {
    bgAudio.pause();
  }
}

function setAudioVolume(level) {
  ensureAudio();
  if (bgAudio) {
    bgAudio.volume = level; //  0 - 1.0
  }
}

function getNextLevel(level) {
  if (level === 'mute') return 'low'
  if (level === 'low') return 'normal'
  return 'mute'
}

function applyMusicLevel(level) {
  currentLevel = level
  if (currentLevel === 'mute') {
    pauseAudio()
  } else {
    setAudioVolume(VOLUME_LEVELS[currentLevel])
    playBackgroundMusic()
  }
  renderMusicButtonState()
}

function musicToggle() {
  const nextLevel = getNextLevel(currentLevel)
  applyMusicLevel(nextLevel)
}

function renderMusicButtonState() {
  if (!_musicToggleButton) return

  _musicToggleButton.classList.remove('off', 'low', 'normal')
  _musicToggleButton.classList.add(currentLevel)

  if (currentLevel === 'mute') {
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
    _musicToggleButton.title = 'Music: mute'
    return
  }

  if (currentLevel === 'low') {
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-low"></i>'
    _musicToggleButton.title = 'Music: low'
    return
  }

  _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
  _musicToggleButton.title = 'Music: normal'
}

export function musicToggleButton() {
  if (_musicToggleButton) {
    _musicToggleButton.remove()
    _musicToggleButton = null
  }
  const app = document.querySelector('#app');

  _musicToggleButton = document.createElement('button');

  _musicToggleButton.classList.add('music-toggle-btn');

  _musicToggleButton.addEventListener('click', musicToggle)
  renderMusicButtonState()
  return _musicToggleButton
}
