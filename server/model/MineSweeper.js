const { log } = require('../util/logger');

const FLAG = '⛳';
const MINE = '💣';

/*
Recur for all 8 adjacent cells

    N.W   N   N.E
      \   |   /
          \  |  /
    W----Cell----E
         / | \
       /   |  \
    S.W    S   S.E

Cell-->Current Cell (row, col)
N -->  North        (row-1, col)
S -->  South        (row+1, col)
E -->  East         (row, col+1)
W -->  West         (row, col-1)
N.E--> North-East   (row-1, col+1)
N.W--> North-West   (row-1, col-1)
S.E--> South-East   (row+1, col+1)
S.W--> South-West   (row+1, col-1)
*/

// A Function to initialise the game
const buildBoard = (size) => {
  const board = [];

  // Assign all the cells as mine-free
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!board[i]) {
        board[i] = [];
      }
      board[i][j] = '-';
    }
  }

  return board;
}

// A Utility Function to check whether given cell (row, col)
// is a valid cell or not
const isValid = (row, col, size) => {
  // Returns true if row number and column number
  // is in range
  return (row >= 0)
    && (row < size)
    && (col >= 0)
    && (col < size);
}

// A Utility Function to check whether given cell (row, col)
// has a mine or not.
const isMine = (row, col, map) => map[row][col] === true;

const mapMines = (mines, size) => {
  const map = buildBoard(size);
  mines.forEach(mine => map[mine.row][mine.col] = true);
  map.isMap = true;
  map.list = mines;

  return map;
};

// A Function to count the number of
// mines in the adjacent cells
const countAdjacentMines = (row, col, mines, size) => {
  let count = 0;

  //----------- 1st Neighbour (North) ------------
  if (isValid(row - 1, col, size)) {
    if (isMine(row - 1, col, mines))
      count++;
  }

  //----------- 2nd Neighbour (South) ------------
  if (isValid(row + 1, col, size)) {
    if (isMine(row + 1, col, mines))
      count++;
  }

  //----------- 3rd Neighbour (East) ------------
  if (isValid(row, col + 1, size)) {
    if (isMine(row, col + 1, mines))
      count++;
  }

  //----------- 4th Neighbour (West) ------------
  if (isValid(row, col - 1, size)) {
    if (isMine(row, col - 1, mines))
      count++;
  }

  //----------- 5th Neighbour (North-East) ------------
  if (isValid(row - 1, col + 1, size)) {
    if (isMine(row - 1, col + 1, mines))
      count++;
  }

  //----------- 6th Neighbour (North-West) ------------
  if (isValid(row - 1, col - 1, size)) {
    if (isMine(row - 1, col - 1, mines))
      count++;
  }

  //----------- 7th Neighbour (South-East) ------------
  if (isValid(row + 1, col + 1, size)) {
    if (isMine(row + 1, col + 1, mines))
      count++;
  }

  //----------- 8th Neighbour (South-West) ------------
  if (isValid(row + 1, col - 1, size)) {
    if (isMine(row + 1, col - 1, mines))
      count++;
  }

  return count;
}


// A Recursive Fucntion to play the Minesweeper Game
const moveRecursive = (myBoard, mines, row, col, movesLeft) => {
  const size = myBoard.length;

  // Base Case of Recursion
  // To avoid checking one that has already revealed
  if (myBoard[row][col] !== '-' && myBoard[row][col] !== MINE && myBoard[row][col] !== FLAG) {
    return false;
  }

  // You opened a mine
  // You are going to lose
  if (isMine(row, col, mines)) {
    // Game Over
    return true;
  }

  // Not a mine
  else {

    // Calculate the number of adjacent mines and put it
    // on the board.
    const count = countAdjacentMines(row, col, mines, size);
    movesLeft.dec();

    myBoard[row][col] = count;

    if (!count) {
      //----------- 1st Neighbour (North) ------------
      if (isValid(row - 1, col, size)) {
        if (!isMine(row - 1, col, mines))
          moveRecursive(myBoard, mines, row - 1, col, movesLeft);
      }

      //----------- 2nd Neighbour (South) ------------
      if (isValid(row + 1, col, size)) {
        if (!isMine(row + 1, col, mines))
          moveRecursive(myBoard, mines, row + 1, col, movesLeft);
      }

      //----------- 3rd Neighbour (East) ------------
      if (isValid(row, col + 1, size)) {
        if (!isMine(row, col + 1, mines))
          moveRecursive(myBoard, mines, row, col + 1, movesLeft);
      }

      //----------- 4th Neighbour (West) ------------
      if (isValid(row, col - 1, size)) {
        if (!isMine(row, col - 1, mines))
          moveRecursive(myBoard, mines, row, col - 1, movesLeft);
      }

      //----------- 5th Neighbour (North-East) ------------
      if (isValid(row - 1, col + 1, size)) {
        if (!isMine(row - 1, col + 1, mines))
          moveRecursive(myBoard, mines, row - 1, col + 1, movesLeft);
      }

      //----------- 6th Neighbour (North-West) ------------
      if (isValid(row - 1, col - 1, size)) {
        if (!isMine(row - 1, col - 1, mines))
          moveRecursive(myBoard, mines, row - 1, col - 1, movesLeft);
      }

      //----------- 7th Neighbour (South-East) ------------
      if (isValid(row + 1, col + 1, size)) {
        if (!isMine(row + 1, col + 1, mines))
          moveRecursive(myBoard, mines, row + 1, col + 1, movesLeft);
      }

      //----------- 8th Neighbour (South-West) ------------
      if (isValid(row + 1, col - 1, size)) {
        if (!isMine(row + 1, col - 1, mines))
          moveRecursive(myBoard, mines, row + 1, col - 1, movesLeft);
      }
    }

    return false;
  }
}

const getRandomInt = (max) => Math.floor(Math.random() * (max));

// A Function to place the mines randomly
// on the board
const placeMines = (size, minesCount, board) => {
  const mark = {};
  const mines = [];

  // Continue until all random mines have been created.
  for (let i = 0; i < minesCount; ){
    const x = getRandomInt(size);
    const y = getRandomInt(size);

    // Add the mine if no mine is placed at this
    // position on the board
    if (!mark[`${x}-${y}`]) {
      // Row Index of the Mine
      // Column Index of the Mine
      mines[i] = { row: x, col: y};

      // Place the mine
      mark[`${x}-${y}`] = true;

      if (board) board[mines[i].row][mines[i].col] = MINE;
      i++;
    }
  }

  return mapMines(mines, size);
}

// To place a flag in the board
const toggleFlag = (row, col, board) => {
  if (!isValid(row, col, board.length)) return;
  if (typeof board[row][col] !== 'string') return; // Already revealed

  const remove = board[row][col].indexOf(FLAG) > -1;
  const flag = remove
    ? board[row][col].replace(FLAG, '')
    : `${board[row][col].replace('-', '')}${FLAG}`;

  board[row][col] = flag;

  return remove;
};

// To reveal where the mines are
const closeBoard = (mines, board) => {
  for (i = 0; i < mines.length; i++) {
    board[mines[i].row][mines[i].col] = MINE;
  }
}

// Handler to count moves on recursion
class Moves {
  constructor(movesLeft) {
    this.movesLeft = movesLeft;
  }

  dec() {
    this.movesLeft--;
  }

  value() {
    return this.movesLeft;
  }

  toString() {
    return `[${this.movesLeft}]`;
  }
}

/**
 * To build the game board and plant mines
 */
exports.build = (size, minesCount) => {
  const board = buildBoard(size);
  const mines = placeMines(size, minesCount);
  const movesLeft = size * size - minesCount;

  return { board, mines, movesLeft };
}

/**
 * To make a move over a game
 */
exports.play = (row, col, game) => {
  let { board, mines, movesLeft: movesLeftSrc } = game;
  let gameOver = false;
  const movesLeft = new Moves(movesLeftSrc);

  gameOver = moveRecursive(board, mines, row, col, movesLeft);

  if ( gameOver ) {
    closeBoard(mines.list, board);
    log('Game Over');
  }

  return {
    board,
    mines,
    movesLeft: movesLeft.value(),
    gameOver,
  };
}

/**
 * To plant a flag o a suspiciuos place
 */
exports.flag = (row, col, game) => {
  let { board, mines, movesLeft: movesLeftSrc } = game;
  let gameOver = false;
  const movesLeft = new Moves(movesLeftSrc);

  toggleFlag(row, col, board);

  return {
    board,
    mines,
    movesLeft: movesLeft.value(),
    gameOver,
  };
}
