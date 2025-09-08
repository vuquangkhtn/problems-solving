# Backtracking Algorithms

A comprehensive guide to mastering backtracking algorithms with TypeScript implementations, patterns, and real-world applications.

## 📚 Table of Contents

- [What is Backtracking?](#what-is-backtracking)
- [Core Concepts](#core-concepts)
- [Problem Classification](#problem-classification)
- [Templates & Patterns](#templates--patterns)
- [Common Problems](#common-problems)
- [Advanced Techniques](#advanced-techniques)
- [Resources](#resources)

## What is Backtracking?

Backtracking is an algorithmic paradigm that considers searching every possible combination in order to solve computational problems. It builds solutions incrementally and abandons candidates ("backtracks") when they cannot lead to a valid solution.

### Key Characteristics

- **Incremental Construction**: Build solution step by step
- **Constraint Checking**: Validate each step against problem constraints
- **Backtrack on Failure**: Undo choices that lead to invalid states
- **Exhaustive Search**: Explore all possible paths (with pruning)

### When to Use Backtracking

✅ **Good for:**
- Finding all possible solutions
- Constraint satisfaction problems
- Combinatorial optimization
- Decision problems with multiple valid paths

❌ **Not optimal for:**
- Problems with optimal substructure (use DP instead)
- Simple optimization problems
- Problems requiring specific algorithmic approaches (greedy, divide & conquer)

## Core Concepts

### 1. State Space Tree
```
Every backtracking algorithm explores a state space tree where:
- Root: Initial state
- Nodes: Partial solutions
- Leaves: Complete solutions or dead ends
- Edges: Choices/decisions
```

### 2. Three Essential Components

#### a) Choice
What options are available at each step?
```typescript
for (const choice of availableChoices) {
    // Explore this choice
}
```

#### b) Constraint
Is this choice valid?
```typescript
if (isValid(choice, currentState)) {
    // Proceed with choice
}
```

#### c) Goal
Have we reached a complete solution?
```typescript
if (isComplete(currentState)) {
    // Found solution
    result.push(currentState);
    return;
}
```

### 3. Universal Template

```typescript
function backtrack(state: State, choices: Choice[]): void {
    // Base case: check if solution is complete
    if (isGoalState(state)) {
        recordSolution(state);
        return;
    }
    
    // Try each available choice
    for (const choice of getValidChoices(state, choices)) {
        // Make choice (modify state)
        makeChoice(state, choice);
        
        // Recursively solve subproblem
        backtrack(state, getNextChoices(state, choices));
        
        // Undo choice (backtrack)
        undoChoice(state, choice);
    }
}
```

## Problem Classification

### 1. Subset/Combination Problems
Generate all possible combinations of elements.

**Examples:** Subsets, Combination Sum, Power Set
```typescript
// Template: Include/Exclude pattern
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    function backtrack(index: number): void {
        if (index === nums.length) {
            result.push([...path]);
            return;
        }
        
        // Exclude current element
        backtrack(index + 1);
        
        // Include current element
        path.push(nums[index]);
        backtrack(index + 1);
        path.pop();
    }
    
    backtrack(0);
    return result;
}
```

### 2. Permutation Problems
Generate all possible arrangements of elements.

**Examples:** Permutations, N-Queens, Anagram Generation
```typescript
// Template: Choose from remaining elements
function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    
    function backtrack(): void {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                path.push(nums[i]);
                used[i] = true;
                backtrack();
                path.pop();
                used[i] = false;
            }
        }
    }
    
    backtrack();
    return result;
}
```

### 3. Constraint Satisfaction Problems
Find solutions that satisfy given constraints.

**Examples:** Sudoku, N-Queens, Graph Coloring
```typescript
// Template: Place elements following rules
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: number[] = new Array(n).fill(-1); // board[i] = column of queen in row i
    
    function isValid(row: number, col: number): boolean {
        for (let i = 0; i < row; i++) {
            if (board[i] === col || 
                Math.abs(board[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }
    
    function backtrack(row: number): void {
        if (row === n) {
            // Convert to string representation
            const solution = Array(n).fill(0).map((_, r) => 
                '.'.repeat(board[r]) + 'Q' + '.'.repeat(n - board[r] - 1)
            );
            result.push(solution);
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row] = col;
                backtrack(row + 1);
                board[row] = -1;
            }
        }
    }
    
    backtrack(0);
    return result;
}
```

### 4. Partition Problems
Divide input into valid segments.

**Examples:** Palindrome Partitioning, Word Break, IP Address Restoration
```typescript
// Template: Try all valid partitions
function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];
    
    function isPalindrome(str: string): boolean {
        let left = 0, right = str.length - 1;
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    function backtrack(start: number): void {
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            const substring = s.slice(start, end + 1);
            if (isPalindrome(substring)) {
                path.push(substring);
                backtrack(end + 1);
                path.pop();
            }
        }
    }
    
    backtrack(0);
    return result;
}
```

## Templates & Patterns

### 1. Basic Template
```typescript
function backtrack(path: any[], choices: any[]): void {
    if (baseCase) {
        result.push([...path]);
        return;
    }
    
    for (const choice of choices) {
        if (isValid(choice)) {
            path.push(choice);
            backtrack(path, newChoices);
            path.pop();
        }
    }
}
```

### 2. With Start Index (Combinations)
```typescript
function backtrack(start: number, path: any[]): void {
    if (baseCase) {
        result.push([...path]);
        return;
    }
    
    for (let i = start; i < choices.length; i++) {
        path.push(choices[i]);
        backtrack(i + 1, path); // i+1 to avoid duplicates
        path.pop();
    }
}
```

### 3. With Used Array (Permutations)
```typescript
function backtrack(path: any[], used: boolean[]): void {
    if (path.length === target) {
        result.push([...path]);
        return;
    }
    
    for (let i = 0; i < choices.length; i++) {
        if (!used[i]) {
            path.push(choices[i]);
            used[i] = true;
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
}
```

## Common Problems

### Easy Level
- **Subsets** - Generate all possible subsets
- **Letter Combinations** - Phone number to letter combinations
- **Generate Parentheses** - All combinations of well-formed parentheses

### Medium Level
- **Combination Sum** - Find all combinations that sum to target
- **Permutations** - Generate all permutations of array
- **Word Search** - Find word in 2D board
- **Palindrome Partitioning** - Partition string into palindromes

### Hard Level
- **N-Queens** - Place N queens on N×N chessboard
- **Sudoku Solver** - Solve 9×9 Sudoku puzzle
- **Word Search II** - Find multiple words in 2D board
- **Expression Add Operators** - Insert operators to reach target

## Advanced Techniques

### 1. Pruning
Eliminate branches early to reduce search space.
```typescript
function backtrack(sum: number, target: number): void {
    if (sum > target) return; // Pruning: early termination
    if (sum === target) {
        result.push([...path]);
        return;
    }
    // ... rest of logic
}
```

### 2. Memoization
Cache results to avoid redundant computations.
```typescript
const memo = new Map<string, any>();

function backtrack(state: string): any {
    if (memo.has(state)) {
        return memo.get(state);
    }
    
    // ... compute result
    memo.set(state, result);
    return result;
}
```

### 3. Constraint Propagation
Use problem constraints to limit choices.
```typescript
function getValidChoices(state: State): Choice[] {
    return allChoices.filter(choice => 
        satisfiesConstraint1(choice, state) &&
        satisfiesConstraint2(choice, state)
    );
}
```

## Time & Space Complexity

### Typical Complexities

| Problem Type | Time Complexity | Space Complexity |
|--------------|----------------|------------------|
| Subsets | O(2^n) | O(n) |
| Permutations | O(n!) | O(n) |
| Combinations | O(C(n,k) * k) | O(k) |
| N-Queens | O(n!) | O(n) |
| Sudoku | O(9^(n*n)) | O(n*n) |

### Analysis Tips
- **State Space Size**: How many possible states exist?
- **Branching Factor**: Average number of choices per state
- **Depth**: Maximum recursion depth
- **Pruning Effect**: How much search space can be eliminated?

## Best Practices

### 1. Code Organization
```typescript
class BacktrackingSolver {
    private result: any[] = [];
    
    solve(input: any): any[] {
        this.result = [];
        this.backtrack(/* initial state */);
        return this.result;
    }
    
    private backtrack(state: State): void {
        // Implementation
    }
    
    private isValid(choice: Choice, state: State): boolean {
        // Validation logic
    }
}
```

### 2. Debug Tips
- Add logging to track recursive calls
- Visualize the search tree
- Test with small inputs first
- Verify constraint checking logic

### 3. Optimization Guidelines
- Sort input when possible for better pruning
- Use bit manipulation for state representation
- Implement iterative versions for very deep recursion
- Consider parallel processing for independent branches

## Comparison with Dynamic Programming

| Aspect | Backtracking | Dynamic Programming |
|--------|-------------|-------------------|
| **Approach** | Exhaustive search with backtracking | Optimal substructure + memoization |
| **Use Case** | Find all solutions / decision problems | Optimization problems |
| **Time Complexity** | Often exponential | Usually polynomial |
| **Space Usage** | Recursion stack | Memoization table |
| **When to Use** | Multiple valid solutions needed | Single optimal solution needed |

## Resources

### Further Reading
- [TECHNIQUE.md](./TECHNIQUE.md) - Detailed techniques and patterns
- [VIZUALIZATION.md](./VIZUALIZATION.md) - Visual understanding of algorithms

### Practice Platforms
- LeetCode Backtracking Problems
- HackerRank Algorithm Challenges
- Codeforces Combinatorial Problems

### Books & Papers
- "Introduction to Algorithms" - CLRS
- "Algorithm Design Manual" - Skiena
- "Combinatorial Algorithms" - Knuth

---

*Last updated: July 2025*
