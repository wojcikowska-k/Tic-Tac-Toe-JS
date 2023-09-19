const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const scoreCircle = document.querySelector("#score-circle");
const scoreCross = document.querySelector("#score-cross");
const reset = document.querySelector("#reset");
const newBoard = document.querySelector("#new-board");

const startCells = ["", "", "", "", "", "", "", "", ""];
const allElementsIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let usedElementsIds = [];

let go = "circle";
let winsCircle = 0;
let winsCross = 0;
localStorage.setItem("Circle's wins", winsCircle);
localStorage.setItem("Cross's wins", winsCross);
winsCircle = localStorage.getItem("Circle's wins");
winsCross = localStorage.getItem("Cross's wins");
scoreCircle.textContent = winsCircle;
scoreCross.textContent = winsCross;

infoDisplay.textContent = "Circle goes first";

const toggleInfoColor = (go) => {
  if (go === "circle") {
    infoDisplay.classList.add("info-circle");
    infoDisplay.classList.remove("info-cross");
  }
  if (go === "cross") {
    infoDisplay.classList.remove("info-circle");
    infoDisplay.classList.add("info-cross");
  }
};

const createBoard = () => {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo, { once: true });
    gameboard.appendChild(cellElement);
  });
};

const compute = () => {
  const freeIds = allElementsIds.filter(
    (val) => !usedElementsIds.includes(val)
  );

  const randomId = freeIds[Math.floor(Math.random() * freeIds.length)];
  const allsquares = document.querySelectorAll(".square");

  const randomSquare = allsquares[randomId];
  if (randomSquare === undefined) {
    return;
  }
  const goDisplay = document.createElement("div");
  goDisplay.classList.add("cross");
  randomSquare.append(goDisplay);

  usedElementsIds.push(randomId);

  randomSquare.replaceWith(randomSquare.cloneNode(true));
  checkScore();
};

const addGo = (e) => {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add("circle");
  e.target.append(goDisplay);

  const elementId = e.target.getAttribute("id");
  usedElementsIds.push(elementId);

  compute();
  checkScore();
};

const checkScore = () => {
  const allsquares = document.querySelectorAll(".square");
  const winnigCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winnigCombos.forEach((array) => {
    const circleWins = array.every((id) =>
      allsquares[id].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      toggleInfoColor("circle");
      winsCircle = Number(winsCircle) + 1;
      scoreCircle.textContent = winsCircle;
      allsquares.forEach(
        (square) => square.replaceWith(square.cloneNode(true)) //this way there is no more eventListener on the square
      );
      localStorage.setItem("Circle's wins", winsCircle);
      return;
    }
  });

  winnigCombos.forEach((array) => {
    const crossWins = array.every((id) =>
      allsquares[id].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      toggleInfoColor("cross");
      winsCross = Number(winsCross) + 1;
      scoreCross.textContent = winsCross;
      allsquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      localStorage.setItem("Cross's wins", winsCross);
      return;
    }
  });
};

createBoard();

const resetScore = () => {
  localStorage.clear();
  winsCircle = 0;
  winsCross = 0;
  scoreCircle.textContent = winsCircle;
  scoreCross.textContent = winsCross;
  localStorage.setItem("Circle's wins", winsCircle);
  localStorage.setItem("Cross's wins", winsCross);
};

reset.addEventListener("click", resetScore);
newBoard.addEventListener("click", () => {
  gameboard.innerHTML = "";
  createBoard();
  usedElementsIds = [];
});
