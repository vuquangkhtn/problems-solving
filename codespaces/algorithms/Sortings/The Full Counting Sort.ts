// problem: https://www.hackerrank.com/challenges/countingsort4/problem

'use strict';

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
 * Complete the 'countSort' function below.
 *
 * The function accepts 2D_STRING_ARRAY arr as parameter.
 */

function countSort(arr: string[][]): void {
  // Write your code here

  const store: Array<Array<number | string>> = Array.from(new Array(100), () => []);

  for (let i = 0; i < arr.length; i++) {
    const [num, val] = arr[i];
    if (i < arr.length / 2) {
      store[Number(num)].push('-');
    } else {
      store[Number(num)].push(val);
    }
  }

  // show result
  let strResult = '';
  // O(100)
  for (let item of store) {
    if (item.length > 0) {
      strResult += item.join(' ');
      strResult += ' ';
    }
  }

  console.log(strResult.substring(0, strResult.length - 1));
}

function main() {
  const n: number = parseInt(readLine().trim(), 10);

  let arr: string[][] = Array(n);

  for (let i: number = 0; i < n; i++) {
    arr[i] = readLine().replace(/\s+$/g, '').split(' ');
  }

  countSort(arr);
}
