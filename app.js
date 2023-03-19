const gameBoard = document.querySelector("#gameboard"); // gameBoard = the id of "gameboard" in HTML
const winnerDisplay = document.querySelector("#winner"); // winnerDisplay = the id of "winner" in HTML
const restartBtn = document.querySelector(".reset"); //restartBtn = the class of "reset" in HTML
// create the cells
let isWinner = false;
let eachBox = ["", "", "", "", "", "", "", "", ""]; // this is each cell in the box that is empty
let start = "circle"; // this states that circle goes first
winnerDisplay.textContent = "Circle goes first"; // this displays the text "circle goes first" where winnerDisplay is.

//make a div for each of the cells on the board

function makeBoard() {
  //function makeBoard
  eachBox.forEach((cell, index) => {
    //eachBox has a cell and index parameter.
    const cellElement = document.createElement("div"); //cellElement is equal to the new div element
    cellElement.classList.add("box"); // I am adding a class of "box" to the new div element(cellElement)
    cellElement.id = index; //cellElement's id is equal is equal to the index parameter
    cellElement.addEventListener("click", addXO); //adding an event listener to each cell (cellElement) for everytime we click, it adds X or O (function addXO)
    gameBoard.append(cellElement); //I am appending cellElement as a child of gameBoard
  });
}
makeBoard(); //calling makeBoard

//make X or O
function addXO(e) {
  if (!isWinner) {
    //this is the function addXO with an event as a parameter
    const xoDisplay = document.createElement("div"); //creating a new div element named "xoDisplay"
    xoDisplay.classList.add(start); //xoDisplay has the class of start(line 6) that says start = "circle"
    e.target.append(xoDisplay); // event listener that says whenever I click on the cell, it appends xoDisplay to each cell(cellElement)
    //console.log(e.target); this logs the div of xoDisplay
    start = start === "circle" ? "cross" : "circle"; // this says start = if start is deep equals to "circle" and is true(?) then return "cross" if else(:) return "circle"
    // this overrides start(line 6)
    winnerDisplay.textContent = `It is now ${start}'s turn.`; // it will say whos turn it is when circle goes first, ("it is now cross turn"), after ("it is now circle turn")
    e.target.removeEventListener("click", addXO); // this says that we remove the eventlistener from the target so we cant put a cross where a circle is placed
    checkScore(); // this checks the score when someone wins or it is a tie and user must reset
    //checkScore2();
  }
}

//check score
console.log("hello");
function checkScore() {
  //function of checkScore that tells us who wins
  const allBoxes = document.querySelectorAll(".box"); // allBoxes = the class of "box"
  winningLine = [
    // this is all the possible ways the user can win. it is an array of the board
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
    // this is saying for each array in the winningLine (lines 43-50)
    const circleWin = array.every(
      (
        cell // this is saying circleWin = every cell in the array of the winningLine   .every test if it is true that the array has cell
      ) =>
        allBoxes[cell].firstChild !== null && // this is saying that each cell in allBoxes has a firstChild that does not equal to null;
        allBoxes[cell].firstChild.classList.contains("circle") // this is saying that allBoxes with the parameter(cell) that we are passing through using a callback funciton, then getting the first child from allBoxes, then we are checking if the class contains "circle"
      //.contains returns a boolean value to see if the first child of allBoxes has the class of "circle"
    );

    if (circleWin) {
      //this is an if statement for circleWin(line 55)
      isWinner = true; // this is saying that we are changing the value of isWinner to true, that was false in the beginning.
      winnerDisplay.textContent = "Circle Wins!!!"; //if circle wins, then it will display the text "Circle Wins!!!"
      return;
    }
  });

  //cross wins
  winningLine.forEach((array) => {
    // this is saying for each array in winningLine
    const crossWin = array.every(
      (
        cell //crossWin is equal to every cell in the array of winningLine
      ) =>
        allBoxes[cell].firstChild !== null && // this is also saying that each cell in allBoxes has a first child that does not equal to null;
        allBoxes[cell].firstChild.classList.contains("cross") //each cell(parameter) of all boxes, that is the first child and has a class of "cross"
    ); // i put a ? next to first child also here but it was again a typo because I copied and pasted
    if (crossWin) {
      // this is saying if cross wins
      isWinner = true; // this is changing isWinner, which was false in the beginning
      winnerDisplay.textContent = "Cross Wins!!!"; // if cross wins, it will display "Cross Wins!!!"
      return;
    }
  });
}

//this will show all players and make username and X or O
console.log("hello");
const state = {
  //state is equal to an array with players and the selected player is null.
  players: [], //players is set to empty
  selectedPlayer: null, //selectedPlayer is set to null
};

const form = document.querySelector("form"); //form is equal to the HTML element <form>
console.log(form);
form.addEventListener("submit", (event) => {
  //adding an event listener to form saying everytime we press the button "submit", it will do an event.
  event.preventDefault(); // preventDefault will prevent the button from submitting a form
  const playerName = event.target[0].value; // this says that the player name will show up first(target[0]) and will have the value of the name
  const playerXO = event.target[1].value; // this says that the playerXO, or what the player wants to play, will show up second because of target[1] and will have the value of X or O

  const newPlayerObject = {
    // newPlayerObject has the username = the playerName(line 99) and xOro = playerXO (line100)
    Username: playerName,
    xOro: playerXO,
  };
  state.players.push(newPlayerObject); // this will push the newPlayerObject to the state in line 89 so that it shows the playerName and playerXO
  renderPlayers(); // this is the function on line 128
});

const allPlayersDiv = document.querySelector(".all-players"); //allPlayersDiv is equal to the class of ".all-players" in css
const selectedPlayer = document.querySelector(".selected-player"); //selectedPlayer is equal to the class of ".selected-player" in css

allPlayersDiv.addEventListener("click", (event) => {
  //allPlayersDiv has an event listener that says everytime we click, an event happends to allPlayersDiv.
  state.clickedOnPlayer = state.players[event.target.id]; //state.clickedOnPlayer is equal to the players in the state object
  renderSelectedPlayer(); // this is the function renderSelectedPlayer so we can call on it on line 119
});

//Put the player names under all players
function renderSelectedPlayer() {
  // function of renderSelected players
  selectedPlayer.innerHTML = ` 
  <ul>
      <li>${state.selectedPlayer.Username}</li>
      <li>${state.selectedPlayer.xOro}</li>
  </ul>
  `; // this is saying the the class of .selected-player, we are putting HTML on the page so it reads the username and X or O using back tics
}

function renderPlayers() {
  // this is the function of renderPlayers
  allPlayersDiv.innerHTML = ` 
  ${state.players // we are writting HTML for allPlayersDiv
    .map((player, i) => {
      //map through all of our players and for each player, they are going to have an index. we are returning the array
      return `
        <div id=${i}>${player.Username} ${player.xOro}</div>
    `; // giving an id to the div of our index the the .map(parameter) and our div has the username and the player X or O
    })
    .join("")}
  `; //we get rid of the comma using .join
}

renderPlayers(); // we are calling the function of renderPlayers

//restart button
restartBtn.addEventListener("click", restart); //we are adding a event listener to the restart button so that every time we click it, it will restart

function restart() {
  // this is the function called restart
  isWinner = false;
  eachBox = ["", "", "", "", "", "", "", "", ""]; // this funciton will have all the boxes in the gameboard to go back to empty
  // gameBoard.full(null);
  // allBoxes.forEach((cell) => {
  //cell.innerText = "";
  // });
  gameBoard.innerHTML = null; // the HTML of the gameBoard is going to equal to null when we hit the restart button.
  makeBoard(); // we are calling the funciton makeBoard() so we can play again.
}

///////
// function computer {
//   generate random index/state = ""
//   if(''){
//     compuer can write in the space
//   } else {
//     regenerate random index and try again
//   }
/////
