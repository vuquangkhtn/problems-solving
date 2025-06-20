// problem: https://www.hackerrank.com/challenges/sherlock-and-valid-string/submissions/code/435738352

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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s: string): string {
  // Write your code here
  let charCount = new Array('z'.charCodeAt(0) - 'a'.charCodeAt(0)).fill(0);

  // count the frequency of character / 0(n)
  for (let char of s) {
    const code = char.charCodeAt(0) - 'a'.charCodeAt(0);
    charCount[code]++;
  }

  const uniqCount = {} as any;

  for (let i = 0; i < charCount.length; i++) {
    if (charCount[i] === 0) continue;

    uniqCount[charCount[i]] = (uniqCount[charCount[i]] || 0) + 1;
  }

  const entries: Array<[number, number]> = Object.entries(uniqCount) as any;

  console.log(entries);
  if (entries.length === 1) return 'YES';

  if (entries.length === 2) {
    const [count1, frequency1] = entries[0];
    const [count2, frequency2] = entries[1];

    if (Number(count1) === 1 && frequency1 === 1) {
      return 'YES';
    }

    if (Number(count2) === 1 && frequency2 === 1) {
      return 'YES';
    }

    if (frequency1 === 1 && Number(count1) - 1 === Number(count2)) {
      return 'YES';
    }

    if (frequency2 === 1 && Number(count2) - 1 === Number(count1)) {
      return 'YES';
    }
  }

  return 'NO';
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const s: string = readLine();

  const result: string = isValid(s);

  ws.write(result + '\n');

  ws.end();
}
