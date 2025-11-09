// https://www.hackerrank.com/challenges/the-grid-search/problem?isFullScreen=true

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
 * Complete the 'gridSearch' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY G
 *  2. STRING_ARRAY P
 */

function gridSearch(G: string[], P: string[]): string {
  const doSearch = (row: number, col: number) => {
    for (let x = 0; x < P.length; x++) {
      for (let y = 0; y < P[0].length; y++) {
        if (P[x][y] !== G[row + x][col + y]) {
          return false;
        }
      }
    }

    return true;
  };
  // Write your code here
  for (let iRow = 0; iRow <= G.length - P.length; iRow++) {
    for (let iCol = 0; iCol <= G[iRow].length - P[0].length; iCol++) {
      const found = doSearch(iRow, iCol);
      if (found) {
        return 'YES';
      }
    }
  }

  return 'NO';
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const t: number = parseInt(readLine().trim(), 10);

  for (let tItr: number = 0; tItr < t; tItr++) {
    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const R: number = parseInt(firstMultipleInput[0], 10);

    const C: number = parseInt(firstMultipleInput[1], 10);

    let G: string[] = [];

    for (let i: number = 0; i < R; i++) {
      const GItem: string = readLine();
      G.push(GItem);
    }

    const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const r: number = parseInt(secondMultipleInput[0], 10);

    const c: number = parseInt(secondMultipleInput[1], 10);

    let P: string[] = [];

    for (let i: number = 0; i < r; i++) {
      const PItem: string = readLine();
      P.push(PItem);
    }

    const result: string = gridSearch(G, P);

    ws.write(result + '\n');
  }

  ws.end();
}
