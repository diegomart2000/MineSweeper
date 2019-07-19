const Game = require('./server/model/MineSweeper');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askNumber = question => new Promise(resolve => rl
  .question(`${question} > `, (answer) => resolve(answer))
).then(parseInt);

const askCoords = question => new Promise(resolve => rl
  .question(`${question} > `, (answer) => resolve(answer))
).then(answer => answer && answer.split(/\s/).map(coord => parseInt(coord)));

const play = async () => {
  let gameOver = false;

  console.log('Setting upt the game...');

  const size = await askNumber('What is the board size you like?');
  const minesCount = await askNumber('How many mines we should hide?');

  console.log(`Building board of ${size} by ${size} and ${minesCount} mines`);

  let game = Game.build(size, minesCount);

  console.table(game.board);

  while (!gameOver) {
    const move = await askCoords(`Moves left ${game.movesLeft} - Whats your move? [row, col]`);
    console.log('move', move);

    game = Game.play(move[0], move[1], game);
    console.table(game.board);

    if ( game.gameOver ) {
      console.table(game.board);
      console.log('Game Over');

    } else {
      const flag = await askCoords('Like to put a flag? [row, col]');
      console.log('flag', flag);

      if ( flag ) {
        game = Game.flag(flag[0], flag[1], game);
        console.table(game.board);
      }
    }
  }
  rl.close();
}

play();
