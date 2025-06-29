const audio = document.getElementById('audio');
const fileInput = document.getElementById('file-input');
const playlist = document.getElementById('playlist');
const currentTitle = document.getElementById('current-title');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const volumeSlider = document.getElementById('volume');

let songs = [];
let currentIndex = 0;

fileInput.addEventListener('change', () => {
  songs = Array.from(fileInput.files);
  playlist.innerHTML = '';

  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    li.onclick = () => loadSong(index);
    playlist.appendChild(li);
  });

  loadSong(0);
});
function displaySongInPlaylist(songName) {
  const li = document.createElement('div');
  li.className = 'list-group-item bg-dark text-white border-secondary';
  li.textContent = songName;
  document.getElementById('playlist').appendChild(li);
}
function loadSong(index) {
  currentIndex = index;
  const song = songs[index];
  audio.src = URL.createObjectURL(song);
  currentTitle.textContent = song.name;
  audio.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function prevSong() {
  if (currentIndex > 0) {
    loadSong(currentIndex - 1);
  }
}

function nextSong() {
  if (currentIndex < songs.length - 1) {
    loadSong(currentIndex + 1);
  }
}

audio.addEventListener('timeupdate', () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalDurationDisplay.textContent = formatTime(audio.duration);
});

seekBar.addEventListener('input', () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
