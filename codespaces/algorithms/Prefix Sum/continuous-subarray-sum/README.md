# Prefix Sum and Remainder Management - Deep Dive

## Core Mathematical Concept

### The Fundamental Principle

**Goal**: Find if there exists a subarray whose sum is divisible by `k`

**Key Insight**: If two prefix sums have the same remainder when divided by `k`, then the subarray between them has a sum divisible by `k`.

### Mathematical Proof

Let's say we have:

- `prefixSum[i]` = sum of elements from index 0 to i
- `prefixSum[j]` = sum of elements from index 0 to j (where j > i)

If `prefixSum[i] (mod k) ≡ prefixSum[j] (mod k)`, then:

```
prefixSum[j] - prefixSum[i] ≡ 0 (mod k)
```

This means `sum(nums[i+1...j])` is divisible by `k`.

## Detailed Example Walkthrough

### Example: nums = [23, 2, 4, 6, 7], k = 6

Let's trace through each step:

```
Initial state:
remainderMap = {0: -1}  // Special case for when prefixSum itself is divisible by k
prefixSum = 0
```

#### Step 1: i = 0, nums[0] = 23

```
prefixSum = 0 + 23 = 23
remainder = 23 % 6 = 5

remainderMap doesn't have remainder 5
Store: remainderMap[5] = 0

remainderMap = {0: -1, 5: 0}
```

#### Step 2: i = 1, nums[1] = 2

```
prefixSum = 23 + 2 = 25
remainder = 25 % 6 = 1

remainderMap doesn't have remainder 1
Store: remainderMap[1] = 1

remainderMap = {0: -1, 5: 0, 1: 1}
```

#### Step 3: i = 2, nums[2] = 4

```
prefixSum = 25 + 4 = 29
remainder = 29 % 6 = 5

remainderMap HAS remainder 5 at index 0!
Previous index = 0
Current index = 2
Subarray length = 2 - 0 = 2 ≥ 2 ✅

Found subarray: nums[1...2] = [2, 4]
Sum = 2 + 4 = 6, which is divisible by 6 ✅
```

## Why This Works: Visual Representation

```
Index:     0   1   2   3   4
nums:     [23, 2,  4,  6,  7]
prefixSum: 23, 25, 29, 35, 42
remainder: 5,  1,  5,  5,  0

When we see remainder 5 again at index 2:
- prefixSum[0] = 23, remainder = 5
- prefixSum[2] = 29, remainder = 5

Since 23 ≡ 29 (mod 6), we have:
29 - 23 = 6 ≡ 0 (mod 6)

This means nums[1] + nums[2] = 2 + 4 = 6 is divisible by 6
```

## Edge Case: Why We Initialize with {0: -1}

### Case 1: Prefix sum itself is divisible by k

```
nums = [2, 4], k = 6

i = 0: prefixSum = 2, remainder = 2
       remainderMap = {0: -1, 2: 0}

i = 1: prefixSum = 6, remainder = 0
       Found remainder 0 at index -1
       Subarray length = 1 - (-1) = 2 ≥ 2 ✅

This means nums[0...1] = [2, 4] has sum 6, divisible by 6
```

### Case 2: Handling consecutive elements that sum to multiple of k

```
nums = [3, 3], k = 6

i = 0: prefixSum = 3, remainder = 3
       remainderMap = {0: -1, 3: 0}

i = 1: prefixSum = 6, remainder = 0
       Found remainder 0 at index -1
       Subarray length = 1 - (-1) = 2 ≥ 2 ✅
```

## Common Mistakes and Pitfalls

### Mistake 1: Not handling the length requirement

```typescript
// WRONG: Not checking subarray length
if (remainderMap.has(remainder)) {
  return true; // This might return true for length 1 subarrays
}

// CORRECT: Check subarray length
if (remainderMap.has(remainder)) {
  const prevIndex = remainderMap.get(remainder)!;
  if (i - prevIndex > 1) {
    // Ensure length >= 2
    return true;
  }
}
```

### Mistake 2: Overwriting remainder indices

```typescript
// WRONG: Always update the index
remainderMap.set(remainder, i);

// CORRECT: Only store first occurrence
if (!remainderMap.has(remainder)) {
  remainderMap.set(remainder, i);
}
```

**Why this matters:**

```
nums = [1, 2, 3], k = 3

i = 0: prefixSum = 1, remainder = 1, store {1: 0}
i = 1: prefixSum = 3, remainder = 0, store {0: 1}
i = 2: prefixSum = 6, remainder = 0

If we overwrote: remainderMap[0] = 1, subarray length = 2 - 1 = 1 ❌
Keeping first: remainderMap[0] = -1, subarray length = 2 - (-1) = 3 ✅
```

## Advanced Scenarios

### Scenario 1: Multiple valid subarrays

```
nums = [2, 4, 3, 6, 1, 5], k = 6

Prefix sums: [2, 6, 9, 15, 16, 21]
Remainders:  [2, 0, 3, 3,  4,  3]

Multiple solutions:
- nums[0:1] = [2, 4] sum = 6
- nums[2:3] = [3, 6] sum = 9 (not divisible)
- nums[1:4] = [4, 3, 6, 1] sum = 14 (not divisible)

Our algorithm finds the first valid one: [2, 4]
```

### Scenario 2: Negative numbers

```
nums = [1, -1, 6], k = 6

i = 0: prefixSum = 1, remainder = 1
i = 1: prefixSum = 0, remainder = 0 (found at index -1)
       Length = 1 - (-1) = 2 ≥ 2 ✅

Subarray [1, -1] has sum 0, which is divisible by any k
```

### Scenario 3: Handling negative remainders

```typescript
// In some languages, negative % can give negative results
// In TypeScript/JavaScript, this is handled correctly
// But for safety in other languages:

const remainder = ((prefixSum % k) + k) % k;
```

## Time and Space Complexity Analysis

### Time Complexity: O(n)

- Single pass through the array
- HashMap operations (get, set, has) are O(1) average case
- Total: O(n)

### Space Complexity: O(min(n, k))

- In the worst case, we store at most min(n, k) different remainders
- Why min(n, k)?
  - We can have at most k different remainders (0 to k-1)
  - We visit at most n indices
  - So we store at most min(n, k) entries

## Implementation Variations

### Variation 1: Return the actual subarray

```typescript
function findSubarraySum(nums: number[], k: number): number[] | null {
  const remainderMap = new Map<number, number>();
  remainderMap.set(0, -1);

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const remainder = prefixSum % k;

    if (remainderMap.has(remainder)) {
      const prevIndex = remainderMap.get(remainder)!;
      if (i - prevIndex > 1) {
        return nums.slice(prevIndex + 1, i + 1);
      }
    } else {
      remainderMap.set(remainder, i);
    }
  }

  return null;
}
```

### Variation 2: Count all valid subarrays

```typescript
function countSubarraySum(nums: number[], k: number): number {
  const remainderCount = new Map<number, number>();
  remainderCount.set(0, 1);

  let prefixSum = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const remainder = prefixSum % k;

    if (remainderCount.has(remainder)) {
      count += remainderCount.get(remainder)!;
    }

    remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
  }

  return count;
}
```

## Summary

The prefix sum and remainder management technique is powerful because:

1. **Transforms the problem**: From checking all subarrays O(n²) to a single pass O(n)
2. **Uses mathematical insight**: Two equal remainders mean the difference is divisible by k
3. **Handles edge cases elegantly**: The {0: -1} initialization covers prefix sums divisible by k
4. **Space efficient**: Only stores unique remainders, not all prefix sums
