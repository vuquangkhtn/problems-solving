// LeetCode 153. Find Minimum in Rotated Sorted Array
// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/// Time Complexity: O(log n)
// Space Complexity: O(1)
// Binary Search
// Difficulty: Medium

function findMin(nums: number[]): number {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    // right half
    if (nums[right] < nums[mid]) {
      left = mid + 1;
    } else {
      // left half
      right = mid;
    }
  }

  return nums[left];
}
