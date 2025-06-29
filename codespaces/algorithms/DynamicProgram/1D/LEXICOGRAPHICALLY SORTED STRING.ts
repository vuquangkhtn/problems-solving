/**
 * MINIMUM REMOVALS TO CREATE LEXICOGRAPHICALLY SORTED STRING
 *
 * Problem: Given a string S, find the minimum number of characters to remove
 * to make the string lexicographically sorted (non-decreasing order).
 *
 * Example: S = "BANANA"
 * - Original: B A N A N A
 * - Sorted:   A A A B N N (would require rearrangement)
 * - LIS:      A A N (longest increasing subsequence)
 * - Remove:   B N A (3 characters)
 * - Result:   A A N (lexicographically sorted)
 */

/**
 * APPROACH 1: LONGEST INCREASING SUBSEQUENCE (LIS)
 *
 * Key Insight: The minimum removals = n - LIS length
 * where LIS is the Longest Increasing Subsequence (non-decreasing)
 *
 * Time Complexity: O(n²) with DP, O(n log n) with binary search
 * Space Complexity: O(n)
 */

/**
 * METHOD 1: Dynamic Programming O(n²)
 */
function minRemovalsDP(s: string): number {
  if (s.length <= 1) return 0;

  const n = s.length;
  // dp[i] = length of longest increasing subsequence ending at index i
  const dp: number[] = new Array(n).fill(1);

  console.log(`\n=== DYNAMIC PROGRAMMING APPROACH ===`);
  console.log(`Input: "${s}"`);
  console.log(`Goal: Find longest non-decreasing subsequence\n`);

  // Build LIS using DP
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (s[j] <= s[i]) {
        // Non-decreasing (allow equal characters)
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    console.log(`dp[${i}] (char '${s[i]}'): ${dp[i]}`);
  }

  const lisLength = Math.max(...dp);
  const removals = n - lisLength;

  console.log(`\nLongest increasing subsequence length: ${lisLength}`);
  console.log(`Characters to remove: ${n} - ${lisLength} = ${removals}`);

  return removals;
}

/**
 * METHOD 2: Binary Search Optimization O(n log n)
 */
function minRemovalsBinarySearch(s: string): number {
  if (s.length <= 1) return 0;

  console.log(`\n=== BINARY SEARCH APPROACH ===`);
  console.log(`Input: "${s}"`);

  const tails: string[] = []; // tails[i] = smallest tail of increasing subsequence of length i+1

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Binary search for the position to insert/replace
    let left = 0,
      right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] <= char) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // If left == tails.length, we extend the sequence
    if (left === tails.length) {
      tails.push(char);
      console.log(`Step ${i + 1}: '${char}' extends sequence, tails: [${tails.join(', ')}]`);
    } else {
      // Replace the element at position 'left'
      console.log(`Step ${i + 1}: '${char}' replaces '${tails[left]}' at position ${left}`);
      tails[left] = char;
      console.log(`  Updated tails: [${tails.join(', ')}]`);
    }
  }

  const lisLength = tails.length;
  const removals = s.length - lisLength;

  console.log(`\nLIS length: ${lisLength}`);
  console.log(`Removals needed: ${s.length} - ${lisLength} = ${removals}`);

  return removals;
}

/**
 * METHOD 3: GREEDY APPROACH (Alternative perspective)
 *
 * Keep track of characters that form an increasing subsequence
 */
function minRemovalsGreedy(s: string): number {
  if (s.length <= 1) return 0;

  console.log(`\n=== GREEDY APPROACH ===`);
  console.log(`Input: "${s}"`);

  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Remove characters from stack that are greater than current character
    // This helps us maintain the lexicographically smallest increasing subsequence
    while (stack.length > 0 && stack[stack.length - 1] > char) {
      const removed = stack.pop();
      console.log(`  Removed '${removed}' from stack (greater than '${char}')`);
    }

    stack.push(char);
    console.log(`Step ${i + 1}: Added '${char}', stack: [${stack.join(', ')}]`);
  }

  const keepLength = stack.length;
  const removals = s.length - keepLength;

  console.log(`\nFinal subsequence: "${stack.join('')}"`);
  console.log(`Length kept: ${keepLength}`);
  console.log(`Removals needed: ${s.length} - ${keepLength} = ${removals}`);

  return removals;
}

/**
 * METHOD 4: FIND ACTUAL LIS AND SHOW WHAT TO REMOVE
 */
function findLISAndRemovals(s: string): { lis: string; removals: string[]; count: number } {
  if (s.length <= 1) return { lis: s, removals: [], count: 0 };

  const n = s.length;
  const dp: number[] = new Array(n).fill(1);
  const parent: number[] = new Array(n).fill(-1);

  // Build LIS with parent tracking
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (s[j] <= s[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        parent[i] = j;
      }
    }
  }

  // Find the ending position of LIS
  let maxLength = Math.max(...dp);
  let endIndex = dp.indexOf(maxLength);

  // Reconstruct LIS
  const lisIndices: number[] = [];
  let current = endIndex;
  while (current !== -1) {
    lisIndices.unshift(current);
    current = parent[current];
  }

  // Build result
  const lis = lisIndices.map((i) => s[i]).join('');
  const removalIndices = Array.from({ length: n }, (_, i) => i).filter(
    (i) => !lisIndices.includes(i)
  );
  const removals = removalIndices.map((i) => s[i]);

  return {
    lis,
    removals,
    count: removals.length,
  };
}

/**
 * COMPREHENSIVE TESTING AND VISUALIZATION
 */
function comprehensiveTest(): void {
  const testCases = [
    'BANANA',
    'DCBA',
    'ABCD',
    'AABBCC',
    'ZYXWVU',
    'ABDECA',
    'PROGRAMMING',
    'A',
    '',
    'AAAA',
  ];

  console.log('\n=== COMPREHENSIVE TESTING ===\n');

  testCases.forEach((testCase, index) => {
    console.log(`\n--- Test Case ${index + 1}: "${testCase}" ---`);

    if (testCase.length === 0) {
      console.log('Empty string: 0 removals needed');
      return;
    }

    const dpResult = minRemovalsDP(testCase);
    const bsResult = minRemovalsBinarySearch(testCase);
    const greedyResult = minRemovalsGreedy(testCase);

    const { lis, removals, count } = findLISAndRemovals(testCase);

    console.log('\n--- RESULTS SUMMARY ---');
    console.log(`DP Approach:           ${dpResult} removals`);
    console.log(`Binary Search:         ${bsResult} removals`);
    console.log(`Greedy Approach:       ${greedyResult} removals`);
    console.log(`\nLongest Increasing Subsequence: "${lis}"`);
    console.log(`Characters to remove: [${removals.join(', ')}]`);
    console.log(`Total removals: ${count}`);

    // Verify all methods agree
    if (dpResult === bsResult && bsResult === count) {
      console.log('✅ All approaches agree!');
    } else {
      console.log('❌ Approaches disagree!');
      console.log(`DP: ${dpResult}, BS: ${bsResult}, Actual: ${count}`);
    }

    console.log('\n' + '='.repeat(50));
  });
}

/**
 * EXPLANATION OF THE ALGORITHM
 */
function explainAlgorithm(): void {
  console.log('\n=== ALGORITHM EXPLANATION ===\n');

  console.log('PROBLEM UNDERSTANDING:');
  console.log('- We want the minimum removals to make string lexicographically sorted');
  console.log('- Lexicographically sorted means s[i] <= s[i+1] for all i');
  console.log('- This is equivalent to finding the Longest Increasing Subsequence (LIS)');
  console.log('- Minimum removals = string length - LIS length\n');

  console.log('WHY LIS WORKS:');
  console.log('- LIS gives us the maximum characters we can keep in sorted order');
  console.log('- All other characters must be removed');
  console.log('- This minimizes the number of removals\n');

  console.log('APPROACHES:');
  console.log('1. Dynamic Programming: O(n²) time, O(n) space');
  console.log('2. Binary Search: O(n log n) time, O(n) space - OPTIMAL');
  console.log('3. Greedy with Stack: O(n) time, O(n) space - Alternative\n');

  console.log('EXAMPLE WALKTHROUGH: "BANANA"');
  console.log('- B A N A N A (original)');
  console.log('- Possible increasing subsequences: A, B, AN, AA, AAN, etc.');
  console.log('- Longest: "AAN" (length 3)');
  console.log('- Remove: B, N, A (3 characters)');
  console.log('- Result: "AAN" (lexicographically sorted)');
  console.log('- Answer: 6 - 3 = 3 removals');
}

// Run all demonstrations
explainAlgorithm();
comprehensiveTest();

console.log('\n=== PERFORMANCE COMPARISON ===');
console.log('For large inputs, use Binary Search approach (O(n log n))');
console.log('For understanding, DP approach is more intuitive');
console.log('Greedy approach gives different but valid results for some interpretations');

export {
  minRemovalsDP,
  minRemovalsBinarySearch, // ⭐ RECOMMENDED for performance
  minRemovalsGreedy,
  findLISAndRemovals,
};
