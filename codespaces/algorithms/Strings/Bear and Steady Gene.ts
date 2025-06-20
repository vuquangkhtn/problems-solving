// https://www.hackerrank.com/challenges/bear-and-steady-gene/problem

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
 * Complete the 'steadyGene' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */
interface KeyPair {
  [key: string]: number;
}

function steadyGene(gene: string): number {
  // Write your code here
  if (gene.length % 4 !== 0) return -1;

  const geneCount: KeyPair = gene.split('').reduce((acc, val) => {
    if (!acc[val]) {
      acc[val] = 0;
    }
    acc[val]++;
    return acc;
  }, {} as any);

  const hasMatchedRequirements = (currentCount: KeyPair, requirements: KeyPair): boolean => {
    for (let key in requirements) {
      if (requirements[key] > currentCount[key]) {
        return false;
      }
    }

    return true;
  };

  // excess chars -> we need to move all to 0 for expected gene
  const requirements: KeyPair = {};
  const expectedGene = gene.length / 4;
  for (const key in geneCount) {
    const val = geneCount[key] - expectedGene;
    if (val > 0) {
      requirements[key] = val;
    }
  }

  // console.log(requirements)
  let left = 0,
    right = 0,
    min = gene.length;
  const count: KeyPair = { A: 0, G: 0, C: 0, T: 0 };
  while (left <= right && right < gene.length) {
    // console.log(hasMatchedRequirements(count, requirements), count)
    if (!hasMatchedRequirements(count, requirements)) {
      count[gene[right]] = (count[gene[right]] || 0) + 1;
      right++;
    } else {
      if (right - left < min) {
        min = right - left;
      }
      count[gene[left]]--;
      left++;
    }
  }
  return min;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

  const n: number = parseInt(readLine().trim(), 10);

  const gene: string = readLine();

  const result: number = steadyGene(gene);

  ws.write(result + '\n');

  ws.end();
}
