// https://www.hackerrank.com/challenges/cavity-map/problem

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
 * Complete the 'cavityMap' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function cavityMap(grid: string[]): string[] {
  const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  // Write your code here
  const result: string[][] = grid.map((row) => row.split(''));

  const cavities = [];
  for (let iR = 0; iR < result.length; iR++) {
    for (let iC = 0; iC < result[iR].length; iC++) {
      const cur = Number(result[iR][iC]);
      let isBreak = false;
      for (let direction of DIRECTIONS) {
        const [x, y] = direction;

        // edge of matrix
        if (result[iR + x] === undefined || result[iR + x][iC + y] === undefined) {
          isBreak = true;
          break;
        }

        const adjacent = Number(result[iR + x][iC + y]);
        if (adjacent >= cur) {
          isBreak = true;
          break;
        }
      }

      if (!isBreak) {
        cavities.push([iR, iC]);
      }
    }
  }

  for (let i = 0; i < cavities.length; i++) {
    const [r, c] = cavities[i];
    result[r][c] = 'X';
  }

  return result.map((row) => row.join(''));
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const n: number = parseInt(readLine().trim(), 10);

  let grid: string[] = [];

  for (let i: number = 0; i < n; i++) {
    const gridItem: string = readLine();
    grid.push(gridItem);
  }

  const result: string[] = cavityMap(grid);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
