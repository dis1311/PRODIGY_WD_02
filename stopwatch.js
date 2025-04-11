class Stopwatch {
    constructor(display, lapList) {
        this.display = display;
        this.lapList = lapList;
        this.reset();
    }

    reset() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.laps = [];
        this.updateDisplay();
        this.clearLaps();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
        }
    }

    lap() {
        if (this.isRunning) {
            const lapTime = this.formatTime(this.elapsedTime);
            this.laps.unshift(lapTime);
            this.updateLapDisplay();
        }
    }

    updateDisplay() {
        const currentTime = this.isRunning ? Date.now() - this.startTime : this.elapsedTime;
        this.display.textContent = this.formatTime(currentTime);
    }

    formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }

    clearLaps() {
        this.laps = [];
        this.updateLapDisplay();
    }

    updateLapDisplay() {
        this.lapList.innerHTML = '';
        this.laps.forEach((lap, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>Lap ${this.laps.length - index}</span><span>${lap}</span>`;
            this.lapList.appendChild(li);
        });
    }
}

// Initialize the stopwatch
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const lapTimes = document.getElementById('lapTimes');
    const stopwatch = new Stopwatch(display, lapTimes);

    // Add event listeners to buttons
    document.getElementById('startBtn').addEventListener('click', () => {
        stopwatch.start();
        document.getElementById('startBtn').textContent = 'Resume';
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        stopwatch.stop();
        document.getElementById('startBtn').textContent = 'Start';
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        stopwatch.reset();
        document.getElementById('startBtn').textContent = 'Start';
    });

    document.getElementById('lapBtn').addEventListener('click', () => {
        stopwatch.lap();
    });
});