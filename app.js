const gameBoard = document.querySelector("#gameboard");
const winnerDisplay = document.querySelector("#winner");
const restartBtn = document.querySelector(".reset");
// create the cells
let eachBox = ["", "", "", "", "", "", "", "", ""];
let start = "circle";
winnerDisplay.textContent = "Circle goes first";

//make a div for each of the cells on the board
function makeBoard() {
  eachBox.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("box");
    cellElement.id = index;
    cellElement.addEventListener("click", addXO);
    gameBoard.append(cellElement);
  });
}
makeBoard();

//make X or O
function addXO(e) {
  const xoDisplay = document.createElement("div");
  xoDisplay.classList.add(start);
  e.target.append(xoDisplay);
  start = start === "circle" ? "cross" : "circle";
  //if statement
  winnerDisplay.textContent = `It is now ${start}'s turn.`;
  e.target.removeEventListener("click", addXO);
  checkScore();
}

//check score
function checkScore() {
  const allBoxes = document.querySelectorAll(".box");
  winningLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //circle wins
  winningLine.forEach((array) => {
    const circleWin = array.every((cell) =>
      allBoxes[cell].firstChild?.classList.contains("circle")
    );

    if (circleWin) {
      winnerDisplay.textContent = "Circle Wins!!!";
      allBoxes.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });
  //cross wins
  winningLine.forEach((array) => {
    const crossWin = array.every((cell) =>
      allBoxes[cell].firstChild?.classList.contains("cross")
    );
    if (crossWin) {
      winnerDisplay.textContent = "Cross Wins!!!";
      allBoxes.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });
}

//this will show all players and make username and X or O
const state = {
  players: [],
  selectedPlayer: null,
};

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerName = event.target[0].value;
  const playerXO = event.target[1].value;

  const newPlayerObject = {
    Username: playerName,
    xOro: playerXO,
  };
  state.players.push(newPlayerObject);
  renderPlayers();
});

const allPlayersDiv = document.querySelector(".all-players");
const selectedPlayer = document.querySelector(".selected-player");

allPlayersDiv.addEventListener("click", (event) => {
  state.clickedOnPlayer = state.players[event.target.id];
  renderSelectedPlayer();
});

//Put the player names under all players
function renderSelectedPlayer() {
  selectedPlayer.innerHTML = `
  <ul>
      <li>${state.selectedPlayer.Username}</li>
      <li>${state.selectedPlayer.xOro}</li>
  </ul>
  `;
}

function renderPlayers() {
  allPlayersDiv.innerHTML = `
  ${state.players
    .map((player, i) => {
      return `
        <div id=${i}>${player.Username} ${player.xOro}</div>
    `;
    })
    .join("")}
  `;
}

renderPlayers();

//restart button
restartBtn.addEventListener("click", restart);

function restart() {
  eachBox = ["", "", "", "", "", "", "", "", ""];
  // gameBoard.full(null);
  // allBoxes.forEach((cell) => {
  //cell.innerText = "";
  // });
  gameBoard.innerHTML = null;
  makeBoard();
}
