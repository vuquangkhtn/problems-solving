// https://www.hackerrank.com/challenges/larrys-array/problem

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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
  const swap = (index1, index2) => {
    [A[index1], A[index2]] = [A[index2], A[index1]];
  };

  const doRotate = (currentIndex) => {
    const correctIndex = A[currentIndex] - 1;

    while (A[currentIndex] && currentIndex > correctIndex) {
      if (currentIndex - correctIndex >= 2) {
        // 2 <-> 1
        swap(currentIndex, currentIndex - 1);
        // 1<->0
        swap(currentIndex - 1, currentIndex - 2);
        currentIndex -= 2;
      } else if (currentIndex - correctIndex < 2 && A[currentIndex + 1]) {
        // 1 <-> 0
        swap(currentIndex, currentIndex - 1);
        // 1<->2
        swap(currentIndex, currentIndex + 1);
        currentIndex--;
      }
    }
  };

  // Write your code here
  for (let i = 1; i <= A.length - 2; i++) {
    const index = A.indexOf(i);

    doRotate(index);
    // console.log(index, A)
  }

  if (A[A.length - 1] < A[A.length - 2]) return 'NO';

  return 'YES';
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const A = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((ATemp) => parseInt(ATemp, 10));

    const result = larrysArray(A);

    ws.write(result + '\n');
  }

  ws.end();
}
