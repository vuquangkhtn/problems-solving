// LeetCode 1143. Longest Common Subsequence
// https://leetcode.com/problems/longest-common-subsequence/
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)
// where m is the length of text1 and n is the length of text2
// Approach: Dynamic Programming
// Illustration: https://www.youtube.com/watch?v=Ua0GhsJSlWM

function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = Array.from(new Array(text1.length + 1), () => new Array(text2.length + 1).fill(0));

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}
