document.addEventListener('DOMContentLoaded', () => {
    const maxNumberInput = document.getElementById('max-number');
    const startGameButton = document.getElementById('start-game');
    const gameContainer = document.getElementById('game');
    const setupContainer = document.getElementById('setup');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const timerElement = document.getElementById('timer');
    const finalScoreElement = document.getElementById('final-score');
    const gameOverContainer = document.getElementById('game-over');
    const restartGameButton = document.getElementById('restart-game');
    const endGameButton = document.getElementById('end-game');
  
    let maxNumber = 10;
    let score = 0;
    let highScore = 0;
    let timeLeft = 60; // 2 minutes default
    let timer;
    let currentQuestion;
  
    function generateQuestion() {
      const num1 = Math.floor(Math.random() * (maxNumber + 1));
      const num2 = Math.floor(Math.random() * (maxNumber + 1));
      currentQuestion = { num1, num2, answer: num1 + num2 };
      questionElement.textContent = `What is ${num1} + ${num2}?`;
    }
  
    function startGame() {
      score = 0;
      scoreElement.textContent = score;
      timeLeft = 60; // Reset time
      timerElement.textContent = `Time Left: ${timeLeft}s`;
      setupContainer.classList.add('hidden');
      gameOverContainer.classList.add('hidden');
      gameContainer.classList.remove('hidden');
      generateQuestion();
      startTimer();
    }
  
    function checkAnswer() {
      const userAnswer = parseInt(answerInput.value, 10);
      if (userAnswer === currentQuestion.answer) {
        playSound('correct');
        score++;
      } else {
        playSound('wrong');
        score--;
      }
      scoreElement.textContent = score;
      answerInput.value = '';
      generateQuestion();
    }
  
    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timer);
          endGame();
        }
      }, 1000);
    }
  
    function endGame() {
      clearInterval(timer);
      gameContainer.classList.add('hidden');
      gameOverContainer.classList.remove('hidden');
      finalScoreElement.textContent = score;
  
      if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        showConfetti();
      }
    }
  
    function playSound(type) {
      const audio = new Audio(type === 'correct' ? 'correct.mp3' : 'wrong.mp3');
      audio.play();
    }
  
    function showConfetti() {
      const confettiSettings = { target: 'my-canvas', max: 150, size: 1.2, clock: 25 };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      setTimeout(() => confetti.clear(), 5000); // Clear confetti after 5 seconds
    }
  
    restartGameButton.addEventListener('click', startGame);
    startGameButton.addEventListener('click', () => {
      maxNumber = parseInt(maxNumberInput.value, 10) || 10;
      startGame();
    });
  
    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });
  
    endGameButton.addEventListener('click', endGame);
  });
  