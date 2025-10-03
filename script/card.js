const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Lista de músicas
const songs = [
  { src: 'musica.mp3', titulo: 'Música 1' },
  { src: 'musica2.mp3', titulo: 'Música 2' }
];

let songIndex = 0;

// Carregar música
function loadSong(index) {
  audio.src = songs[index].src;
  audio.load();
}
loadSong(songIndex);

// Play/Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸'; // muda ícone
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// Atualiza barra de progresso
audio.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;

  // Atualizar tempo formatado
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// Controla progresso
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Botões prev/next
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
});

// Formatar tempo mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
