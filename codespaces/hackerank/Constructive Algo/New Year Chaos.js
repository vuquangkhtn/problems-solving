// https://www.hackerrank.com/challenges/new-year-chaos/problem

'use strict';
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

function minimumBribes(q) {
  // Write your code here
  let swapCount = 0;
  for (let i = q.length - 1; i >= 0; i--) {
    if (q[i] - (i + 1) > 2) {
      ws.write('Too chaotic\n');
      return;
    }
    for (let j = Math.max(0, q[i] - 2); j < i; j++) {
      if (q[j] > q[i]) {
        swapCount++;
      }
    }
  }
  ws.write(swapCount + '\n');
}

function main() {
  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const q = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((qTemp) => parseInt(qTemp, 10));

    minimumBribes(q);
  }
}
