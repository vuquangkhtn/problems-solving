// https://www.hackerrank.com/challenges/queens-attack-2/problem?isFullScreen=true

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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

const MIN_LENGTH = 1;

function queensAttack(
  n: number,
  k: number,
  r_q: number,
  c_q: number,
  obstacles: number[][]
): number {
  // Write your code here
  const STEPS = [
    [0, -1], // LEFT
    [0, 1], // RIGHT
    [1, 0], // TOP
    [-1, 0], // DOWN
    [1, -1], // LEFT_TOP
    [1, 1], // RIGHT_TOP
    [-1, -1], // LEFT_DOWN
    [-1, 1], // RIGH_DOWN
  ];

  const obstacleMap = obstacles.reduce<any>((cur, obstacle) => {
    const [r, c] = obstacle;
    cur[`${r},${c}` as string] = 1;
    return cur;
  }, {});

  // log
  // board.forEach((row) => console.log(row))

  function countStep(direction: number[], current_r = r_q, current_c = c_q): number {
    const newR = current_r + direction[0];
    const newC = current_c + direction[1];

    // Out of table or meet obstance
    if (
      newC < MIN_LENGTH ||
      newC > n ||
      newR < MIN_LENGTH ||
      newR > n ||
      obstacleMap[`${newR},${newC}`]
    ) {
      return 0;
    }

    return countStep(direction, newR, newC) + 1;
  }

  let count = 0;
  for (let step of STEPS) {
    count += countStep(step);
  }

  return count;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const n: number = parseInt(firstMultipleInput[0], 10);

  const k: number = parseInt(firstMultipleInput[1], 10);

  const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const r_q: number = parseInt(secondMultipleInput[0], 10);

  const c_q: number = parseInt(secondMultipleInput[1], 10);

  let obstacles: number[][] = Array(k);

  for (let i: number = 0; i < k; i++) {
    obstacles[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((obstaclesTemp) => parseInt(obstaclesTemp, 10));
  }

  const result: number = queensAttack(n, k, r_q, c_q, obstacles);

  ws.write(result + '\n');

  ws.end();
}
