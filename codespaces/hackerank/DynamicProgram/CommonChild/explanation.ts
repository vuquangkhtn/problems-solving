/**
 * LONGEST COMMON SUBSEQUENCE (LCS) - DYNAMIC PROGRAMMING EXPLANATION
 *
 * Problem: Find the length of the longest subsequence common to both strings.
 * A subsequence maintains relative order but doesn't need to be contiguous.
 *
 * Example: "ABCDGH" and "AEDFHR"
 * Common subsequences: "A", "D", "H", "AD", "AH", "DH", "ADH"
 * Longest: "ADH" (length 3)
 */

/**
 * STEP 1: UNDERSTANDING THE PROBLEM
 *
 * Given two strings s1 and s2, we want to find the longest string that:
 * 1. Can be formed by deleting some characters from s1 (without reordering)
 * 2. Can be formed by deleting some characters from s2 (without reordering)
 *
 * Key insight: This is a classic optimization problem where we need to make
 * optimal choices at each step.
 */

/**
 * STEP 2: RECURSIVE APPROACH (Brute Force)
 *
 * For each position (i, j) in strings s1 and s2:
 * - If s1[i] == s2[j]: Include this character, move to (i+1, j+1)
 * - If s1[i] != s2[j]: Try both options and take maximum:
 *   - Skip s1[i], move to (i+1, j)
 *   - Skip s2[j], move to (i, j+1)
 *
 * This has exponential time complexity O(2^(m+n))
 */

function lcsRecursive(s1: string, s2: string, i: number = 0, j: number = 0): number {
  // Base case: reached end of either string
  if (i >= s1.length || j >= s2.length) {
    return 0;
  }

  if (s1[i] === s2[j]) {
    // Characters match: include this character
    return 1 + lcsRecursive(s1, s2, i + 1, j + 1);
  } else {
    // Characters don't match: try both options
    return Math.max(
      lcsRecursive(s1, s2, i + 1, j), // Skip s1[i]
      lcsRecursive(s1, s2, i, j + 1) // Skip s2[j]
    );
  }
}

/**
 * STEP 3: OVERLAPPING SUBPROBLEMS
 *
 * The recursive approach recalculates the same subproblems multiple times.
 * For example, lcs("AB", "AC", 1, 1) might be calculated many times.
 *
 * Solution: Use memoization or tabulation (Dynamic Programming)
 */

/**
 * STEP 4: MEMOIZATION (Top-down DP)
 */
function lcsMemoized(s1: string, s2: string): number {
  const memo: Map<string, number> = new Map();

  function helper(i: number, j: number): number {
    if (i >= s1.length || j >= s2.length) {
      return 0;
    }

    const key = `${i},${j}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let result: number;
    if (s1[i] === s2[j]) {
      result = 1 + helper(i + 1, j + 1);
    } else {
      result = Math.max(helper(i + 1, j), helper(i, j + 1));
    }

    memo.set(key, result);
    return result;
  }

  return helper(0, 0);
}

/**
 * STEP 5: TABULATION (Bottom-up DP) - THE MAIN SOLUTION
 *
 * Create a 2D table dp[i][j] where:
 * dp[i][j] = LCS length of s1[0...i-1] and s2[0...j-1]
 *
 * Recurrence relation:
 * - If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
 * - Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 */

function lcsTabulation(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // Create DP table with extra row and column for base cases
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  console.log('\n=== STEP-BY-STEP DP TABLE CONSTRUCTION ===');
  console.log(`String 1: "${s1}"`);
  console.log(`String 2: "${s2}"`);
  console.log('\nInitial DP table (all zeros):');
  printTable(dp, s1, s2);

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        // Characters match
        dp[i][j] = dp[i - 1][j - 1] + 1;
        console.log(
          `\nStep: Comparing s1[${i - 1}]='${s1[i - 1]}' with s2[${j - 1}]='${s2[j - 1]}' -> MATCH!`
        );
        console.log(
          `dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i - 1][j - 1]} + 1 = ${dp[i][j]}`
        );
      } else {
        // Characters don't match
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        console.log(
          `\nStep: Comparing s1[${i - 1}]='${s1[i - 1]}' with s2[${j - 1}]='${s2[j - 1]}' -> NO MATCH`
        );
        console.log(
          `dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`
        );
      }
      printTable(dp, s1, s2);
    }
  }

  return dp[m][n];
}

/**
 * Helper function to print the DP table nicely
 */
function printTable(dp: number[][], s1: string, s2: string): void {
  const m = s1.length;
  const n = s2.length;

  // Print header
  process.stdout.write('     ');
  process.stdout.write('ε'.padStart(3));
  for (let j = 0; j < n; j++) {
    process.stdout.write(s2[j].padStart(3));
  }
  console.log();

  // Print rows
  for (let i = 0; i <= m; i++) {
    if (i === 0) {
      process.stdout.write('ε'.padStart(3) + ': ');
    } else {
      process.stdout.write(s1[i - 1].padStart(3) + ': ');
    }

    for (let j = 0; j <= n; j++) {
      process.stdout.write(dp[i][j].toString().padStart(3));
    }
    console.log();
  }
}

/**
 * STEP 6: SPACE OPTIMIZATION
 *
 * Since we only need the previous row to compute the current row,
 * we can reduce space complexity from O(m*n) to O(min(m,n))
 */
function lcsSpaceOptimized(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // Make s1 the shorter string
  if (m > n) {
    return lcsSpaceOptimized(s2, s1);
  }

  let prev: number[] = Array(m + 1).fill(0);
  let curr: number[] = Array(m + 1).fill(0);

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[i] = prev[i - 1] + 1;
      } else {
        curr[i] = Math.max(prev[i], curr[i - 1]);
      }
    }
    [prev, curr] = [curr, prev];
    curr.fill(0);
  }

  return prev[m];
}

/**
 * STEP 7: RECONSTRUCTING THE ACTUAL LCS STRING (BONUS)
 */
function findLCS(s1: string, s2: string): string {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the actual LCS
  let lcs = '';
  let i = m,
    j = n;

  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcs = s1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

// DEMONSTRATION
console.log('='.repeat(60));
console.log('LONGEST COMMON SUBSEQUENCE - DETAILED EXPLANATION');
console.log('='.repeat(60));

// Example 1: Simple case
console.log('\n--- EXAMPLE 1: "ABC" vs "AC" ---');
const result1 = lcsTabulation('ABC', 'AC');
console.log(`\nFinal Result: LCS length = ${result1}`);
console.log(`Actual LCS: "${findLCS('ABC', 'AC')}"`);

// Example 2: More complex case
console.log('\n\n--- EXAMPLE 2: "ABCDGH" vs "AEDFHR" ---');
const result2 = lcsTabulation('ABCDGH', 'AEDFHR');
console.log(`\nFinal Result: LCS length = ${result2}`);
console.log(`Actual LCS: "${findLCS('ABCDGH', 'AEDFHR')}"`);

// Compare all approaches
console.log('\n--- PERFORMANCE COMPARISON ---');
const s1 = 'HARRY';
const s2 = 'SALLY';

console.log(`Strings: "${s1}" vs "${s2}"`);
console.log(`Recursive: ${lcsRecursive(s1, s2)}`);
console.log(`Memoized: ${lcsMemoized(s1, s2)}`);
console.log(`Tabulation: ${lcsTabulation(s1, s2)}`);
console.log(`Space Optimized: ${lcsSpaceOptimized(s1, s2)}`);
console.log(`Actual LCS: "${findLCS(s1, s2)}"`);

export { lcsRecursive, lcsMemoized, lcsTabulation, lcsSpaceOptimized, findLCS };
