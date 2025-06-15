// https://www.hackerrank.com/challenges/non-divisible-subset/problem?isFullScreen=true

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
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k: number, s: number[]): number {
  // Write your code here
  const remainderCount = new Array(k).fill(0);

  for (let item of s) {
    remainderCount[item % k] += 1;
  }

  let result = 0;
  if (remainderCount[0] > 0) {
    result++;
  }

  if (remainderCount[k / 2] > 0 && k % 2 === 0) {
    result++;
  }

  for (let i = 1; i < k / 2; i++) {
    result += Math.max(remainderCount[i], remainderCount[k - i]);
  }

  return result;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const n: number = parseInt(firstMultipleInput[0], 10);

  const k: number = parseInt(firstMultipleInput[1], 10);

  const s: number[] = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((sTemp) => parseInt(sTemp, 10));

  const result: number = nonDivisibleSubset(k, s);

  ws.write(result + '\n');

  ws.end();
}
