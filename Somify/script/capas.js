const audio = document.getElementById("audio");
const playBtn = document.querySelector(".fa-play-circle");
const prevBtn = document.querySelector(".fa-step-backward");
const nextBtn = document.querySelector(".fa-step-forward");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.querySelector(".time span:first-child");
const durationEl = document.querySelector(".time span:last-child");

let isPlaying = false;

// Carrega uma música (exemplo)
audio.src = "musicas/exemplo.mp3";

// Play / Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    } else {
        audio.play();
        playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    }
    isPlaying = !isPlaying;
});

// Atualiza progresso
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Clique na barra de progresso
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Função formatar tempo
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}
