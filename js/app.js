/*
 *
 *
 *
 * */

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Set focus to input element after DOM has loaded
document.addEventListener('DOMContentLoaded', () => guessInput.focus());

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  if ( isNaN(guess) || guess < min || guess > max) {
    setMessage(`Plase enter a number between ${min} and ${max}`, 'blue');
  }

  // Check if won
  if (guess === winningNum) {
    // Disable input
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Player lost 
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues
      guessInput.style.borderColor = 'red';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      guessInput.value = '';
      guessInput.focus();
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = color;

  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'Play again?';
  guessBtn.className += 'play-again';
  guessBtn.focus();
}

function getRandomNum(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
