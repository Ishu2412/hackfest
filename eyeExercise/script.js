const bubbleContainer = document.getElementById('bubble-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const gameDuration = 60;

let score = 0;
let timer = gameDuration;
let isGameRunning = false;
let gameInterval;

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.floor(Math.random() * 70) + 20;
    const x = Math.random() * (bubbleContainer.clientWidth - size);
    const y = Math.random() * (bubbleContainer.clientHeight - size);
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    
    bubble.addEventListener('click', () => {
        popBubble(bubble);
    });

    bubbleContainer.appendChild(bubble);
}

function popBubble(bubble) {
    bubbleContainer.removeChild(bubble);
    score += 1;
    scoreElement.textContent = score;
    popSound.play();
}
function updateTimer() {
    if (timer > 0) {
        timer -= 1;
        timerElement.textContent = timer + ' seconds';
    } else {
        endGame();
    }
}

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        timer = gameDuration;
        scoreElement.textContent = score;
        timerElement.textContent = timer + ' seconds';
        bubbleContainer.innerHTML = ''; 
        startButton.disabled = true;
        stopButton.disabled = false;
        gameInterval = setInterval(createBubble, 1000); 
        setInterval(updateTimer, 1000); 
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    alert('Game Over! Your Score: ' + score);
    startButton.disabled = false;
    stopButton.disabled = true;
}
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', endGame);
