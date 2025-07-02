# Sliding Window Templates - TypeScript

## Template 1: Fixed Size Window

**When to use:** Problems asking for results in windows of exact size K

```typescript
/**
 * Fixed Size Sliding Window Template
 * Time: O(n), Space: O(1) to O(k)
 */
function fixedSizeWindow<T>(nums: T[], k: number): any {
  if (nums.length < k) return null;

  let left = 0;
  let windowState = initializeWindowState(); // depends on problem

  for (let right = 0; right < nums.length; right++) {
    // 1. EXPAND: Add current element to window
    addToWindow(windowState, nums[right]);

    // 2. CHECK: If window size < k, continue expanding
    if (right - left + 1 < k) {
      continue;
    }

    // 3. PROCESS: Window has exactly k elements
    if (right - left + 1 === k) {
      // Process current window and update result
      processWindow(windowState);

      // 4. SHRINK: Remove leftmost element
      removeFromWindow(windowState, nums[left]);
      left++;
    }
  }

  return result;
}
```

## Template 2: Dynamic Window - Maximum Length

**When to use:** Finding longest subarray/substring satisfying a condition

```typescript
/**
 * Dynamic Sliding Window - Maximum Length
 * Time: O(n), Space: O(1) to O(n)
 */
function longestWindow<T>(nums: T[], isValidCondition: () => boolean): number {
  let left = 0;
  let maxLength = 0;
  let windowState = initializeWindowState();

  for (let right = 0; right < nums.length; right++) {
    // 1. EXPAND: Always add right element to window
    addToWindow(windowState, nums[right]);

    // 2. SHRINK: While condition is violated, shrink from left
    while (!isValidCondition()) {
      removeFromWindow(windowState, nums[left]);
      left++;
    }

    // 3. UPDATE: Current window is valid, update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

## Template 3: Dynamic Window - Minimum Length

**When to use:** Finding shortest subarray/substring satisfying a condition

```typescript
/**
 * Dynamic Sliding Window - Minimum Length
 * Time: O(n), Space: O(1) to O(n)
 */
function shortestWindow<T>(nums: T[], isValidCondition: () => boolean): number {
  let left = 0;
  let minLength = Infinity;
  let windowState = initializeWindowState();

  for (let right = 0; right < nums.length; right++) {
    // 1. EXPAND: Always add right element to window
    addToWindow(windowState, nums[right]);

    // 2. SHRINK: While condition is satisfied, try to minimize window
    while (isValidCondition()) {
      // Update result: current window is valid and potentially shorter
      minLength = Math.min(minLength, right - left + 1);

      // Try to shrink window from left
      removeFromWindow(windowState, nums[left]);
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}
```

## Template 4: Sliding Window with HashMap

**When to use:** Problems involving character/element frequencies

```typescript
/**
 * Sliding Window with HashMap Template
 * Time: O(n), Space: O(k) where k is size of character set
 */
function slidingWindowWithMap<T>(nums: T[]): any {
  let left = 0;
  let result = initializeResult();
  const frequency = new Map<T, number>();

  for (let right = 0; right < nums.length; right++) {
    // 1. EXPAND: Add right element to frequency map
    const rightElement = nums[right];
    frequency.set(rightElement, (frequency.get(rightElement) || 0) + 1);

    // 2. ADJUST: Shrink window based on condition
    while (shouldShrinkWindow(frequency)) {
      const leftElement = nums[left];
      const leftCount = frequency.get(leftElement) || 0;

      if (leftCount === 1) {
        frequency.delete(leftElement);
      } else {
        frequency.set(leftElement, leftCount - 1);
      }

      left++;
    }

    // 3. UPDATE: Process current valid window
    updateResult(result, frequency, right - left + 1);
  }

  return result;
}
```

## Template 5: Sliding Window with Two Pointers

**When to use:** Array problems with specific sum or difference constraints

```typescript
/**
 * Sliding Window with Two Pointers
 * Time: O(n), Space: O(1)
 */
function twoPointerWindow(nums: number[], target: number): any {
  let left = 0;
  let right = 0;
  let result = initializeResult();
  let windowSum = 0;

  while (right < nums.length) {
    // 1. EXPAND: Add right element
    windowSum += nums[right];

    // 2. SHRINK: Adjust left pointer based on condition
    while (windowSum >= target && left <= right) {
      updateResult(result, left, right);
      windowSum -= nums[left];
      left++;
    }

    right++;
  }

  return result;
}
```

## Template 6: Sliding Window for Substring Problems

**When to use:** String pattern matching with complex constraints

```typescript
/**
 * Sliding Window for Substring Problems
 * Time: O(n + m), Space: O(m) where m is pattern length
 */
function substringWindow(s: string, pattern: string): any {
  if (s.length < pattern.length) return null;

  const patternFreq = buildFrequencyMap(pattern);
  const windowFreq = new Map<string, number>();

  let left = 0;
  let validChars = 0;
  let result = initializeResult();

  for (let right = 0; right < s.length; right++) {
    // 1. EXPAND: Add right character
    const rightChar = s[right];
    windowFreq.set(rightChar, (windowFreq.get(rightChar) || 0) + 1);

    // Update valid character count
    if (patternFreq.has(rightChar) && windowFreq.get(rightChar) === patternFreq.get(rightChar)) {
      validChars++;
    }

    // 2. SHRINK: While window contains all pattern characters
    while (validChars === patternFreq.size) {
      updateResult(result, left, right);

      const leftChar = s[left];
      const leftCount = windowFreq.get(leftChar) || 0;

      if (leftCount === 1) {
        windowFreq.delete(leftChar);
      } else {
        windowFreq.set(leftChar, leftCount - 1);
      }

      // Update valid character count
      if (
        patternFreq.has(leftChar) &&
        (windowFreq.get(leftChar) || 0) < patternFreq.get(leftChar)!
      ) {
        validChars--;
      }

      left++;
    }
  }

  return result;
}
```

## Helper Functions

```typescript
// Generic helper functions to implement based on specific problem

function initializeWindowState(): any {
  // Initialize based on problem requirements
  return {};
}

function addToWindow(state: any, element: any): void {
  // Add element to window state
}

function removeFromWindow(state: any, element: any): void {
  // Remove element from window state
}

function processWindow(state: any): void {
  // Process current window
}

function initializeResult(): any {
  // Initialize result based on problem
  return null;
}

function updateResult(result: any, ...args: any[]): void {
  // Update result based on current window
}

function shouldShrinkWindow(frequency: Map<any, number>): boolean {
  // Determine if window should be shrunk
  return false;
}

function buildFrequencyMap(str: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  return freq;
}
```

## Template Selection Guide

| Problem Type                 | Template   | Key Characteristics                  |
| ---------------------------- | ---------- | ------------------------------------ |
| Fixed window size K          | Template 1 | Window size never changes            |
| Longest valid substring      | Template 2 | Expand greedily, shrink when invalid |
| Shortest valid substring     | Template 3 | Shrink while valid                   |
| Character frequency problems | Template 4 | Uses HashMap for counting            |
| Sum/difference constraints   | Template 5 | Two pointers with numeric conditions |
| Pattern matching             | Template 6 | Complex string constraints           |
