// https://www.hackerrank.com/challenges/bomber-man/problem

'use strict';

import { WriteStream, createWriteStream } from 'fs';
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on('end', function (): void {
  inputLines = inputString.split('\n');
  inputString = '';

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

const getNextDetonatedGrid = (grid: string[]): string[] => {
  const detonatedGrid: string[][] = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill('O')
  );

  const directions = [
    [-1, 0], // top
    [1, 0], // bottom
    [0, 1], // right
    [0, -1], // left
  ];
  for (let r = 0; r < detonatedGrid.length; r++) {
    for (let c = 0; c < detonatedGrid[0].length; c++) {
      const point = grid[r][c];

      if (point === 'O') {
        detonatedGrid[r][c] = '.';
        for (let direction of directions) {
          const [x, y] = direction;
          if (detonatedGrid[r + x] && detonatedGrid[r + x][c + y]) {
            detonatedGrid[r + x][c + y] = '.';
          }
        }
      }
    }
  }

  const strDetonatedGrid = detonatedGrid.map((row) => row.join(''));
  return strDetonatedGrid;
};

function bomberMan(n: number, grid: string[]): string[] {
  // Write your code here
  // 0 -> place bombs initial
  // 1 -> do nothing -> grid 1
  // 2 -> plants bombs all
  // 3 -> first detonated -> grid 2
  // 4 -> 2 -> plants all
  // 5 9 13 -> others in 2 detonated -> grid 3
  // 6 -> plants all
  // 7 11 15-> other in 4 detonated -> grid 4

  const fullBombGrid = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill('O').join('')
  );

  if (n % 2 === 0) return fullBombGrid;
  if (n < 3) return grid;
  const firstDetonated = getNextDetonatedGrid(grid);
  if (n === 3) return firstDetonated;

  // trick that the grid only has 2 status
  // detonated 0. initial grid
  //3 detonated 1. 1st grid
  //5 detonated 2. 2nd detonated grid
  //7 detonated 3. 3rd detonated grid
  //9 detonated 4.= 2nd detonated grid
  //11 detonated 5 = 3rd detonated grid
  //13 detonated 6 = 2nd detonated grid
  const nThDetonated = Math.floor((n - 5) / 2);
  const secondDetonatedGrid = getNextDetonatedGrid(firstDetonated);
  const thirdDetonatedGrid = getNextDetonatedGrid(secondDetonatedGrid);
  if (nThDetonated % 2 === 0) return secondDetonatedGrid;
  else return thirdDetonatedGrid;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const r: number = parseInt(firstMultipleInput[0], 10);

  const c: number = parseInt(firstMultipleInput[1], 10);

  const n: number = parseInt(firstMultipleInput[2], 10);

  let grid: string[] = [];

  for (let i: number = 0; i < r; i++) {
    const gridItem: string = readLine();
    grid.push(gridItem);
  }

  const result: string[] = bomberMan(n, grid);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
