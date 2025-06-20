// https://www.hackerrank.com/challenges/the-time-in-words/problem?isFullScreen=true

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
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

interface KeyPair {
  [key: number]: string;
}

const NUMBER_STR: KeyPair = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  21: 'twenty one',
  22: 'twenty two',
  23: 'twenty three',
  24: 'twenty four',
  25: 'twenty five',
  26: 'twenty six',
  27: 'twenty seven',
  28: 'twenty eight',
  29: 'twenty nine',
};

function timeInWords(h: number, m: number): string {
  // Write your code here
  // o'clock
  if (m === 0) {
    return `${NUMBER_STR[h]} o' clock`;
  }

  const strHour = m <= 30 ? NUMBER_STR[h] : NUMBER_STR[h + 1];
  const connectWord = m <= 30 ? 'past' : 'to';
  const suffix = `${connectWord} ${strHour}`;

  if (m === 30) {
    return `half ${suffix}`;
  }

  if (m === 45 || m === 15) {
    return `quarter ${suffix}`;
  }

  let strMin = m < 30 ? NUMBER_STR[m] : NUMBER_STR[60 - m];
  strMin += m === 1 || m === 59 ? ' minute' : ' minutes';

  return `${strMin} ${suffix}`;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const h: number = parseInt(readLine().trim(), 10);

  const m: number = parseInt(readLine().trim(), 10);

  const result: string = timeInWords(h, m);

  ws.write(result + '\n');

  ws.end();
}
