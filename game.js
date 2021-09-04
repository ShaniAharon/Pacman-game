const WALL = "@";
const FOOD = ".";
const EMPTY = " ";
const FRUIT = "o";
const elScore = document.querySelector("span");

let gBoard;

let gState = {
  score: 0,
  isGameDone: false,
};

function init() {
  //   handleUserPref();
  gBoard = buildBoard();
  printMat(gBoard, ".boardContainer");
}

function buildBoard() {
  let SIZE = 15;
  let board = [];

  for (let i = 0; i < SIZE; i++) {
    board.push([]);
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      } else if (
        (i === 1 && j === 1) ||
        (i === 1 && j === 13) ||
        (i === 13 && j === 13) ||
        (i === 13 && j === 1)
      ) {
        board[i][j] = FRUIT;
      }
    }
  }
  createPacman(board);
  createGhosts(board);
  console.table(board);
  return board;
}

function printMat(mat, elSelector) {
  let strHtml = "";

  mat.forEach(function (cells) {
    strHtml += "<tr>";
    cells.forEach(function (cell) {
      strHtml += "<td>" + cell + "</td>";
    });
    strHtml += "</tr>";
  });
  let elMat = document.querySelector(elSelector);
  elMat.innerHTML = strHtml;
}

function checkEngage(cell, opponent) {
  let isGameOver = false;
  if (cell === opponent) {
    if (gPacman.isSuper) {
      console.log("Ghost is dead");
      console.log(gGhosts.length);
      killGhost(gBoard, opponent);
      return;
      //   clearInterval(gIntrevalGhosts);
    } else {
      clearInterval(gIntrevalGhosts);
      gState.isGameDone = true;
      console.log("Game Over!");
      isGameOver = true;
    }
  }
  return isGameOver;
}

// get coord and content and push into the board
function renderCell(location, content) {
  gBoard[location.i][location.j] = content;
  printMat(gBoard, ".boardContainer");
}

function updateScore() {
  gState.score++;
  elScore.innerText = gState.score;
}
