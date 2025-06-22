// https://leetcode.com/problems/edit-distance/

// Recursive With Memoization
function minDistance(word1: string, word2: string): number {
  const memo = new Map();
  const helper = (i = 0, j = 0) => {
    // Create unique key for this subproblem
    const key = `${i},${j}`;

    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let result = 0;
    if (i === word1.length) {
      result = word2.length - j;
    }

    if (j === word2.length) {
      result = word1.length - i;
    }

    if (word1[i] === word2[j]) {
      result = helper(i + 1, j + 1);
    } else {
      const change = 1 + helper(i + 1, j + 1);
      const remove = 1 + helper(i + 1, j);
      const add = 1 + helper(i, j + 1);
      result = Math.min(change, remove, add);
    }

    memo.set(key, result);
    return result;
  };

  return helper();
}

// Dynamic Programming
function minDistanceDP(word1: string, word2: string): number {
  const dp = Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0));

  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      if (i === 0) {
        dp[i][j] = j; // If word1 is empty, we need j insertions
      } else if (j === 0) {
        dp[i][j] = i; // If word2 is empty, we need i deletions
      } else if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation needed
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // Change
          dp[i - 1][j] + 1, // Remove
          dp[i][j - 1] + 1 // Add
        );
      }
    }
  }

  return dp[word1.length][word2.length];
}
