// https://leetcode.com/problems/subarray-sum-equals-k/description/

// Brute force
function subarraySumBruteForce(nums: number[], k: number): number {
  const prefix = new Array(nums.length);
  prefix[0] = nums[0];
  for (let i = 1; i < prefix.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const sum = i === 0 ? prefix[j] : prefix[j] - prefix[i - 1];

      if (sum === k) {
        count++;
      }
    }
  }

  return count;
}

// Prefix sum with hash map
function subarraySum(nums: number[], k: number): number {
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, 1); // Initialize with sum = 0 having one occurrence

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    // Check if there's a prefix sum that matches currentSum - k
    const neededSum = prefixSum - k;
    if (prefixSumMap.has(neededSum)) {
      count += prefixSumMap.get(neededSum)!;
    }

    // Update prefixSumMap with the current prefixSum
    prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);
  }

  return count;
}
