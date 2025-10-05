let display = document.getElementById('display');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let lapsList = document.getElementById('laps');

let interval;
let startTime;
let pausedElapsed = 0;
let isRunning = false;
let lapCount = 0;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now();
    interval = setInterval(() => {
        let currentElapsed = Date.now() - startTime + pausedElapsed;
        display.textContent = formatTime(currentElapsed);
    }, 10);
}

function stopTimer() {
    if (!isRunning) return;
    isRunning = false;
    pausedElapsed += Date.now() - startTime;
    clearInterval(interval);
    display.textContent = formatTime(pausedElapsed);
}

function resetTimer() {
    isRunning = false;
    pausedElapsed = 0;
    clearInterval(interval);
    display.textContent = formatTime(0);
    lapsList.innerHTML = '';
    lapCount = 0;
}

function addLap() {
    let currentTime;
    if (isRunning) {
        currentTime = Date.now() - startTime + pausedElapsed;
    } else {
        currentTime = pausedElapsed;
    }
    lapCount++;
    let li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${formatTime(currentTime)}`;
    lapsList.appendChild(li);
    lapsList.scrollTop = lapsList.scrollHeight;
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

// Initialize display
display.textContent = formatTime(0);
