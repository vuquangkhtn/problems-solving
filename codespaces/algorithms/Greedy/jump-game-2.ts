// https://leetcode.com/problems/jump-game-ii/
// Illustration of the problem: https://www.youtube.com/watch?v=dJ7sWiOoK7g
// Complextity: O(n^2) time, O(n) space

function jump(nums: number[]): number {
  let step = 0;

  let left = 0,
    right = 0;
  let farthest = 0;

  while (right < nums.length - 1) {
    for (let i = left; i <= right; i++) {
      farthest = Math.max(farthest, i + nums[i]);
    }
    left = right + 1;
    right = farthest;
    step++;
  }

  return step;
}
