// https://www.hackerrank.com/challenges/encryption/problem?isFullScreen=true

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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s: string): string {
  // Write your code here
  let minifyStrChars = s.split('');

  // remove spaces
  minifyStrChars = minifyStrChars.filter((char) => char !== ' ');

  // get rows and cols
  const mid = Math.sqrt(minifyStrChars.length);
  let ROW_LENGTH = Math.floor(mid);
  let COL_LENGTH = Math.ceil(mid);

  if (ROW_LENGTH * COL_LENGTH < minifyStrChars.length) {
    ROW_LENGTH = Math.max(ROW_LENGTH, COL_LENGTH);
    COL_LENGTH = Math.max(ROW_LENGTH, COL_LENGTH);
  }

  //Start:encode
  // fill str to grid.
  // Awared that fill([]) just create 1 array referenced to all rows
  const grid = new Array(ROW_LENGTH);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(COL_LENGTH);
  }

  let iStr = 0;
  for (let iRow = 0; iRow < ROW_LENGTH; iRow++) {
    for (let iCol = 0; iCol < COL_LENGTH; iCol++) {
      if (iStr < minifyStrChars.length) {
        grid[iRow][iCol] = minifyStrChars[iStr];
        iStr++;
      } else {
        break;
      }
    }
  }

  // generate encoded str from grid
  let encodedStr = '';
  for (let iCol = 0; iCol < COL_LENGTH; iCol++) {
    for (let iRow = 0; iRow < ROW_LENGTH; iRow++) {
      if (grid[iRow][iCol] === undefined) {
        break;
      }

      encodedStr += grid[iRow][iCol];
    }
    encodedStr += ' ';
  }

  // remove last space
  encodedStr = encodedStr.slice(0, encodedStr.length - 1);
  // End:encode

  return encodedStr;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const s: string = readLine();

  const result: string = encryption(s);

  ws.write(result + '\n');

  ws.end();
}
