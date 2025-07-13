// https://leetcode.com/problems/continuous-subarray-sum/description/

function checkSubarraySum(nums: number[], k: number): boolean {
  // Map to store remainder -> first occurrence index
  const remainderMap = new Map<number, number>();

  // Initialize with remainder 0 at index -1 to handle edge cases
  remainderMap.set(0, -1);

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    // Calculate remainder when divided by k
    const remainder = prefixSum % k;

    // If we've seen this remainder before
    if (remainderMap.has(remainder)) {
      const prevIndex = remainderMap.get(remainder)!;

      // Check if subarray length is at least 2
      if (i - prevIndex > 1) {
        return true;
      }
    } else {
      // Store the first occurrence of this remainder
      remainderMap.set(remainder, i);
    }
  }

  return false;
}

function checkSubarraySumBruteForce(nums: number[], k: number): boolean {
  const prefix = new Array(nums.length);
  prefix[0] = nums[0];
  for (let i = 1; i < prefix.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = i === 0 ? prefix[j] : prefix[j] - prefix[i - 1];
      if (sum % k === 0) return true;
    }
  }
  return false;
}
