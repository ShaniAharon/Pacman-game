let gPacman;
const PACMAN = "&#9785";
const SUPER = "&#128523;";

function createPacman(board) {
  gPacman = {
    symbol: "&#9785",
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };

  board[gPacman.location.i][gPacman.location.j] = gPacman.symbol;
}

function movePacman(eventKeyboard) {
  if (gState.isGameDone) return;

  let nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (eventKeyboard.code) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
  }

  let nextCell = gBoard[nextLocation.i][nextLocation.j];
  // hitting a wall not moving anyWhare
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore();
    // check if win game
    if (gState.score === 154) {
      clearInterval(gIntrevalGhosts);
      gState.isGameDone = true;
      console.log("you Win!");
    }
  }

  // hitting FRUIT
  if (nextCell === FRUIT) {
    gPacman.isSuper = true;
    gPacman.symbol = SUPER;
    renderCell(gPacman.location, gPacman.symbol);
    setTimeout(function () {
      gPacman.isSuper = false;
      gPacman.symbol = PACMAN;
      renderCell(gPacman.location, gPacman.symbol);
    }, 5000);
  }

  //eat ghost when super
  if (nextCell === GHOST && gPacman.isSuper) {
    gGhosts.pop();
  }

  let isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;

  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  //render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  //Update the pacman MODEL to near location
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = gPacman.symbol;

  //render updated model to the DOM
  renderCell(gPacman.location, gPacman.symbol);
}
