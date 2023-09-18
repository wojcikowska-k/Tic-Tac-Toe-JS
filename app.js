const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
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

const addGo = (e) => {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "Now it is " + go + "'s turn.";
  toggleInfoColor(go);
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
      allsquares.forEach(
        (square) => square.replaceWith(square.cloneNode(true)) //this way there is no more eventListener on the square
      );
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
      allsquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
};

createBoard();
