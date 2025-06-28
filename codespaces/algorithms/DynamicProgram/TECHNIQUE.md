# DP Steps 2 & 3: State Definition & Recurrence Relations 🎯

The two hardest steps in DP! Here are proven techniques to master them.

## 🏗️ Step 2: Defining the State

### The Golden Rules:

#### Rule 1: Include ALL Information Needed for Decision Making

❌ **Bad**: `dp[i]` = "something about position i"  
✅ **Good**: `dp[i]` = "maximum profit ending at day i"

#### Rule 2: Be Specific About What Each Index Represents

❌ **Bad**: `dp[i][j]` = "something with two strings"  
✅ **Good**: `dp[i][j]` = "LCS of s1[0...i-1] and s2[0...j-1]"

#### Rule 3: State Should Make Subproblems Independent

Each state should contain enough info so you don't need to look "sideways"

### 🎨 State Definition Patterns:

#### Pattern 1: Position-Based (1D)

```typescript
// dp[i] = best result considering elements 0 to i
// Examples: House Robber, Climbing Stairs, Max Subarray

// House Robber: dp[i] = max money robbing houses 0 to i
dp[i] = Math.max(
  dp[i - 1], // don't rob house i
  dp[i - 2] + nums[i] // rob house i
);
```

#### Pattern 2: Substring/Subarray (2D)

```typescript
// dp[i][j] = result for substring/subarray from i to j
// Examples: Palindromic Substrings, Matrix Chain Multiplication

// Palindromic Substrings: dp[i][j] = is s[i...j] palindrome?
dp[i][j] = s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1]);
```

#### Pattern 3: Two Sequences (2D)

```typescript
// dp[i][j] = result comparing sequences up to position i and j
// Examples: LCS, Edit Distance, Interleaving String

// LCS: dp[i][j] = length of LCS of s1[0...i-1] and s2[0...j-1]
if (s1[i - 1] === s2[j - 1]) {
  dp[i][j] = dp[i - 1][j - 1] + 1;
} else {
  dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
}
```

#### Pattern 4: State Machine

```typescript
// dp[i][state] = best result at position i in given state
// Examples: Stock problems, Paint House

// Stock with cooldown: dp[i][state] where state = held|sold|rest
dp[i][held] = Math.max(dp[i - 1][held], dp[i - 1][rest] - prices[i]);
dp[i][sold] = dp[i - 1][held] + prices[i];
dp[i][rest] = Math.max(dp[i - 1][sold], dp[i - 1][rest]);
```

### 🧠 State Definition Techniques:

#### Technique 1: "What Do I Need to Know?"

Ask yourself: "At each step, what information do I need to make the optimal decision?"

**Example - Interleaving String:**

- Position in s1? ✅ Need this
- Position in s2? ✅ Need this
- Position in s3? ✅ Derivable from above (i + j)
- Previous character? ❌ Not needed

**State**: `dp[i][j]` = can form s3[0...i+j-1] using s1[0...i-1] and s2[0...j-1]

#### Technique 2: "What Changes Between Subproblems?"

Identify what varies between similar subproblems.

**Example - Edit Distance:**

- String lengths change → need i, j indices
- Operations available → no extra state needed
  **State**: `dp[i][j]` = min operations to transform s1[0...i-1] to s2[0...j-1]

#### Technique 3: "Work Backwards from Answer"

Start with what you want to return, then figure out what you need.

**Example - House Robber:**

- Want: maximum money from all houses
- Need: maximum money from houses 0 to i
  **State**: `dp[i]` = max money from houses 0 to i

## ⚡ Step 3: Finding Recurrence Relations

### The Golden Rules:

#### Rule 1: Enumerate ALL Possible Choices

At each state, what are ALL the decisions you can make?

#### Rule 2: Express Current State in Terms of Previous States

Current state = function of (previous states + current choice)

#### Rule 3: Take the Optimal Choice

Use min/max for optimization, sum for counting

### 🎯 Recurrence Relation Techniques:

#### Technique 1: "Choice Enumeration"

List every possible action at current state.

**Example - Coin Change:**

```typescript
// dp[i] = min coins to make amount i
// Choices: use coin of value coins[j] for each j

dp[i] = Math.min(
  dp[i - coins[0]] + 1, // use coin 0
  dp[i - coins[1]] + 1, // use coin 1
  ...(dp[i - coins[k]] + 1) // use coin k
);

// Generalized:
for (let coin of coins) {
  if (i >= coin) {
    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}
```

#### Technique 2: "Match or Skip" (String Problems)

For two strings, you typically have: match characters or skip from one/both.

**Example - Longest Common Subsequence:**

```typescript
// dp[i][j] = LCS length of s1[0...i-1] and s2[0...j-1]

if (s1[i - 1] === s2[j - 1]) {
  // Characters match - include in LCS
  dp[i][j] = dp[i - 1][j - 1] + 1;
} else {
  // Characters don't match - skip from either string
  dp[i][j] = Math.max(
    dp[i - 1][j], // skip from s1
    dp[i][j - 1] // skip from s2
  );
}
```

#### Technique 3: "Take or Leave" (Subset Problems)

For array elements, often you can include current element or skip it.

**Example - House Robber:**

```typescript
// dp[i] = max money from houses 0 to i

dp[i] = Math.max(
  dp[i - 1], // don't rob house i (leave)
  dp[i - 2] + nums[i] // rob house i (take)
);
```

#### Technique 4: "Transition Between States" (State Machine)

Define how to move between different states.

**Example - Stock with Transaction Limit:**

```typescript
// dp[i][k][0] = max profit on day i, with k transactions, holding 0 stocks
// dp[i][k][1] = max profit on day i, with k transactions, holding 1 stock

dp[i][k][0] = Math.max(
  dp[i - 1][k][0], // rest (no change)
  dp[i - 1][k][1] + prices[i] // sell (1→0, profit)
);

dp[i][k][1] = Math.max(
  dp[i - 1][k][1], // rest (no change)
  dp[i - 1][k - 1][0] - prices[i] // buy (0→1, cost, use transaction)
);
```

### 🔍 Step-by-Step Analysis Process:

#### For the Interleaving String Problem:

**Step 2 - State Definition Process:**

1. **What do I need to know?**

   - How much of s1 I've used: index i
   - How much of s2 I've used: index j
   - How much of s3 I've formed: i + j (derivable)

2. **What does dp[i][j] represent?**
   - `dp[i][j]` = "Can I form s3[0...i+j-1] using exactly s1[0...i-1] and s2[0...j-1]?"
   - Very specific! Not just "something about position i,j"

**Step 3 - Recurrence Relation Process:**

1. **What choices do I have at dp[i][j]?**

   - Take next character from s1 (if available and matches s3[i+j-1])
   - Take next character from s2 (if available and matches s3[i+j-1])

2. **Express in terms of previous states:**
   ```typescript
   dp[i][j] =
     (s1[i - 1] === s3[i + j - 1] && dp[i - 1][j]) || // came from s1
     (s2[j - 1] === s3[i + j - 1] && dp[i][j - 1]); // came from s2
   ```

### 🎪 Common Recurrence Patterns:

#### Pattern 1: Linear Combination

```typescript
dp[i] = a * dp[i-1] + b * dp[i-2] + c * dp[i-3] + ...
// Examples: Fibonacci, Climbing Stairs, Tribonacci
```

#### Pattern 2: Optimization Choice

```typescript
dp[i] = Math.min/max(choice1, choice2, choice3, ...)
// Examples: Coin Change, House Robber, Jump Game
```

#### Pattern 3: Boolean Logic

```typescript
dp[i] = (condition1 && dp[state1]) || (condition2 && dp[state2]);
// Examples: Word Break, Interleaving String
```

#### Pattern 4: Accumulation

```typescript
dp[i] = dp[i - 1] + (condition ? value : 0);
// Examples: Counting problems, Path counting
```

### 🚨 Common Mistakes & How to Avoid:

#### Mistake 1: State Doesn't Capture All Info

❌ Problem: Need to look at multiple previous states
✅ Solution: Include more information in state definition

#### Mistake 2: Circular Dependencies

❌ Problem: `dp[i]` depends on `dp[i]` or future states
✅ Solution: Ensure you only depend on "smaller" subproblems

#### Mistake 3: Forgetting Edge Cases in Recurrence

❌ Problem: Array bounds, empty strings, etc.
✅ Solution: Handle boundary conditions explicitly

### 💡 Pro Tips:

1. **Start Small**: Work out 2-3 examples by hand first
2. **Draw Pictures**: Visualize the state space
3. **Write Recursive Solution First**: Then add memoization
4. **Verify with Base Cases**: Make sure recurrence works for simplest cases
5. **Think "What Would I Do Manually?"**: Often mirrors the recurrence

### 📝 Practice Exercise:

Try defining state and recurrence for these problems:

1. **Unique Paths**: Robot in grid, can only move right/down
2. **Word Break**: Can string be segmented into dictionary words?
3. **Palindrome Partitioning**: Min cuts to make all substrings palindromes

Remember: **These skills come with practice!** Start with easier problems and gradually work your way up. The patterns will become second nature. 🚀
