// https://www.hackerrank.com/challenges/pairs/problem?isFullScreen=true

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
 * Complete the 'pairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pairs(k, arr) {
  // Write your code here
  arr = arr.sort((a, b) => a - b); // ascending

  let left = 0,
    right = left + 1;

  let result = 0;

  while (right < arr.length) {
    if (left === right) {
      right++;
      continue;
    }

    const leftNum = arr[left];
    const rightNum = arr[right];

    if (rightNum - leftNum > k) {
      left++;
      continue;
    }

    if (rightNum - leftNum < k) {
      right++;
      continue;
    }

    result++;
    left++;
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const arr = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = pairs(k, arr);

  ws.write(result + '\n');

  ws.end();
}
