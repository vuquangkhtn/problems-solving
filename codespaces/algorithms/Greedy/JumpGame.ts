// https://leetcode.com/problems/jump-game/
// Illustration of the problem: https://www.youtube.com/watch?v=Yan0cv2cLy8
/**
 * JUMP GAME - OPTIMAL SOLUTION
 *
 * Problem: Given an array of non-negative integers nums, you are initially positioned
 * at the first index. Each element represents your maximum jump length at that position.
 * Determine if you are able to reach the last index.
 *
 * Examples:
 * - [2,3,1,1,4] → true (0→1→4 or 0→2→3→4)
 * - [3,2,1,0,4] → false (stuck at index 3)
 */

/**
 * APPROACH 1: GREEDY (OPTIMAL SOLUTION)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Key Insight: We only need to track the furthest position we can reach.
 * If at any point our current position exceeds the furthest reachable position,
 * we know we can't reach the end.
 */
function canJump(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let maxReach = 0; // Furthest position we can reach

  for (let i = 0; i < nums.length; i++) {
    // If current position is beyond our reach, we can't proceed
    if (i > maxReach) {
      return false;
    }

    // Update the furthest position we can reach
    maxReach = Math.max(maxReach, i + nums[i]);

    // Early termination: if we can reach the last index
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return maxReach >= nums.length - 1;
}

/**
 * APPROACH 2: GREEDY BACKWARDS (ALTERNATIVE OPTIMAL)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Key Insight: Start from the end and work backwards.
 * Keep track of the leftmost position from which we can reach the target.
 */
function canJumpBackwards(nums: number[]): boolean {
  let target = nums.length - 1; // Start from the last index

  // Work backwards from second-to-last position
  for (let i = nums.length - 2; i >= 0; i--) {
    // If from position i we can reach the current target
    if (i + nums[i] >= target) {
      target = i; // Update target to current position
    }
  }

  // If target is 0, we can reach the end from the start
  return target === 0;
}

/**
 * APPROACH 3: DYNAMIC PROGRAMMING (NOT OPTIMAL BUT EDUCATIONAL)
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 *
 * This shows the DP approach for educational purposes.
 */
function canJumpDP(nums: number[]): boolean {
  const n = nums.length;
  const dp: boolean[] = new Array(n).fill(false);
  dp[0] = true; // We start at index 0

  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue; // Can't reach position i

    // From position i, mark all reachable positions
    for (let j = 1; j <= nums[i] && i + j < n; j++) {
      dp[i + j] = true;
    }
  }

  return dp[n - 1];
}
