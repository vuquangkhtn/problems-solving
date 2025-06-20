// https://www.hackerrank.com/challenges/3d-surface-area/problem

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
 * Complete the 'surfaceArea' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY A as parameter.
 */

function surfaceArea(A: number[][]): number {
  // Write your code here

  // pre define
  const R = A.length;
  const C = A[0].length;

  // caculate surface area in 6 sides
  // top-bottom -> if cell is valid 2 else 0
  // 4 edges
  // per cells, check each edges of cells
  // surfaceTotal = cellHeight*4;
  // withPerEdge
  // surfaceTotal -= Math.min(cellHeight, edgeHeight);

  const DIRECTIONS = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // up
    [1, 0], // down
  ];

  let result = 0;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const cellCubes = A[r][c];
      if (!cellCubes) {
        continue;
      }
      let cellAreaTotal = cellCubes * 4 + 2;

      for (let direction of DIRECTIONS) {
        const edgeCube = A[r + direction[0]]?.[c + direction[1]] ?? 0;

        cellAreaTotal -= Math.min(cellCubes, edgeCube);
      }

      result += cellAreaTotal;
    }
  }

  return result;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const H: number = parseInt(firstMultipleInput[0], 10);

  const W: number = parseInt(firstMultipleInput[1], 10);

  let A: number[][] = Array(H);

  for (let i: number = 0; i < H; i++) {
    A[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((ATemp) => parseInt(ATemp, 10));
  }

  const result: number = surfaceArea(A);

  ws.write(result + '\n');

  ws.end();
}
