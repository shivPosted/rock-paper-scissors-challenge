'use-strict';
const rulesBtn = document.querySelector('.rules-btn');
const rulesOverlay = document.querySelector('.rules-overlay');
const closeRuleBtn = document.querySelector('.close-btn');
const bodyOverlay = document.querySelector('.overlay');

const initialChoiceContainer = document.querySelector('.choice--container');
const userChoiceDisplay = document.querySelector('.user--choice');
const computerChoiceDisplay = document.querySelector('.computer--choice');
const choiceDisplayContainer = document.querySelector('.play-choice-section');

const resultContainer = document.querySelector('.result-overlay');
const playAgainBtn = document.querySelector('.play-again-btn');

const scoreLabel = document.querySelector('.score--label');

const choiceMap = ['rock', 'paper', 'scissors'];

let score = 0;
scoreLabel.textContent = score;

const resultsDisplay = function (choiceNumUser, choiceNumComputer) {
  let resultStr;
  if (
    (choiceNumUser === 0 && choiceNumComputer === 1) ||
    (choiceNumUser === 1 && choiceNumComputer === 2) ||
    (choiceNumUser === 2 && choiceNumComputer === 0)
  ) {
    resultStr = 'YOU LOSE';
    if (score > 0) score--;
  } else if (choiceNumComputer === choiceNumUser) resultStr = "It's a draw";
  else {
    resultStr = 'YOU WON';
    score++;
  }
  resultContainer.querySelector('.result-status').textContent = resultStr;
  resultContainer.classList.remove('hidden');
  choiceDisplayContainer.classList.add('reveal-result');
  scoreLabel.textContent = score;
};

const displayChoices = function (choiceNumUser, choiceNumComputer) {
  userChoiceDisplay.textContent = computerChoiceDisplay.textContent = '';
  console.log(userChoiceDisplay, computerChoiceDisplay);
  const htmlUserChoice = `<div class="choice--icon ${choiceMap[choiceNumUser]}-container">
          <div class="choice--icon-circle">
            <img src="/images/icon-${choiceMap[choiceNumUser]}.svg" alt="" />
          </div>
        </div>`;

  const htmlComputerChoice = ` <div class="choice--icon ${choiceMap[choiceNumComputer]}-container">
          <div class="choice--icon-circle">
            <img src="/images/icon-${choiceMap[choiceNumComputer]}.svg" alt="" />
          </div>
        </div>`;
  userChoiceDisplay.insertAdjacentHTML('afterbegin', htmlUserChoice);
  computerChoiceDisplay.insertAdjacentHTML('afterbegin', htmlComputerChoice);
};

initialChoiceContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.choice--icon');
  if (!target) return;

  const choiceNumUser = +target.dataset.choice;
  const choiceNumComputer = Math.trunc(Math.random() * 3);

  setTimeout(() => {
    displayChoices(choiceNumUser, choiceNumComputer);
    choiceDisplayContainer.classList.remove('hidden');
    this.classList.add('hidden');
  }, 1000);
  setTimeout(() => {
    resultsDisplay(choiceNumUser, choiceNumComputer);
  }, 1500);
});

rulesBtn.addEventListener('click', function () {
  rulesOverlay.classList.remove('hidden');
  bodyOverlay.classList.remove('hidden');
});

closeRuleBtn.addEventListener('click', function () {
  // console.log('clicked');
  rulesOverlay.classList.add('hidden');
  bodyOverlay.classList.add('hidden');
});

playAgainBtn.addEventListener('click', function () {
  rulesOverlay.classList.add('hidden');
  bodyOverlay.classList.add('hidden');
  choiceDisplayContainer.classList.add('hidden');
  choiceDisplayContainer.classList.remove('reveal-result');
  resultContainer.classList.add('hidden');
  initialChoiceContainer.classList.remove('hidden');
});
