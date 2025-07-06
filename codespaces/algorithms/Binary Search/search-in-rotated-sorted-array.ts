// LeetCode 33: Search in Rotated Sorted Array
// https://leetcode.com/problems/search-in-rotated-sorted-array/
// Time Complexity: O(log n)
// Space Complexity: O(1)

function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] === target) {
      return left;
    }

    if (nums[right] === target) {
      return right;
    }
    // determine if left or right is sort
    if (nums[left] <= nums[mid]) {
      // left half is sort
      if (nums[mid] > target && nums[left] < target) {
        // target in left sorted
        right = mid - 1;
      } else {
        // right half
        left = mid + 1;
      }
    } else {
      // right half is sort
      if (nums[right] > target && nums[mid] < target) {
        left = mid + 1;
      } else {
        // left half
        right = mid - 1;
      }
    }
  }

  return -1;
}
