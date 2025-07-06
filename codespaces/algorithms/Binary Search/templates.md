# Binary Search Templates - TypeScript

Comprehensive binary search algorithm templates with detailed explanations and use cases.

## 📋 Table of Contents

- [Template 1: Classic Binary Search](#template-1-classic-binary-search)
- [Template 2: Left Boundary Search](#template-2-left-boundary-search)
- [Template 3: Right Boundary Search](#template-3-right-boundary-search)
- [Template 4: Generic Condition-Based Search](#template-4-generic-condition-based-search)
- [Template 5: Rotated Array Search](#template-5-rotated-array-search)
- [Template 6: Search in 2D Matrix](#template-6-search-in-2d-matrix)
- [Template 7: Binary Search on Answer](#template-7-binary-search-on-answer)

---

## Template 1: Classic Binary Search

**When to use:** Finding exact target value in sorted array

**Key characteristics:**

- Returns index of target if found, -1 otherwise
- Works only on sorted arrays
- Uses `left <= right` condition

```typescript
/**
 * Classic Binary Search - Find exact target
 * Time: O(log n), Space: O(1)
 *
 * @param nums - Sorted array of numbers
 * @param target - Value to search for
 * @returns Index of target if found, -1 otherwise
 */
function classicBinarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

---

## Template 2: Left Boundary Search

**When to use:** Finding the leftmost occurrence of target or insertion point

**Key characteristics:**

- Returns leftmost position where target can be inserted
- Works for finding first occurrence of duplicates
- Uses `left < right` condition

```typescript
/**
 * Left Boundary Binary Search
 * Time: O(log n), Space: O(1)
 *
 * Finds the leftmost position where target should be inserted
 * or the first occurrence of target in array with duplicates
 *
 * @param nums - Sorted array
 * @param target - Value to search for
 * @returns Leftmost insertion position
 */
function leftBoundarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      // nums[mid] >= target, could be the answer
      right = mid;
    }
  }

  return left;
}

/**
 * Alternative implementation for finding first occurrence
 */
function findFirstOccurrence(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching left
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

---

## Template 3: Right Boundary Search

**When to use:** Finding the rightmost occurrence of target or last valid position

**Key characteristics:**

- Returns rightmost position where target can be inserted
- Works for finding last occurrence of duplicates
- Uses `left < right` condition

```typescript
/**
 * Right Boundary Binary Search
 * Time: O(log n), Space: O(1)
 *
 * Finds the rightmost position where target should be inserted
 * or the last occurrence of target in array with duplicates
 *
 * @param nums - Sorted array
 * @param target - Value to search for
 * @returns Rightmost insertion position
 */
function rightBoundarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      // nums[mid] > target
      right = mid;
    }
  }

  return left - 1; // Adjust for rightmost valid position
}

/**
 * Alternative implementation for finding last occurrence
 */
function findLastOccurrence(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching right
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

---

## Template 4: Generic Condition-Based Search

**When to use:** Finding minimum index where a condition becomes true

**Key characteristics:**

- Most flexible template for various binary search problems
- Condition function determines search direction
- Returns leftmost position where condition is true

```typescript
/**
 * Generic Condition-Based Binary Search
 * Time: O(log n), Space: O(1)
 *
 * Finds the minimum index where condition(index) returns true
 *
 * @param left - Start of search range
 * @param right - End of search range (exclusive)
 * @param condition - Function that returns boolean based on index
 * @returns Minimum index where condition is true
 */
function binarySearchByCondition(
  left: number,
  right: number,
  condition: (mid: number) => boolean
): number {
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

/**
 * Array-based condition search
 */
function arrayConditionSearch<T>(
  nums: T[],
  condition: (value: T, index: number) => boolean
): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (condition(nums[mid], mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

---

## Template 5: Rotated Array Search

**When to use:** Searching in rotated sorted arrays

**Key characteristics:**

- Handles arrays rotated at unknown pivot
- Determines which half is sorted at each step
- Decides search direction based on sorted half

```typescript
/**
 * Search in Rotated Sorted Array
 * Time: O(log n), Space: O(1)
 *
 * @param nums - Rotated sorted array
 * @param target - Value to search for
 * @returns Index of target if found, -1 otherwise
 */
function searchRotatedArray(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        // Target is in sorted left half
        right = mid - 1;
      } else {
        // Target is in right half
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        // Target is in sorted right half
        left = mid + 1;
      } else {
        // Target is in left half
        right = mid - 1;
      }
    }
  }

  return -1;
}

/**
 * Find minimum in rotated sorted array
 */
function findMinInRotatedArray(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > nums[right]) {
      // Minimum is in right half
      left = mid + 1;
    } else {
      // Minimum is in left half (including mid)
      right = mid;
    }
  }

  return nums[left];
}
```

---

## Template 6: Search in 2D Matrix

**When to use:** Searching in sorted 2D matrices

**Key characteristics:**

- Treats 2D matrix as flattened 1D array
- Converts between 1D and 2D coordinates
- Maintains binary search properties

```typescript
/**
 * Search in 2D Matrix (sorted row-wise and column-wise)
 * Time: O(log(m*n)), Space: O(1)
 *
 * @param matrix - 2D sorted matrix
 * @param target - Value to search for
 * @returns True if target exists, false otherwise
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    // Convert 1D index to 2D coordinates
    const row = Math.floor(mid / cols);
    const col = mid % cols;
    const midValue = matrix[row][col];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

/**
 * Search in matrix where each row and column is sorted
 * Time: O(m + n), Space: O(1)
 */
function searchMatrixII(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  let row = 0;
  let col = matrix[0].length - 1;

  // Start from top-right corner
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--; // Move left
    } else {
      row++; // Move down
    }
  }

  return false;
}
```

---

## Template 7: Binary Search on Answer

**When to use:** Optimization problems where you search for optimal value

**Key characteristics:**

- Search space is the range of possible answers
- Uses condition function to check feasibility
- Finds minimum/maximum valid answer

```typescript
/**
 * Binary Search on Answer Template
 * Time: O(log(max-min) * O(check)), Space: O(1)
 *
 * @param minAnswer - Minimum possible answer
 * @param maxAnswer - Maximum possible answer
 * @param isValid - Function to check if answer is valid
 * @param findMinimum - True for minimum valid answer, false for maximum
 * @returns Optimal answer
 */
function binarySearchOnAnswer(
  minAnswer: number,
  maxAnswer: number,
  isValid: (answer: number) => boolean,
  findMinimum: boolean = true
): number {
  let left = minAnswer;
  let right = maxAnswer;
  let result = findMinimum ? maxAnswer : minAnswer;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isValid(mid)) {
      result = mid;
      if (findMinimum) {
        right = mid - 1; // Look for smaller valid answer
      } else {
        left = mid + 1; // Look for larger valid answer
      }
    } else {
      if (findMinimum) {
        left = mid + 1; // Need larger answer
      } else {
        right = mid - 1; // Need smaller answer
      }
    }
  }

  return result;
}

/**
 * Example: Find square root using binary search
 */
function mySqrt(x: number): number {
  if (x < 2) return x;

  return binarySearchOnAnswer(
    1,
    x,
    (mid) => mid * mid <= x,
    false // Find maximum valid answer
  );
}
```

---

## Helper Functions

```typescript
/**
 * Convert 1D index to 2D coordinates
 */
function indexTo2D(index: number, cols: number): [number, number] {
  return [Math.floor(index / cols), index % cols];
}

/**
 * Convert 2D coordinates to 1D index
 */
function coordinatesToIndex(row: number, col: number, cols: number): number {
  return row * cols + col;
}

/**
 * Check if binary search invariant is maintained
 */
function validateBinarySearchInvariant<T>(
  nums: T[],
  left: number,
  right: number,
  condition: (value: T) => boolean
): boolean {
  // All elements before left should not satisfy condition
  for (let i = 0; i < left; i++) {
    if (condition(nums[i])) return false;
  }

  // All elements from left onwards should satisfy condition
  for (let i = left; i < nums.length; i++) {
    if (!condition(nums[i])) return false;
  }

  return true;
}
```

---

## Template Selection Guide

| Problem Type          | Template   | Key Insight                |
| --------------------- | ---------- | -------------------------- |
| Find exact value      | Template 1 | Classic binary search      |
| Find first occurrence | Template 2 | Search left boundary       |
| Find last occurrence  | Template 3 | Search right boundary      |
| Custom condition      | Template 4 | Most flexible approach     |
| Rotated array         | Template 5 | Identify sorted half       |
| 2D matrix             | Template 6 | Flatten or corner approach |
| Optimization          | Template 7 | Search answer space        |

---

## Common Pitfalls and Best Practices

### 1. Integer Overflow Prevention

```typescript
// ❌ Dangerous: may overflow
const mid = Math.floor((left + right) / 2);

// ✅ Safe: prevents overflow
const mid = left + Math.floor((right - left) / 2);
```

### 2. Loop Termination Conditions

```typescript
// For exact search
while (left <= right) { ... }

// For boundary search
while (left < right) { ... }
```

### 3. Index Updates

```typescript
// When condition is true (searching for minimum)
right = mid;

// When condition is false
left = mid + 1;
```

### 4. Return Value Considerations

```typescript
// For existence check
return found ? index : -1;

// For insertion point
return left;

// For boundary search
return left; // or right, depending on template
```
