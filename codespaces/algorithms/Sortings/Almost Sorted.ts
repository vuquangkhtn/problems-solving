// https://www.hackerrank.com/challenges/almost-sorted/problem

'use strict';

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
 * Complete the 'almostSorted' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function almostSorted(arr) {
  // Write your code here

  // check if swap
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    if (arr[left] > arr[left + 1] && (!arr[left - 1] || arr[left] > arr[left - 1])) {
      if (arr[right] < arr[right - 1] && (!arr[right + 1] || arr[right] < arr[right + 1])) {
        break;
      } else {
        right--;
      }
    } else {
      left++;
    }
  }

  if (left === right) console.log(`no`);

  // swap
  let isSwap = true;
  [arr[left], arr[right]] = [arr[right], arr[left]];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] < arr[i]) {
      isSwap = false;
      // revert swap
      [arr[left], arr[right]] = [arr[right], arr[left]];
      break;
    }
  }
  if (isSwap) {
    console.log(`yes`);
    console.log(`swap ${left + 1} ${right + 1}`);
    return;
  }

  let isReversed = true;

  // do reverse
  let iLeft = left,
    iRight = right;
  while (iLeft < iRight) {
    [arr[iLeft], arr[iRight]] = [arr[iRight], arr[iLeft]];
    iLeft++;
    iRight--;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      isReversed = false;
      break;
    }
  }
  if (isReversed) {
    console.log(`yes`);
    console.log(`reverse ${left + 1} ${right + 1}`);
    return;
  }

  console.log('no');
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  almostSorted(arr);
}
