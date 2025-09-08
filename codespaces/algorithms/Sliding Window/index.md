# Sliding Window Algorithms

A comprehensive guide to mastering sliding window techniques for technical interviews. The sliding window pattern is essential for solving array and string problems efficiently.

## 📚 Table of Contents

- [What is Sliding Window?](#what-is-sliding-window)
- [Core Concepts](#core-concepts)
- [When to Use Sliding Window](#when-to-use-sliding-window)
- [Common Patterns](#common-patterns)
- [Problem Categories](#problem-categories)
- [Interview Tips](#interview-tips)
- [Practice Problems](#practice-problems)
- [Time & Space Complexity](#time--space-complexity)

## What is Sliding Window?

Sliding window is a **two-pointer technique** that maintains a "window" of elements in an array or string. The window can expand, shrink, or slide to efficiently solve problems that would otherwise require nested loops.

### Key Characteristics

- **Efficiency**: Reduces O(n²) or O(n³) solutions to O(n)
- **Two Pointers**: Uses `left` and `right` pointers to define window boundaries
- **State Tracking**: Maintains window state (sum, count, frequency, etc.)
- **Dynamic Size**: Window can grow or shrink based on conditions

### Visual Representation

```
Array: [1, 2, 3, 4, 5, 6, 7, 8]
        ↑     ↑
      left  right
      Window: [1, 2, 3]

// Slide right
Array: [1, 2, 3, 4, 5, 6, 7, 8]
           ↑     ↑
         left  right
         Window: [2, 3, 4]
```

## Core Concepts

### 1. Window Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Fixed Size** | Window size remains constant | "Find max sum of k elements" |
| **Dynamic Size** | Window grows/shrinks based on condition | "Longest substring with k unique chars" |
| **Shrinking** | Window only shrinks when condition violated | "Minimum window substring" |

### 2. Window Operations

```typescript
// Basic window operations
class SlidingWindow {
    private left = 0;
    private right = 0;
    private windowState = new Map(); // or other data structure
    
    expand(element: any) {
        // Add element to window
        this.right++;
    }
    
    shrink(element: any) {
        // Remove element from window
        this.left++;
    }
    
    isValid(): boolean {
        // Check if current window satisfies condition
        return true; // implementation depends on problem
    }
}
```

### 3. State Management

**Common state tracking approaches:**
- **Sum/Product**: For numerical calculations
- **Frequency Map**: For character/element counting
- **Set**: For unique elements
- **Boolean flags**: For condition checking

## When to Use Sliding Window

### ✅ Perfect Scenarios

1. **Subarray/Substring Problems**
   - Maximum/minimum sum of size k
   - Longest/shortest substring with condition
   - Count of subarrays satisfying condition

2. **Optimization Problems**
   - Find optimal window size
   - Minimize/maximize window property
   - Replace/delete minimum elements

3. **Pattern Matching**
   - Anagram detection
   - Pattern occurrence counting
   - Character frequency matching

### 🔍 Recognition Keywords

- "subarray", "substring"
- "contiguous elements"
- "window of size k"
- "longest/shortest"
- "maximum/minimum"
- "at most k", "exactly k"
- "contains all", "without repeating"

### ❌ Not Suitable For

- Non-contiguous subsequences
- Problems requiring element reordering
- Global optimization (use DP instead)
- Tree/graph traversal problems

## Common Patterns

### Pattern 1: Fixed Size Window

**Problem**: Find maximum sum of k consecutive elements

```typescript
function maxSumFixedWindow(nums: number[], k: number): number {
    if (nums.length < k) return 0;
    
    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;
    
    // Slide window: remove left, add right
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

### Pattern 2: Dynamic Window (Maximum Length)

**Problem**: Longest substring with at most k unique characters

```typescript
function longestSubstringKUnique(s: string, k: number): number {
    const charCount = new Map<string, number>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Expand window
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        
        // Shrink window if condition violated
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar)! - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }
        
        // Update result
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

### Pattern 3: Minimum Window

**Problem**: Minimum window substring containing all characters

```typescript
function minWindowSubstring(s: string, t: string): string {
    const targetCount = new Map<string, number>();
    for (const char of t) {
        targetCount.set(char, (targetCount.get(char) || 0) + 1);
    }
    
    const windowCount = new Map<string, number>();
    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let formed = 0;
    const required = targetCount.size;
    
    for (let right = 0; right < s.length; right++) {
        // Expand window
        const rightChar = s[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        if (targetCount.has(rightChar) && 
            windowCount.get(rightChar) === targetCount.get(rightChar)) {
            formed++;
        }
        
        // Shrink window while valid
        while (formed === required) {
            // Update result
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
            if (targetCount.has(leftChar) && 
                windowCount.get(leftChar)! < targetCount.get(leftChar)!) {
                formed--;
            }
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
}
```

## Problem Categories

### 🎯 Category 1: Fixed Window Size
- Maximum sum of k elements
- Average of k elements
- First negative in every window of size k
- Sliding window maximum/minimum

### 🎯 Category 2: Variable Window - Maximum
- Longest substring without repeating characters
- Longest substring with k unique characters
- Maximum consecutive 1s after flipping k 0s
- Longest subarray with sum ≤ k

### 🎯 Category 3: Variable Window - Minimum
- Minimum window substring
- Smallest subarray with sum ≥ k
- Minimum window containing all elements
- Shortest substring with all characters

### 🎯 Category 4: Counting Problems
- Number of subarrays with sum = k
- Count of substrings with k unique characters
- Number of nice subarrays
- Subarrays with at most k different integers

## Interview Tips

### 🎯 Problem Recognition

**Ask yourself:**
1. Does the problem involve contiguous elements?
2. Can I solve it by maintaining a window of elements?
3. Would a brute force solution use nested loops?
4. Am I looking for optimal subarray/substring?

### 🔧 Implementation Strategy

1. **Identify window type** (fixed vs dynamic)
2. **Choose data structure** for state tracking
3. **Define expand/shrink conditions**
4. **Handle edge cases** (empty array, k > length)

### 🧪 Common Mistakes

❌ **Wrong window size calculation**
```typescript
// Wrong
windowSize = right - left; 

// Correct
windowSize = right - left + 1;
```

❌ **Forgetting to update state**
```typescript
// Wrong: forgot to remove from state when shrinking
while (condition) {
    left++; // Missing: remove nums[left] from state
}

// Correct
while (condition) {
    removeFromState(nums[left]);
    left++;
}
```

❌ **Incorrect shrinking condition**
```typescript
// For "at most k" problems, shrink when > k
while (uniqueCount > k) { /* shrink */ }

// For "exactly k" problems, different logic needed
```

### 🧪 Testing Strategy

```typescript
// Essential test cases
const testCases = [
    { input: [], k: 1 },                    // Empty array
    { input: [1], k: 1 },                   // Single element
    { input: [1,2,3], k: 5 },               // k > array length
    { input: [1,2,3,4,5], k: 1 },           // k = 1
    { input: [1,2,3,4,5], k: 5 },           // k = array length
    { input: [1,1,1,1], k: 2 },             // All same elements
    { input: [1,2,1,2,1], k: 2 },           // Alternating pattern
];
```

## Practice Problems

### 🟢 Easy
- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)
- [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)
- [Defanging an IP Address](https://leetcode.com/problems/defanging-an-ip-address/)

### 🟡 Medium
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/)
- [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/)

### 🔴 Hard
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
- [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)
- [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/)

## Time & Space Complexity

| Pattern | Time | Space | Notes |
|---------|------|-------| ----- |
| **Fixed Window** | O(n) | O(1) | Constant state tracking |
| **Dynamic Window** | O(n) | O(k) | k = unique elements in window |
| **Character Frequency** | O(n) | O(min(m,k)) | m = alphabet size, k = window size |
| **Multiple Conditions** | O(n) | O(k) | k = number of different states |

## Resources

- 📖 **Templates**: See [templates.md](./templates.md) for detailed code templates
- 🎯 **Practice**: Start with fixed window, then move to dynamic
- 📝 **Pattern Recognition**: Focus on identifying the right window type

---

**Key Insight**: Sliding window transforms nested loop problems (O(n²)) into single pass solutions (O(n)) by maintaining state efficiently! 🚀