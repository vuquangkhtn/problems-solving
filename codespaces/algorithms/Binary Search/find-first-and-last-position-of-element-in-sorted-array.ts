// LeetCode 34. Find First and Last Position of Element in Sorted Array
// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
// Difficulty: Medium

function searchRange(nums: number[], target: number): number[] {
  const result = [-1, -1];

  // rightmost
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      // mid === target
      result[1] = mid;
      left = mid + 1;
    }
  }

  // leftmost
  (left = 0), (right = result[1]);
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      result[0] = mid;
      right = mid - 1;
    }
  }

  return result;
}
