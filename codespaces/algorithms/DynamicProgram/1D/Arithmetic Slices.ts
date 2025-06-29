// https://leetcode.com/problems/arithmetic-slices/?envType=problem-list-v2&envId=dynamic-programming

function numberOfArithmeticSlices(nums: number[]): number {
  if (nums.length < 3) return 0;

  const dp = new Array(nums.length).fill(0);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = dp[i - 1];
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      const diff = nums[i] - nums[i - 1];

      let j = i - 2;
      while (j >= 0 && nums[j + 1] - nums[j] === diff) {
        dp[i] += 1;
        j--;
      }
    }
  }

  return dp[nums.length - 1];
}

/**
1 2 3 4 5 6 9 10 11

1 2 3 -> 0 + 1 
1 2 3 4 -> 3 = 1 + 2
1 2 3 4 5 -> 6 = 3 + 3
1 2 3 4 5 6 -> 10 = 6 + 4
1 2 3 4 5 6 7 -> 5 + 4 + 3 + 2 + 1 = 15 = 10 + 5
1 2 3 4 5 6 7 9 -> 15
1 2 3 4 5 6 7 9 10 -> 15
1 2 3 4 5 6 7 9 10 11 -> 16
1 2 3 4 5 6 7 9 10 11 12 -> 18


*/
