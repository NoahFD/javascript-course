'use strict';

const diceImage = document.querySelector('.dice');
const scoreEls = [document.querySelector('#score--0'), document.querySelector('#score--1')];
const currentEls = [document.querySelector('#current--0'), document.querySelector('#current--1')];
const playerBoxes = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const buttonNewGame = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let currentScores = [0, 0];
let totalScores = [0, 0];
let activePlayer = 0;
let isGameOver = false;

// Helper functions
function switchPlayer() {
    currentScores[activePlayer] = 0;
    currentEls[activePlayer].textContent = '0';
    playerBoxes[activePlayer].classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerBoxes[activePlayer].classList.add('player--active');
}

function resetGame() {
    currentScores = [0, 0];
    totalScores = [0, 0];
    activePlayer = 0;
    isGameOver = false;
    diceImage.classList.add('hidden');
    scoreEls.forEach(el => el.textContent = '0');
    currentEls.forEach(el => el.textContent = '0');
    playerBoxes.forEach(box => {
        box.classList.remove('player--winner');
        box.classList.remove('player--active');
    });
    playerBoxes[0].classList.add('player--active');
}

// Event listeners
buttonNewGame.addEventListener('click', resetGame);

buttonRoll.addEventListener('click', () => {
    if (isGameOver) return;

    diceImage.classList.remove('hidden');
    const roll = Math.floor(Math.random() * 6) + 1;
    diceImage.src = `dice-${roll}.png`;

    if (roll === 1) {
        switchPlayer();
    } else {
        currentScores[activePlayer] += roll;
        currentEls[activePlayer].textContent = currentScores[activePlayer];
    }
});

buttonHold.addEventListener('click', () => {
    if (isGameOver) return;

    totalScores[activePlayer] += currentScores[activePlayer];
    scoreEls[activePlayer].textContent = totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
        playerBoxes[activePlayer].classList.add('player--winner');
        diceImage.classList.add('hidden');
        isGameOver = true;
    } else {
        switchPlayer();
    }
});