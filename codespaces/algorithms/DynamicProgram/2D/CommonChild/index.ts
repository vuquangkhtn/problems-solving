'use strict';

import fs from 'fs';

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
 * Complete the 'commonChild' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

/**
 * Common Child Problem - Find Longest Common Subsequence (LCS)
 *
 * Problem: Given two strings of equal length, find the longest string that can be
 * constructed such that it is a child of both strings (by deleting 0 or more characters
 * without rearranging).
 *
 * This is the classic Longest Common Subsequence problem.
 *
 * Algorithm: Dynamic Programming
 * - Create a 2D DP table where dp[i][j] represents the length of LCS
 *   of first i characters of s1 and first j characters of s2
 * - If characters match: dp[i][j] = dp[i-1][j-1] + 1
 * - If characters don't match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *
 * Time Complexity: O(m * n) where m and n are lengths of the strings
 * Space Complexity: O(m * n)
 */
function commonChild(s1, s2) {
  // Write your code here
  const m = s1.length;
  const n = s2.length;

  // Create DP table with (m+1) x (n+1) dimensions
  // dp[i][j] = LCS length of s1[0...i-1] and s2[0...j-1]
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        // Characters match - extend the LCS
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Characters don't match - take maximum from excluding one character
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s1 = readLine();

  const s2 = readLine();

  const result = commonChild(s1, s2);

  ws.write(result + '\n');

  ws.end();
}
