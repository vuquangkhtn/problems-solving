// https://www.hackerrank.com/challenges/organizing-containers-of-balls/problem?isFullScreen=true

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
 * Complete the 'organizingContainers' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY container as parameter.
 */

function organizingContainers(container: number[][]): string {
  // Write your code here
  const CONTAINER_LENGTH = container.length;
  const TYPE_LENGTH = container[0].length;
  const ballPerType: number[] = new Array(CONTAINER_LENGTH).fill(0);
  const ballPerContainer: number[] = new Array(container[0].length).fill(0);
  for (let iContainer = 0; iContainer < CONTAINER_LENGTH; iContainer++) {
    for (let iType = 0; iType < TYPE_LENGTH; iType++) {
      ballPerType[iType] += container[iContainer][iType];
      ballPerContainer[iContainer] += container[iContainer][iType];
    }
  }

  ballPerType.sort((a, b) => a - b);
  ballPerContainer.sort((a, b) => a - b);
  for (let i = 0; i < TYPE_LENGTH && i < CONTAINER_LENGTH; i++) {
    // by container
    const ballsToFillIn = ballPerType[i] - container[i][i];
    const totalDiffBalls = ballPerContainer[i] - container[i][i];

    if (ballsToFillIn !== totalDiffBalls) {
      return 'Impossible';
    }
  }

  return 'Possible';
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const q: number = parseInt(readLine().trim(), 10);

  for (let qItr: number = 0; qItr < q; qItr++) {
    const n: number = parseInt(readLine().trim(), 10);

    let container: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
      container[i] = readLine()
        .replace(/\s+$/g, '')
        .split(' ')
        .map((containerTemp) => parseInt(containerTemp, 10));
    }

    const result: string = organizingContainers(container);

    ws.write(result + '\n');
  }

  ws.end();
}

/**
 * Possible
Possible
Possible
Impossible
Possible
Impossible
Possible
Possible
Possible
Possible
 */
