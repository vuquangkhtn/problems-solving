// https://www.hackerrank.com/challenges/two-pluses/problem

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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const pluses = [];

  // Helper function to create a range of numbers
  const range = (start, end) => {
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  // Helper function to check if all elements satisfy a condition
  const all = (arr, condition) => arr.every(condition);

  // Helper function to create a set from coordinate pairs
  const createCoordinateSet = (coords) => {
    return new Set(coords.map((coord) => JSON.stringify(coord)));
  };

  // Helper to get set size
  const setSize = (set) => set.size;

  // Helper to check if two sets are disjoint (no common elements)
  const isDisjoint = (setA, setB) => {
    for (const item of setA) {
      if (setB.has(item)) {
        return false;
      }
    }
    return true;
  };

  // 1. Find all possible pluses
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      // 2. Determine plus size
      const maxSize = Math.min(r, c, n - r - 1, m - c - 1);

      for (let i = 0; i <= maxSize; i++) {
        // Check if horizontal line is valid
        const isHorizontalValid = all(range(c - i, c + i + 1), (col) => grid[r][col] === 'G');

        // Check if vertical line is valid
        const isVerticalValid = all(range(r - i, r + i + 1), (row) => grid[row][c] === 'G');

        if (isHorizontalValid && isVerticalValid) {
          // 3. Store valid plus shapes
          const hLineCoords = range(c - i, c + i + 1).map((x) => [r, x]);
          const vLineCoords = range(r - i, r + i + 1).map((y) => [y, c]);

          // Create sets from coordinates
          const hLine = createCoordinateSet(hLineCoords);
          const vLine = createCoordinateSet(vLineCoords);

          // Union of the sets
          const plusSet = new Set([...hLine, ...vLine]);

          pluses.push(plusSet);
        }
      }
    }
  }

  // 4. Find two non-overlapping pluses
  pluses.sort((a, b) => b.size - a.size); // Sort by size in descending order

  let maxProduct = 0;
  while (pluses.length > 1) {
    const plusA = pluses.shift(); // Remove and get the first element

    for (const plusB of pluses) {
      if (isDisjoint(plusA, plusB)) {
        maxProduct = Math.max(maxProduct, plusA.size * plusB.size);
      }
    }
  }

  return maxProduct;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = twoPluses(grid);

  ws.write(result + '\n');

  ws.end();
}
