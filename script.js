let currentPlayer = 1;

// Roll Click Button Event
const rollBtn = document.querySelector("#roll-btn");
const holdBth = document.querySelector("#hold-btn");

rollBtn.addEventListener("click", () => {
  let number = Math.floor(Math.random() * 6) + 1;
  let diceImg = document.querySelector("#dice-img");
  diceImg.src = `./images/${number}.png`;
  updateScore(number);
});

const updateScore = (number) => {
  let currPlayer = document.querySelector(`#current-player${currentPlayer}`);
  if (number === 1) {
    currPlayer.textContent = 0;
    holdFunction();
  } else {
    currPlayer.textContent = parseInt(currPlayer.textContent) + number;
  }
  checkWinner(parseInt(currPlayer.textContent));
};

const checkWinner = (currScore) => {
  let scorePlayer = document.querySelector(`#score-player${currentPlayer}`);
  let totalScore = parseInt(scorePlayer.textContent) + currScore;
  if (totalScore >= 20) {
    let msg = document.querySelector("#message");
    msg.innerText = `Player ${currentPlayer} is Won !`;

    let retryBtn = document.createElement("button");
    retryBtn.innerText = "Retry";
    retryBtn.setAttribute("id", "retry-btn");
    msg.insertAdjacentElement("afterend", retryBtn);

    rollBtn.disabled = true;
    holdBth.disabled = true;

    let RetryBtn = document.querySelector("#retry-btn");

    RetryBtn.addEventListener("click", () => {
      retryBtn.remove();
      document.querySelector("#score-player1").innerText = 0;
      document.querySelector("#current-player1").innerText = 0;
      document.querySelector("#score-player2").innerText = 0;
      document.querySelector("#current-player2").innerText = 0;
      rollBtn.disabled = false;
      holdBth.disabled = false;
      let msg = document.querySelector("#message");
      msg.innerText = `Player 1's turn!`;
      currentPlayer = 1;
    });
  }
};

const holdFunction = () => {
  let currPlayer = document.querySelector(`#current-player${currentPlayer}`);
  let scorePlayer = document.querySelector(`#score-player${currentPlayer}`);
  scorePlayer.innerText =
    parseInt(scorePlayer.textContent) + parseInt(currPlayer.textContent);
  currPlayer.innerText = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  let msg = document.querySelector("#message");
  msg.innerText = `Player ${currentPlayer}'s turn!`;
};

holdBth.addEventListener("click", holdFunction);
