// https://www.hackerrank.com/challenges/bigger-is-greater/problem

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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w: string): string {
  // Write your code here
  let i = -1;
  // from right to left,
  // find the first char which is smaller than previous char
  for (let a = w.length - 1; a >= 0; a--) {
    if (!w[a + 1]) continue;
    if (w[a].charCodeAt(0) < w[a + 1].charCodeAt(0)) {
      i = a;
      break;
    }
  }

  if (i < 0) {
    return 'no answer';
  }

  let arrChars = w.split('');

  // from pivot to right, find the smallest char which is bigger than pivot char
  let iSmallest;
  for (let j = i + 1; j < w.length; j++) {
    if (arrChars[j] > arrChars[i]) {
      if (iSmallest === undefined || arrChars[j] < arrChars[iSmallest]) {
        iSmallest = j;
      }
    }
  }

  // swap smallest with pivot
  if (iSmallest !== undefined) {
    [arrChars[i], arrChars[iSmallest]] = [arrChars[iSmallest], arrChars[i]];
  }

  // sort the left of pivot
  return (
    arrChars.slice(0, i + 1).join('') +
    arrChars
      .slice(i + 1)
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('')
  );
}

/**
 * dhck => dhkc
 * dchk => dhck
 * dkhc => hcdk
 * adkhc => ahcdk
 */

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const T: number = parseInt(readLine().trim(), 10);

  for (let TItr: number = 0; TItr < T; TItr++) {
    const w: string = readLine();

    const result: string = biggerIsGreater(w);

    ws.write(result + '\n');
  }

  ws.end();
}
