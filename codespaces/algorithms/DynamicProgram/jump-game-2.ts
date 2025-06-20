// https://leetcode.com/problems/jump-game-ii/

function jump(nums: number[]): number {
  const dp = new Array(nums.length).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (j + nums[j] >= i) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }

  return dp[nums.length - 1];
}
