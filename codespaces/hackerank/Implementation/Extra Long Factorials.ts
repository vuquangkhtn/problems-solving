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
 * Complete the 'extraLongFactorials' function below.
 *
 * The function accepts INTEGER n as parameter.
 */
function extraLongFactorials(n: number): void {
  // Write your code here
  let result = BigInt(1);
  for (let i = 1; i <= n; i++) {
    result = result * BigInt(i);
  }

  console.log(String(result));
}

function main() {
  const n: number = parseInt(readLine().trim(), 10);

  extraLongFactorials(n);
}
