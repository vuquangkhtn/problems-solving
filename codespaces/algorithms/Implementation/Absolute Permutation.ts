// https://www.hackerrank.com/challenges/absolute-permutation/problem

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
 * Complete the 'absolutePermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 */

function absolutePermutation(n: number, k: number): number[] {
  // Write your code here
  let result = [];

  if (k === 0) {
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }

    return result;
  }

  if (n % (2 * k) !== 0) return [-1];

  for (let i = 1; i <= n; i++) {
    result.push(i + k);

    if (i % k === 0) {
      k *= -1;
    }
  }

  return result;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const t: number = parseInt(readLine().trim(), 10);

  for (let tItr: number = 0; tItr < t; tItr++) {
    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const result: number[] = absolutePermutation(n, k);

    ws.write(result.join(' ') + '\n');
  }

  ws.end();
}
