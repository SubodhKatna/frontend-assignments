let [milliseconds, seconds, minutes] = [0, 0, 0];
let timerDisplay = document.getElementById("timer-display");
let interval = null;

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

function updateTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" + (milliseconds/10) : milliseconds/10);
    timerDisplay.innerHTML = `${m}:${s}:${ms}`;
}

startBtn.addEventListener("click", () => {
    if (interval !== null) {
        clearInterval(interval);
    }
    interval = setInterval(updateTimer, 10);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    [milliseconds, seconds, minutes] = [0, 0, 0];
    timerDisplay.innerHTML = "00:00:00";
});