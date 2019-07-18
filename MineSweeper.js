
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
const isMine = (row, col, mines) => !!mines.find(mine => mine.row === row && mine.col === col);

// A Function to count the number of
// mines in the adjacent cells
const countAdjacentMines = (row, col, mines, size) => {
  let count = 0;

  /*
      Count all the mines in the 8 adjacent
      cells

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
      W -->  West            (row, col-1)
      N.E--> North-East   (row-1, col+1)
      N.W--> North-West   (row-1, col-1)
      S.E--> South-East   (row+1, col+1)
      S.W--> South-West   (row+1, col-1)
  */

  //----------- 1st Neighbour (North) ------------

  // Only process this cell if this is a valid one
  if (isValid(row - 1, col, size)) {
    if (isMine(row - 1, col, mines))
      count++;
  }

  //----------- 2nd Neighbour (South) ------------

  // Only process this cell if this is a valid one
  if (isValid(row + 1, col, size)) {
    if (isMine(row + 1, col, mines))
      count++;
  }

  //----------- 3rd Neighbour (East) ------------

  // Only process this cell if this is a valid one
  if (isValid(row, col + 1, size) == true) {
    if (isMine(row, col + 1, mines))
      count++;
  }

  //----------- 4th Neighbour (West) ------------

  // Only process this cell if this is a valid one
  if (isValid(row, col - 1, size)) {
    if (isMine(row, col - 1, mines))
      count++;
  }

  //----------- 5th Neighbour (North-East) ------------

  // Only process this cell if this is a valid one
  if (isValid(row - 1, col + 1, size)) {
    if (isMine(row - 1, col + 1, mines))
      count++;
  }

  //----------- 6th Neighbour (North-West) ------------

  // Only process this cell if this is a valid one
  if (isValid(row - 1, col - 1, size)) {
    if (isMine(row - 1, col - 1, mines))
      count++;
  }

  //----------- 7th Neighbour (South-East) ------------

  // Only process this cell if this is a valid one
  if (isValid(row + 1, col + 1, size)) {
    if (isMine(row + 1, col + 1, mines))
      count++;
  }

  //----------- 8th Neighbour (South-West) ------------

  // Only process this cell if this is a valid one
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
  if (myBoard[row][col] != '-') {
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
    movesLeft--;

    myBoard[row][col] = count;

    if (!count) {
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
      W -->  West            (row, col-1)
      N.E--> North-East   (row-1, col+1)
      N.W--> North-West   (row-1, col-1)
      S.E--> South-East   (row+1, col+1)
      S.W--> South-West   (row+1, col-1)
      */

      //----------- 1st Neighbour (North) ------------

      // Only process this cell if this is a valid one
      if (isValid(row - 1, col, size)) {
        if (!isMine(row - 1, col, mines))
          moveRecursive(myBoard, mines, row - 1, col, movesLeft);
      }

      //----------- 2nd Neighbour (South) ------------

      // Only process this cell if this is a valid one
      if (isValid(row + 1, col, size)) {
        if (!isMine(row + 1, col, mines))
          moveRecursive(myBoard, mines, row + 1, col, movesLeft);
      }

      //----------- 3rd Neighbour (East) ------------

      // Only process this cell if this is a valid one
      if (isValid(row, col + 1, size)) {
        if (!isMine(row, col + 1, mines))
          moveRecursive(myBoard, mines, row, col + 1, movesLeft);
      }

      //----------- 4th Neighbour (West) ------------

      // Only process this cell if this is a valid one
      if (isValid(row, col - 1, size)) {
        if (!isMine(row, col - 1, mines))
          moveRecursive(myBoard, mines, row, col - 1, movesLeft);
      }

      //----------- 5th Neighbour (North-East) ------------

      // Only process this cell if this is a valid one
      if (isValid(row - 1, col + 1, size)) {
        if (!isMine(row - 1, col + 1, mines))
          moveRecursive(myBoard, mines, row - 1, col + 1, movesLeft);
      }

      //----------- 6th Neighbour (North-West) ------------

      // Only process this cell if this is a valid one
      if (isValid(row - 1, col - 1, size)) {
        if (!isMine(row - 1, col - 1, mines))
          moveRecursive(myBoard, mines, row - 1, col - 1, movesLeft);
      }

      //----------- 7th Neighbour (South-East) ------------

      // Only process this cell if this is a valid one
      if (isValid(row + 1, col + 1, size)) {
        if (!isMine(row + 1, col + 1, mines))
          moveRecursive(myBoard, mines, row + 1, col + 1, movesLeft);
      }

      //----------- 8th Neighbour (South-West) ------------

      // Only process this cell if this is a valid one
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
const placeMines = (size, minesCount) => {
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

      i++;
    }
  }

  return mines;
}


