// problem: https://www.hackerrank.com/challenges/richie-rich/problem

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

interface IKeyPair {
  [key: number]: number;
}
/*
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */

function highestValuePalindrome(s: string, n: number, k: number): string {
  // Write your code here
  const nums = s.split('').map(Number);
  const scannedIndexes: IKeyPair = {};

  // transform to Palindromes
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    if (nums[left] !== nums[right]) {
      if (nums[left] > nums[right]) {
        nums[right] = nums[left];
        scannedIndexes[right] = 1;
      } else {
        nums[left] = nums[right];
        scannedIndexes[left] = 1;
      }
      k--;
    }
    left++;
    right--;
  }

  if (k < 0) return '-1';
  if (k === 0) return nums.join('');
  // console.log(scannedIndexes)
  // transform left <> right
  (left = 0), (right = nums.length - 1);
  while (left < right) {
    let neededK = 2;
    if (nums[left] === 9 || scannedIndexes[left]) {
      neededK--;
    }
    if (nums[right] === 9 || scannedIndexes[right]) {
      neededK--;
    }

    // console.log(k, neededK)
    if (k >= neededK) {
      nums[left] = 9;
      nums[right] = 9;

      k -= neededK;
    }
    left++;
    right--;
  }

  // transform middle if matched
  if (left === right && k > 0) {
    nums[left] = 9;
  }

  return nums.join('');
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

  const n: number = parseInt(firstMultipleInput[0], 10);

  const k: number = parseInt(firstMultipleInput[1], 10);

  const s: string = readLine();

  const result: string = highestValuePalindrome(s, n, k);

  ws.write(result + '\n');

  ws.end();
}
