// https://leetcode.com/problems/next-greater-element-i/description/

// O (m + n); m < n => O(n)
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const stack: number[] = [];
  const temp = {};

  // O(n)
  for (let i = nums2.length - 1; i >= 0; i--) {
    const val = nums2[i];
    while (stack.length && stack[stack.length - 1] <= val) {
      stack.pop();
    }

    if (stack.length) {
      temp[val] = stack[stack.length - 1];
    } else {
      temp[val] = -1;
    }

    stack.push(val);
  }

  const result = new Array(nums1.length);
  // O(m)
  for (let i = 0; i < nums1.length; i++) {
    result[i] = temp[nums1[i]];
  }
  return result;
}
