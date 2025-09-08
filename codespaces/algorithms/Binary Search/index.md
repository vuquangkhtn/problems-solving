# Binary Search Algorithms

A comprehensive guide to mastering binary search algorithms for technical interviews. Binary search is one of the most fundamental and frequently tested algorithms in coding interviews.

## 📚 Table of Contents

- [What is Binary Search?](#what-is-binary-search)
- [Core Concepts](#core-concepts)
- [When to Use Binary Search](#when-to-use-binary-search)
- [Common Patterns](#common-patterns)
- [Interview Tips](#interview-tips)
- [Practice Problems](#practice-problems)
- [Time & Space Complexity](#time--space-complexity)

## What is Binary Search?

Binary search is a **divide-and-conquer** algorithm that efficiently finds a target value in a **sorted array** by repeatedly dividing the search interval in half.

### Key Characteristics

- **Prerequisite**: Array must be sorted
- **Strategy**: Eliminate half of the search space in each iteration
- **Efficiency**: O(log n) time complexity
- **Memory**: O(1) space complexity (iterative)

### Basic Algorithm Flow

```
1. Set left = 0, right = array.length - 1
2. While left <= right:
   a. Calculate mid = left + (right - left) / 2
   b. If array[mid] == target: return mid
   c. If array[mid] < target: left = mid + 1
   d. If array[mid] > target: right = mid - 1
3. Return -1 (not found)
```

## Core Concepts

### 1. Search Space Reduction

```typescript
// Each comparison eliminates half the remaining elements
[1, 3, 5, 7, 9, 11, 13, 15]  // 8 elements
       ↑ mid=7
// If target > 7, eliminate left half
             [9, 11, 13, 15]  // 4 elements
                ↑ mid=11
// Continue until found or exhausted
```

### 2. Boundary Handling

**Critical Points:**
- **Mid calculation**: Use `left + (right - left) / 2` to avoid overflow
- **Loop condition**: `left <= right` vs `left < right`
- **Update strategy**: `left = mid + 1` vs `left = mid`

### 3. Variant Types

| Type | Purpose | Loop Condition | Update Rule |
|------|---------|----------------|-------------|
| **Classic** | Find exact match | `left <= right` | `left = mid + 1`, `right = mid - 1` |
| **Left Bound** | Find first occurrence | `left < right` | `left = mid + 1`, `right = mid` |
| **Right Bound** | Find last occurrence | `left < right` | `left = mid`, `right = mid - 1` |

## When to Use Binary Search

### ✅ Perfect Scenarios

1. **Sorted Array Search**
   - Finding exact value
   - Finding insertion position
   - Finding first/last occurrence

2. **Range Queries**
   - First element ≥ target
   - Last element ≤ target
   - Count of elements in range

3. **Rotated Sorted Arrays**
   - Search in rotated array
   - Find rotation point
   - Find minimum/maximum

4. **Binary Search on Answer**
   - Optimization problems
   - Finding minimum/maximum feasible value
   - Resource allocation problems

### ❌ Not Suitable For

- Unsorted arrays (sort first: O(n log n))
- Linked lists (no random access)
- Very small arrays (linear search might be faster)
- When you need all occurrences

## Common Patterns

### Pattern 1: Classic Search
```typescript
// Find exact target in sorted array
function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

### Pattern 2: Find Boundaries
```typescript
// Find first position where condition is true
function findFirst(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] >= target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else {
            left = mid + 1;
        }
    }
    return result;
}
```

### Pattern 3: Binary Search on Answer
```typescript
// Find minimum value that satisfies condition
function binarySearchAnswer(condition: (x: number) => boolean, 
                          left: number, right: number): number {
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (condition(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

## Interview Tips

### 🎯 Problem Recognition

**Look for these keywords:**
- "sorted array"
- "find target"
- "first/last occurrence"
- "insertion position"
- "rotated sorted"
- "minimum/maximum that satisfies"

### 🔧 Implementation Tips

1. **Always clarify requirements:**
   - Exact match or closest?
   - First/last occurrence?
   - What to return if not found?

2. **Handle edge cases:**
   - Empty array
   - Single element
   - Target not in array
   - All elements same

3. **Avoid common mistakes:**
   - Integer overflow in mid calculation
   - Infinite loops (wrong update rules)
   - Off-by-one errors

### 🧪 Testing Strategy

```typescript
// Test cases to always consider:
const testCases = [
    { nums: [], target: 1 },           // Empty array
    { nums: [1], target: 1 },          // Single element (found)
    { nums: [1], target: 2 },          // Single element (not found)
    { nums: [1,2,3], target: 2 },      // Middle element
    { nums: [1,2,3], target: 1 },      // First element
    { nums: [1,2,3], target: 3 },      // Last element
    { nums: [1,2,3], target: 0 },      // Before range
    { nums: [1,2,3], target: 4 },      // After range
    { nums: [1,1,1], target: 1 },      // Duplicates
];
```

## Practice Problems

### 🟢 Easy
- [Binary Search](./search-in-rotated-sorted-array.ts)
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [First Bad Version](https://leetcode.com/problems/first-bad-version/)

### 🟡 Medium
- [Find First and Last Position](./find-first-and-last-position-of-element-in-sorted-array.ts)
- [Search in Rotated Sorted Array](./search-in-rotated-sorted-array.ts)
- [Find Minimum in Rotated Sorted Array](./find-minimum-in-rotated-sorted-array.ts)
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

### 🔴 Hard
- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)
- [Kth Smallest Element in Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

## Time & Space Complexity

| Operation | Time | Space | Notes |
|-----------|------|-------| ----- |
| **Classic Search** | O(log n) | O(1) | Iterative implementation |
| **Recursive Search** | O(log n) | O(log n) | Due to call stack |
| **Range Search** | O(log n) | O(1) | Find start + end positions |
| **2D Matrix Search** | O(log(m×n)) | O(1) | Treat as 1D array |

## Resources

- 📖 **Templates**: See [templates.md](./templates.md) for detailed code templates
- 🎯 **Practice**: Work through problems in order of difficulty
- 📝 **Notes**: Focus on boundary conditions and edge cases

---

**Remember**: Binary search is not just about finding elements—it's a powerful technique for optimization problems where you can "guess and check" efficiently! 🚀