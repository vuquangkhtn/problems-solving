# Multi Pointers Technique

## Overview

The Multi Pointers technique (also known as Two Pointers) is a powerful algorithmic approach that uses multiple pointers to traverse data structures efficiently. This technique is particularly effective for problems involving arrays, strings, and linked lists.

## Core Concepts

### What are Multi Pointers?
Multi pointers involve using two or more pointers that move through a data structure according to certain conditions, often reducing time complexity from O(n²) to O(n).

### Common Pointer Movements
1. **Opposite Direction**: Start from both ends, move toward center
2. **Same Direction**: Both pointers move in the same direction at different speeds
3. **Fixed Distance**: Maintain constant distance between pointers
4. **Conditional Movement**: Move pointers based on specific conditions

## Pattern Categories

### 1. Two Sum Pattern (Opposite Direction)
**Use Case**: Find pairs that meet certain criteria in sorted arrays

```typescript
function twoSum(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}
```

### 2. Fast and Slow Pointers (Floyd's Algorithm)
**Use Case**: Detect cycles, find middle elements

```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

function findMiddle(head: ListNode | null): ListNode | null {
    if (!head) return null;
    
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    
    return slow;
}
```

### 3. Sliding Window with Pointers
**Use Case**: Variable-size windows, substring problems

```typescript
function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

### 4. Three Pointers
**Use Case**: Three sum problems, partitioning

```typescript
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first pointer
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

### 5. Remove Duplicates Pattern
**Use Case**: In-place array modification

```typescript
function removeDuplicates(nums: number[]): number {
    if (nums.length <= 1) return nums.length;
    
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}
```

## Advanced Patterns

### 1. Palindrome Verification
```typescript
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
}
```

### 2. Container With Most Water
```typescript
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;
        
        maxWater = Math.max(maxWater, currentArea);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

### 3. Merge Sorted Arrays
```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;  // Last element in nums1
    let j = n - 1;  // Last element in nums2
    let k = m + n - 1;  // Last position in merged array
    
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    
    // Copy remaining elements from nums2
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}
```

## When to Use Multi Pointers

### Ideal Scenarios
1. **Sorted Arrays**: Two sum, three sum problems
2. **Palindromes**: String or array palindrome checks
3. **Linked Lists**: Cycle detection, finding middle
4. **Array Partitioning**: Dutch flag problem
5. **Merging**: Combining sorted sequences
6. **Sliding Windows**: Variable-size window problems

### Problem Indicators
- Need to find pairs/triplets with specific properties
- Working with sorted data
- Need to detect patterns or cycles
- In-place array modifications required
- Optimizing from O(n²) to O(n)

## Interview Tips

### Common Mistakes
1. **Boundary Conditions**: Always check pointer bounds
2. **Infinite Loops**: Ensure pointers always move
3. **Duplicate Handling**: Skip duplicates when necessary
4. **Pointer Initialization**: Start pointers at correct positions

### Optimization Strategies
1. **Early Termination**: Break when conditions are met
2. **Skip Duplicates**: Avoid redundant comparisons
3. **Choose Right Pattern**: Match technique to problem type
4. **Space Efficiency**: Often achieves O(1) space complexity

### Problem-Solving Steps
1. **Identify Pattern**: Determine which multi-pointer technique applies
2. **Initialize Pointers**: Set starting positions correctly
3. **Define Movement Rules**: How and when to move each pointer
4. **Handle Edge Cases**: Empty arrays, single elements, etc.
5. **Optimize**: Look for early termination opportunities

## Practice Problems

### Easy
- Two Sum II (sorted array)
- Valid Palindrome
- Remove Duplicates from Sorted Array
- Merge Sorted Array
- Linked List Cycle

### Medium
- 3Sum
- Container With Most Water
- Remove Nth Node From End of List
- Sort Colors (Dutch Flag)
- Longest Substring Without Repeating Characters
- Find the Duplicate Number

### Hard
- Trapping Rain Water
- 4Sum
- Minimum Window Substring
- Sliding Window Maximum
- Longest Substring with At Most K Distinct Characters

## Time and Space Complexity

| Pattern | Time | Space | Use Case |
|---------|------|-------|----------|
| Two Sum (sorted) | O(n) | O(1) | Find pairs |
| Fast/Slow Pointers | O(n) | O(1) | Cycle detection |
| Three Pointers | O(n²) | O(1) | Triplet problems |
| Sliding Window | O(n) | O(k) | Substring problems |
| Array Partitioning | O(n) | O(1) | In-place sorting |

## Related Techniques
- **Sliding Window**: Often combined with multi-pointers
- **Binary Search**: Can use two pointers for range searches
- **Divide and Conquer**: Merge operations use multi-pointers
- **Dynamic Programming**: Some DP problems benefit from pointer techniques