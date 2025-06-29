// https://leetcode.com/problems/jump-game/

// not optimal - refer greedy algo
function canJump(nums: number[]): boolean {
  const dp = new Array(nums.length).fill(false);

  dp[0] = true;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (j + nums[j] >= i && dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[nums.length - 1];
}
