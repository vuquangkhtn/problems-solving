# Longest Common Subsequence - Dynamic Programming Deep Dive

## Problem Understanding

**Subsequence**: A sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Example**:

- String: "abcde"
- Subsequences: "a", "ab", "ace", "abde", "abcde", etc.
- NOT subsequences: "aec" (wrong order), "abcdef" (contains extra character)

## Dynamic Programming Approach

### Core Idea

Build a 2D table where `dp[i][j]` represents the length of LCS for the first `i` characters of `text1` and first `j` characters of `text2`.

### Recurrence Relation

```
dp[i][j] = {
    0                           if i = 0 or j = 0
    dp[i-1][j-1] + 1           if text1[i-1] == text2[j-1]
    max(dp[i-1][j], dp[i][j-1]) if text1[i-1] != text2[j-1]
}
```

## Step-by-Step Visualization

### Example: text1 = "abcde", text2 = "ace"

#### Step 1: Initialize the DP Table

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   ?   ?   ?
  b    0   ?   ?   ?
  c    0   ?   ?   ?
  d    0   ?   ?   ?
  e    0   ?   ?   ?
```

**Base Cases:**

- First row: LCS of empty string with any string = 0
- First column: LCS of any string with empty string = 0

#### Step 2: Fill Row 1 (character 'a' from text1)

**Processing dp[1][1]**: text1[0] = 'a', text2[0] = 'a'

- Characters match! ✅
- dp[1][1] = dp[0][0] + 1 = 0 + 1 = 1

**Processing dp[1][2]**: text1[0] = 'a', text2[1] = 'c'

- Characters don't match ❌
- dp[1][2] = max(dp[0][2], dp[1][1]) = max(0, 1) = 1

**Processing dp[1][3]**: text1[0] = 'a', text2[2] = 'e'

- Characters don't match ❌
- dp[1][3] = max(dp[0][3], dp[1][2]) = max(0, 1) = 1

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   1   1   1
  b    0   ?   ?   ?
  c    0   ?   ?   ?
  d    0   ?   ?   ?
  e    0   ?   ?   ?
```

#### Step 3: Fill Row 2 (character 'b' from text1)

**Processing dp[2][1]**: text1[1] = 'b', text2[0] = 'a'

- Characters don't match ❌
- dp[2][1] = max(dp[1][1], dp[2][0]) = max(1, 0) = 1

**Processing dp[2][2]**: text1[1] = 'b', text2[1] = 'c'

- Characters don't match ❌
- dp[2][2] = max(dp[1][2], dp[2][1]) = max(1, 1) = 1

**Processing dp[2][3]**: text1[1] = 'b', text2[2] = 'e'

- Characters don't match ❌
- dp[2][3] = max(dp[1][3], dp[2][2]) = max(1, 1) = 1

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   1   1   1
  b    0   1   1   1
  c    0   ?   ?   ?
  d    0   ?   ?   ?
  e    0   ?   ?   ?
```

#### Step 4: Fill Row 3 (character 'c' from text1)

**Processing dp[3][1]**: text1[2] = 'c', text2[0] = 'a'

- Characters don't match ❌
- dp[3][1] = max(dp[2][1], dp[3][0]) = max(1, 0) = 1

**Processing dp[3][2]**: text1[2] = 'c', text2[1] = 'c'

- Characters match! ✅
- dp[3][2] = dp[2][1] + 1 = 1 + 1 = 2

**Processing dp[3][3]**: text1[2] = 'c', text2[2] = 'e'

- Characters don't match ❌
- dp[3][3] = max(dp[2][3], dp[3][2]) = max(1, 2) = 2

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   1   1   1
  b    0   1   1   1
  c    0   1   2   2
  d    0   ?   ?   ?
  e    0   ?   ?   ?
```

#### Step 5: Fill Row 4 (character 'd' from text1)

**Processing dp[4][1]**: text1[3] = 'd', text2[0] = 'a'

- Characters don't match ❌
- dp[4][1] = max(dp[3][1], dp[4][0]) = max(1, 0) = 1

**Processing dp[4][2]**: text1[3] = 'd', text2[1] = 'c'

- Characters don't match ❌
- dp[4][2] = max(dp[3][2], dp[4][1]) = max(2, 1) = 2

**Processing dp[4][3]**: text1[3] = 'd', text2[2] = 'e'

- Characters don't match ❌
- dp[4][3] = max(dp[3][3], dp[4][2]) = max(2, 2) = 2

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   1   1   1
  b    0   1   1   1
  c    0   1   2   2
  d    0   1   2   2
  e    0   ?   ?   ?
```

#### Step 6: Fill Row 5 (character 'e' from text1)

**Processing dp[5][1]**: text1[4] = 'e', text2[0] = 'a'

- Characters don't match ❌
- dp[5][1] = max(dp[4][1], dp[5][0]) = max(1, 0) = 1

**Processing dp[5][2]**: text1[4] = 'e', text2[1] = 'c'

- Characters don't match ❌
- dp[5][2] = max(dp[4][2], dp[5][1]) = max(2, 1) = 2

**Processing dp[5][3]**: text1[4] = 'e', text2[2] = 'e'

- Characters match! ✅
- dp[5][3] = dp[4][2] + 1 = 2 + 1 = 3

```
      ""  a   c   e
  ""   0   0   0   0
  a    0   1   1   1
  b    0   1   1   1
  c    0   1   2   2
  d    0   1   2   2
  e    0   1   2   3
```

**Final Answer**: dp[5][3] = 3

## Tracing Back the Actual LCS

To find the actual subsequence, we trace back from dp[m][n]:

```
Starting at dp[5][3] = 3
```

### Backtracking Algorithm:

```
i = 5, j = 3: text1[4] = 'e', text2[2] = 'e'
- Characters match! Add 'e' to LCS
- Move to dp[4][2]

i = 4, j = 2: text1[3] = 'd', text2[1] = 'c'
- Characters don't match
- dp[3][2] = 2 > dp[4][1] = 1, so move to dp[3][2]

i = 3, j = 2: text1[2] = 'c', text2[1] = 'c'
- Characters match! Add 'c' to LCS
- Move to dp[2][1]

i = 2, j = 1: text1[1] = 'b', text2[0] = 'a'
- Characters don't match
- dp[1][1] = 1 > dp[2][0] = 0, so move to dp[1][1]

i = 1, j = 1: text1[0] = 'a', text2[0] = 'a'
- Characters match! Add 'a' to LCS
- Move to dp[0][0]

i = 0 or j = 0: Stop
```

**LCS built backwards**: ['e', 'c', 'a']
**LCS forward**: "ace"

## Visual Pattern Recognition

### When Characters Match

```
      j-1  j
  i-1  X
  i        dp[i][j] = dp[i-1][j-1] + 1
```

We take the diagonal value and add 1.

### When Characters Don't Match

```
      j-1  j
  i-1  X   Y
  i    Z   dp[i][j] = max(Y, Z)
```

We take the maximum of the top (Y) or left (Z) value.

## Another Example: text1 = "abcd", text2 = "acbd"

### Complete DP Table:

```
      ""  a   c   b   d
  ""   0   0   0   0   0
  a    0   1   1   1   1
  b    0   1   1   2   2
  c    0   1   2   2   2
  d    0   1   2   2   3
```

### Step-by-step Analysis:

**Row 1 (a):**

- dp[1][1]: 'a' == 'a' ✅ → dp[1][1] = 1
- dp[1][2]: 'a' != 'c' ❌ → dp[1][2] = max(0, 1) = 1
- dp[1][3]: 'a' != 'b' ❌ → dp[1][3] = max(0, 1) = 1
- dp[1][4]: 'a' != 'd' ❌ → dp[1][4] = max(0, 1) = 1

**Row 2 (b):**

- dp[2][1]: 'b' != 'a' ❌ → dp[2][1] = max(1, 0) = 1
- dp[2][2]: 'b' != 'c' ❌ → dp[2][2] = max(1, 1) = 1
- dp[2][3]: 'b' == 'b' ✅ → dp[2][3] = dp[1][2] + 1 = 2
- dp[2][4]: 'b' != 'd' ❌ → dp[2][4] = max(1, 2) = 2

**Row 3 (c):**

- dp[3][1]: 'c' != 'a' ❌ → dp[3][1] = max(1, 0) = 1
- dp[3][2]: 'c' == 'c' ✅ → dp[3][2] = dp[2][1] + 1 = 2
- dp[3][3]: 'c' != 'b' ❌ → dp[3][3] = max(2, 2) = 2
- dp[3][4]: 'c' != 'd' ❌ → dp[3][4] = max(2, 2) = 2

**Row 4 (d):**

- dp[4][1]: 'd' != 'a' ❌ → dp[4][1] = max(1, 0) = 1
- dp[4][2]: 'd' != 'c' ❌ → dp[4][2] = max(2, 1) = 2
- dp[4][3]: 'd' != 'b' ❌ → dp[4][3] = max(2, 2) = 2
- dp[4][4]: 'd' == 'd' ✅ → dp[4][4] = dp[3][3] + 1 = 3

**LCS Length**: 3
**Actual LCS**: "abd" (by backtracking)

## Time and Space Complexity Analysis

### Time Complexity: O(m × n)

- We fill an (m+1) × (n+1) table
- Each cell takes O(1) time to compute
- Total: O(m × n)

### Space Complexity: O(m × n)

- We store the entire DP table
- Can be optimized to O(min(m, n)) if we only need the length

## Common Mistakes and Edge Cases

### Mistake 1: Off-by-one errors

```typescript
// WRONG: Using i and j directly
if (text1[i] === text2[j]) {
  dp[i][j] = dp[i - 1][j - 1] + 1;
}

// CORRECT: Using i-1 and j-1
if (text1[i - 1] === text2[j - 1]) {
  dp[i][j] = dp[i - 1][j - 1] + 1;
}
```

### Mistake 2: Incorrect base case initialization

```typescript
// WRONG: Not initializing first row and column
const dp = Array(m)
  .fill(0)
  .map(() => Array(n).fill(0));

// CORRECT: Include extra row and column for empty string
const dp = Array(m + 1)
  .fill(0)
  .map(() => Array(n + 1).fill(0));
```

### Edge Cases:

1. **Empty strings**: LCS("", "abc") = 0
2. **Identical strings**: LCS("abc", "abc") = 3
3. **No common characters**: LCS("abc", "def") = 0
4. **Single characters**: LCS("a", "a") = 1

## Space Optimization

Since we only need the previous row to compute the current row, we can optimize space:

```typescript
function longestCommonSubsequenceOptimized(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}
```

This reduces space complexity from O(m × n) to O(n).

## Real-World Applications

1. **DNA Sequence Analysis**: Finding common genetic patterns
2. **File Diff Tools**: Comparing different versions of files
3. **Plagiarism Detection**: Finding similar content patterns
4. **Version Control**: Merging changes in code repositories
5. **Speech Recognition**: Matching spoken words to text patterns
