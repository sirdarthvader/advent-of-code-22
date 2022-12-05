import { readFileSync } from 'node:fs';

const lines = readFileSync('day02.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const moves = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const mapInput = {
  A: moves.rock,
  B: moves.paper,
  C: moves.scissors,
  X: moves.rock,
  Y: moves.paper,
  Z: moves.scissors,
};

function score(opponentMove, userMove) {
  if (opponentMove === userMove) {
    return userMove + 3;
  }
  if (
    (opponentMove === moves.rock && userMove === moves.paper) ||
    (opponentMove === moves.paper && userMove === moves.scissors) ||
    (opponentMove === moves.scissors && userMove === moves.rock)
  ) {
    // We win
    return userMove + 6;
  }
  // We lost
  return userMove;
}

function solution1() {
  const outcomes = lines.map((line) => {
    const opponentMove = mapInput[line[0]];
    const userMove = mapInput[line[1]];
    return score(opponentMove, userMove);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
}

const solution = {
  A: {
    //rock
    X: moves.scissors, //lose
    Y: moves.rock, //draw
    Z: moves.paper, //win
  },
  B: {
    //paper
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors,
  },
  C: {
    //scissors
    X: moves.paper,
    Y: moves.scissors,
    Z: moves.rock,
  },
};

function solution2() {
  const outcomes = lines.map((line) => {
    const opponentMove = mapInput[line[0]];

    // Guess user move from the instructions
    const userMove = solution[line[0]][line[1]];

    return score(opponentMove, userMove);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
}

solution1();
solution2();
