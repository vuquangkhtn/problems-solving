// problem: https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem

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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure: number[], d: number): number {
  if (expenditure.length <= d) return 0;

  let notifications = 0;
  const maxExpenditure = 200; // Based on problem constraints
  const count = new Array(maxExpenditure + 1).fill(0);

  // Initialize the count array with first d elements
  for (let i = 0; i < d; i++) {
    count[expenditure[i]]++;
  }

  // Process each day starting from day d
  for (let i = d; i < expenditure.length; i++) {
    const median = getMedianFromCount(count, d);

    // Check if current expenditure triggers notification
    if (expenditure[i] >= 2 * median) {
      notifications++;
    }

    // Update sliding window: remove oldest, add newest
    count[expenditure[i - d]]--; // Remove the element going out of window
    count[expenditure[i]]++; // Add the current element to window
  }

  return notifications;
}

// Helper function to get median from count array
function getMedianFromCount(count: number[], d: number): number {
  const mid1 = Math.floor((d - 1) / 2);
  const mid2 = Math.floor(d / 2);

  let pos = 0;
  let median1 = -1;
  let median2 = -1;

  for (let i = 0; i < count.length; i++) {
    pos += count[i];

    if (median1 === -1 && pos > mid1) {
      median1 = i;
    }
    if (median2 === -1 && pos > mid2) {
      median2 = i;
      break;
    }
  }

  return (median1 + median2) / 2;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const n: number = parseInt(firstMultipleInput[0], 10);

  const d: number = parseInt(firstMultipleInput[1], 10);

  const expenditure: number[] = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((expenditureTemp) => parseInt(expenditureTemp, 10));

  const result: number = activityNotifications(expenditure, d);

  ws.write(result + '\n');

  ws.end();
}
