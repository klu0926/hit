const backgroundMusic = './assets/music/prism.mp3'
let bgAudio = null;
let _musicToggleButton
let isPlaying = false

function playBackgroundMusic() {
  const volume = 0.5
  if (!bgAudio) {
    bgAudio = new Audio(backgroundMusic);
    bgAudio.loop = true;
  }
  bgAudio.volume = volume;
  bgAudio.play();
  isPlaying = true
}

function stopAudio() {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    isPlaying = false

  }
}

function setAudioVolume(level) {
  if (bgAudio) {
    bgAudio.volume = level; //  0 - 1.0
  }
}


function musicToggle() {
  if (isPlaying) {
    stopAudio();
    _musicToggleButton.classList.add('off')
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
  } else {
    playBackgroundMusic();
    _musicToggleButton.classList.remove('off')
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
  }
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

  if (isPlaying) {
    _musicToggleButton.classList.remove('off')
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    _musicToggleButton.classList.add('off')
    _musicToggleButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
  }
  return _musicToggleButton
}