let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}; 
//convert back to JS object and if it doesnt exist set default value (see 06-booleans.html)

// So if the left side is 'truthy', you use the left side, otherwise you use the right side e.g. if left is undefined or null.


updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (computerMove === 'rock' && playerMove === 'paper') {
    result = 'You win!';
  } else if (computerMove === 'rock' && playerMove === 'scissors') {
    result = 'You lose!';
  } else if (computerMove === 'paper' && playerMove === 'rock') {
    result = 'You lose!';
  } else if (computerMove === 'paper' && playerMove === 'scissors') {
    result = 'You win!';
  } else if (computerMove === 'scissors' && playerMove === 'rock') {
    result = 'You win!';
  } else if (computerMove === 'scissors' && playerMove === 'paper') {
    result = 'You lose!';
  } else if (computerMove === playerMove) {
    result = 'It\'s a tie!';
  }

  if (result === 'You lose!') {
    score.losses++;
  } else if (result === 'You win!') {
    score.wins++;
  } else if (result === 'It\'s a tie!') {
    score.ties++;
  }

  

  localStorage.setItem('score', JSON.stringify(score)); //This is because localStorage only supports strings, and JSON.stringify makes a string out of the object.

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `<div class="div-moves">
  <div class="div-text1">
    You
  </div>
  <div class="div-text2">
    Computer
  </div>
  <img class="foto-rps" src="afbeeldingen/10-afbeeldingen-rock-paper-scissors/${playerMove}.jpg">
  VS 
  <img class="foto-rps" src="afbeeldingen/10-afbeeldingen-rock-paper-scissors/${computerMove}.jpg">
  </div>`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-button-auto-play')
  .addEventListener('click', () => {
    autoPlay();
  });

document.querySelector('.js-button-reset-score')
  .addEventListener('click', () => {
    score.losses = 0;
    score.wins = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() =>{ //To stop the interval, you have to safe the interval, thus define it, and then stop the defined intervalID nu clearInterval().
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    document.querySelector('.js-button-auto-play').innerText = 'Stop Auto Play'
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-button-auto-play').innerText = 'Auto Play'
  }
  
}

