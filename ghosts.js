const GHOST = "&#9781";

let gIntrevalGhosts;
let gGhosts;

function createGhosts(board) {
  gGhosts = [];

  createGhost(board);
  createGhost(board);

  gIntrevalGhosts = setInterval(function moveGhosts() {
    gGhosts.forEach(function moveGhost(ghost) {
      let nextLocation = {
        i: ghost.location.i + getRandomIntInclusive(-1, 1),
        j: ghost.location.j + getRandomIntInclusive(-1, 1),
      };

      //if got 0,0 pass on this move
      if (
        nextLocation.i === ghost.location.i &&
        nextLocation.j === ghost.location.i
      )
        return;
      if (board[nextLocation.i][nextLocation.j] === WALL) return;
      if (board[nextLocation.i][nextLocation.j] === GHOST) return;
      //dont attack super pacman
      if (board[nextLocation.i][nextLocation.j] === SUPER) {
        console.log("super");
        return;
      }

      let isGameOver = checkEngage(
        board[nextLocation.i][nextLocation.j],
        PACMAN
      );
      // console.log(isGameOver);
      if (isGameOver) {
        console.log("you Lose");
        //   console.log("inside");
        //   nextLocation.i = 3;
        //   nextLocation.j = 3;
      }

      //set back what we stepped on
      board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
      // get coord and content and push into the board
      renderCell(ghost.location, ghost.currCellContent);

      //move the ghost
      ghost.location = nextLocation;

      //keep the content of the cell we are going to
      ghost.currCellContent = board[ghost.location.i][ghost.location.j];

      //move the ghost model and update dom
      board[ghost.location.i][ghost.location.j] = GHOST;
      renderCell(ghost.location, GHOST);
    });
  }, 500);
}

function createGhost(board) {
  let ghost = {
    // color: getRandomColor(),
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function killGhost(board) {
  //TODO: try to fix
  setTimeout(function () {
    createGhost(board);
  }, 3000);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
