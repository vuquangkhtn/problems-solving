// problem: https://www.hackerrank.com/challenges/lilys-homework/problem

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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function lilysHomework(arr: number[]): number {
  // Write your code here
  const desc = [...arr].sort((a, b) => b - a);
  const asc = [...arr].sort((a, b) => a - b);

  const countSwap = (currentArr: number[], finalArr: number[]): number => {
    const valuePositions = currentArr.reduce((acc, val, index) => {
      acc[val] = index;
      return acc;
    }, {} as any);

    let count = 0;
    for (let i = 0; i < currentArr.length; i++) {
      const currentVal = currentArr[i];
      const correctVal = finalArr[i];
      if (currentVal !== correctVal) {
        const swappedPos = valuePositions[correctVal];
        // swap
        [currentArr[i], currentArr[swappedPos]] = [currentArr[swappedPos], currentArr[i]];
        // update store
        valuePositions[currentVal] = swappedPos;
        valuePositions[correctVal] = i;
        count++;
      }
    }

    return count;
  };

  return Math.min(countSwap([...arr], desc), countSwap([...arr], asc));
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const n: number = parseInt(readLine().trim(), 10);

  const arr: number[] = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result: number = lilysHomework(arr);

  ws.write(result + '\n');

  ws.end();
}
