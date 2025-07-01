# Backtracking Techniques & Patterns

Advanced techniques, optimization strategies, and detailed patterns for mastering backtracking algorithms.

## 📋 Table of Contents

- [Core Techniques](#core-techniques)
- [Optimization Strategies](#optimization-strategies)
- [Pattern Recognition](#pattern-recognition)
- [Implementation Strategies](#implementation-strategies)
- [Advanced Applications](#advanced-applications)

## Core Techniques

### 1. State Representation

#### Explicit State Tracking
```typescript
interface BacktrackState {
    path: number[];
    used: boolean[];
    currentSum: number;
    level: number;
}

function backtrack(state: BacktrackState): void {
    if (isGoal(state)) {
        recordSolution(state.path);
        return;
    }
    
    for (const choice of getValidChoices(state)) {
        const newState = makeChoice(state, choice);
        backtrack(newState);
    }
}
```

#### Implicit State (Function Parameters)
```typescript
function backtrack(
    path: number[],
    used: boolean[],
    currentSum: number,
    level: number
): void {
    if (isGoal(path, currentSum, level)) {
        recordSolution(path);
        return;
    }
    
    for (const choice of getValidChoices(used, currentSum)) {
        path.push(choice);
        used[choice] = true;
        backtrack(path, used, currentSum + choice, level + 1);
        path.pop();
        used[choice] = false;
    }
}
```

### 2. Choice Generation Strategies

#### Index-Based Choices (Combinations)
```typescript
function generateCombinations(nums: number[], k: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    function backtrack(start: number): void {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        
        // Generate choices from start index onwards
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1); // Avoid duplicates by starting from i+1
            path.pop();
        }
    }
    
    backtrack(0);
    return result;
}
```

#### Availability-Based Choices (Permutations)
```typescript
function generatePermutations(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    
    function backtrack(): void {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        // Generate choices from available elements
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

#### Constraint-Based Choices (N-Queens)
```typescript
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const cols: Set<number> = new Set();
    const diag1: Set<number> = new Set(); // row - col
    const diag2: Set<number> = new Set(); // row + col
    const board: string[] = Array(n).fill('.'.repeat(n));
    
    function backtrack(row: number): void {
        if (row === n) {
            result.push([...board]);
            return;
        }
        
        // Generate valid column choices for current row
        for (let col = 0; col < n; col++) {
            if (!cols.has(col) && 
                !diag1.has(row - col) && 
                !diag2.has(row + col)) {
                
                // Make choice
                cols.add(col);
                diag1.add(row - col);
                diag2.add(row + col);
                board[row] = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1);
                
                backtrack(row + 1);
                
                // Undo choice
                cols.delete(col);
                diag1.delete(row - col);
                diag2.delete(row + col);
                board[row] = '.'.repeat(n);
            }
        }
    }
    
    backtrack(0);
    return result;
}
```

### 3. Base Case Patterns

#### Length-Based Termination
```typescript
function backtrack(path: any[]): void {
    if (path.length === targetLength) {
        result.push([...path]);
        return;
    }
    // ... generate choices
}
```

#### Index-Based Termination
```typescript
function backtrack(index: number): void {
    if (index === nums.length) {
        result.push([...path]);
        return;
    }
    // ... generate choices
}
```

#### Condition-Based Termination
```typescript
function backtrack(currentSum: number, target: number): void {
    if (currentSum === target) {
        result.push([...path]);
        return;
    }
    if (currentSum > target) {
        return; // Invalid path, backtrack
    }
    // ... generate choices
}
```

## Optimization Strategies

### 1. Pruning Techniques

#### Bound-Based Pruning
```typescript
function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    // Sort for better pruning
    candidates.sort((a, b) => a - b);
    
    function backtrack(start: number, currentSum: number): void {
        if (currentSum === target) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            // Pruning: if current candidate exceeds remaining target,
            // all subsequent candidates will also exceed (due to sorting)
            if (currentSum + candidates[i] > target) {
                break; // Prune entire subtree
            }
            
            path.push(candidates[i]);
            backtrack(i, currentSum + candidates[i]);
            path.pop();
        }
    }
    
    backtrack(0, 0);
    return result;
}
```

#### Feasibility Pruning
```typescript
function subsetSum(nums: number[], target: number): boolean {
    nums.sort((a, b) => a - b);
    
    function backtrack(index: number, currentSum: number): boolean {
        if (currentSum === target) return true;
        if (index >= nums.length || currentSum > target) return false;
        
        // Pruning: check if remaining elements can reach target
        const remainingSum = nums.slice(index).reduce((sum, num) => sum + num, 0);
        if (currentSum + remainingSum < target) {
            return false; // Cannot reach target even with all remaining elements
        }
        
        // Try including current element
        if (backtrack(index + 1, currentSum + nums[index])) {
            return true;
        }
        
        // Try excluding current element
        return backtrack(index + 1, currentSum);
    }
    
    return backtrack(0, 0);
}
```

### 2. Duplicate Handling

#### Skip Duplicates in Combinations
```typescript
function combinationSum2(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    candidates.sort((a, b) => a - b);
    
    function backtrack(start: number, currentSum: number): void {
        if (currentSum === target) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates: only use first occurrence at each level
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }
            
            if (currentSum + candidates[i] > target) break;
            
            path.push(candidates[i]);
            backtrack(i + 1, currentSum + candidates[i]);
            path.pop();
        }
    }
    
    backtrack(0, 0);
    return result;
}
```

#### Skip Duplicates in Permutations
```typescript
function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    
    nums.sort((a, b) => a - b);
    
    function backtrack(): void {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            // Skip duplicates: only use if previous duplicate is used
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }
            
            path.push(nums[i]);
            used[i] = true;
            backtrack();
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack();
    return result;
}
```

### 3. Memoization for Overlapping Subproblems

#### State-Based Memoization
```typescript
function wordBreak2(s: string, wordDict: string[]): string[] {
    const wordSet = new Set(wordDict);
    const memo = new Map<number, string[]>();
    
    function backtrack(start: number): string[] {
        if (start === s.length) {
            return [''];
        }
        
        if (memo.has(start)) {
            return memo.get(start)!;
        }
        
        const result: string[] = [];
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const suffixes = backtrack(end);
                for (const suffix of suffixes) {
                    result.push(word + (suffix ? ' ' + suffix : ''));
                }
            }
        }
        
        memo.set(start, result);
        return result;
    }
    
    return backtrack(0);
}
```

### 4. Constraint Propagation

#### Forward Checking
```typescript
interface SudokuState {
    board: number[][];
    rowSets: Set<number>[];
    colSets: Set<number>[];
    boxSets: Set<number>[];
}

function solveSudoku(board: string[][]): void {
    const state: SudokuState = initializeState(board);
    
    function backtrack(): boolean {
        const emptyCell = findEmptyCell(state.board);
        if (!emptyCell) return true; // Solved
        
        const [row, col] = emptyCell;
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        
        // Generate valid choices using constraint propagation
        for (let num = 1; num <= 9; num++) {
            if (!state.rowSets[row].has(num) &&
                !state.colSets[col].has(num) &&
                !state.boxSets[boxIndex].has(num)) {
                
                // Make choice and update constraints
                state.board[row][col] = num;
                state.rowSets[row].add(num);
                state.colSets[col].add(num);
                state.boxSets[boxIndex].add(num);
                
                if (backtrack()) return true;
                
                // Undo choice and constraints
                state.board[row][col] = 0;
                state.rowSets[row].delete(num);
                state.colSets[col].delete(num);
                state.boxSets[boxIndex].delete(num);
            }
        }
        
        return false;
    }
    
    backtrack();
}
```

## Pattern Recognition

### 1. Decision Tree Patterns

#### Binary Choice Pattern (Include/Exclude)
```typescript
// Problem: Generate all subsets
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    function backtrack(index: number): void {
        if (index === nums.length) {
            result.push([...path]);
            return;
        }
        
        // Choice 1: Exclude current element
        backtrack(index + 1);
        
        // Choice 2: Include current element
        path.push(nums[index]);
        backtrack(index + 1);
        path.pop();
    }
    
    backtrack(0);
    return result;
}
```

#### Multi-Choice Pattern (Multiple Options)
```typescript
// Problem: Letter combinations of phone number
function letterCombinations(digits: string): string[] {
    if (!digits) return [];
    
    const phoneMap: { [key: string]: string } = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result: string[] = [];
    const path: string[] = [];
    
    function backtrack(index: number): void {
        if (index === digits.length) {
            result.push(path.join(''));
            return;
        }
        
        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            path.push(letter);
            backtrack(index + 1);
            path.pop();
        }
    }
    
    backtrack(0);
    return result;
}
```

### 2. Grid Traversal Patterns

#### Path Finding with Backtracking
```typescript
function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    function backtrack(row: number, col: number, index: number): boolean {
        if (index === word.length) return true;
        
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index] || board[row][col] === '#') {
            return false;
        }
        
        // Mark as visited
        const temp = board[row][col];
        board[row][col] = '#';
        
        // Try all four directions
        for (const [dr, dc] of directions) {
            if (backtrack(row + dr, col + dc, index + 1)) {
                board[row][col] = temp; // Restore before returning
                return true;
            }
        }
        
        // Restore and backtrack
        board[row][col] = temp;
        return false;
    }
    
    // Try starting from each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}
```

### 3. Recursive Structure Patterns

#### Tree/Graph Traversal
```typescript
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    
    function backtrack(node: TreeNode | null, currentSum: number): void {
        if (!node) return;
        
        // Make choice: include current node
        path.push(node.val);
        currentSum += node.val;
        
        // Check if leaf node and target reached
        if (!node.left && !node.right && currentSum === targetSum) {
            result.push([...path]);
        }
        
        // Recursively explore children
        backtrack(node.left, currentSum);
        backtrack(node.right, currentSum);
        
        // Undo choice
        path.pop();
    }
    
    backtrack(root, 0);
    return result;
}
```

## Implementation Strategies

### 1. Iterative Backtracking

#### Stack-Based Implementation
```typescript
function iterativeBacktrack(nums: number[]): number[][] {
    const result: number[][] = [];
    const stack: { path: number[], index: number }[] = [{ path: [], index: 0 }];
    
    while (stack.length > 0) {
        const { path, index } = stack.pop()!;
        
        if (index === nums.length) {
            result.push([...path]);
            continue;
        }
        
        // Add choices to stack (in reverse order for correct traversal)
        stack.push({ path: [...path, nums[index]], index: index + 1 }); // Include
        stack.push({ path: [...path], index: index + 1 }); // Exclude
    }
    
    return result;
}
```

### 2. Class-Based Organization

#### Backtracking Solver Template
```typescript
abstract class BacktrackingSolver<T, R> {
    protected result: R[] = [];
    
    public solve(input: T): R[] {
        this.result = [];
        this.backtrack(this.getInitialState(input));
        return this.result;
    }
    
    protected abstract getInitialState(input: T): any;
    protected abstract isGoalState(state: any): boolean;
    protected abstract getChoices(state: any): any[];
    protected abstract isValidChoice(choice: any, state: any): boolean;
    protected abstract makeChoice(state: any, choice: any): any;
    protected abstract undoChoice(state: any, choice: any): void;
    protected abstract recordSolution(state: any): void;
    
    private backtrack(state: any): void {
        if (this.isGoalState(state)) {
            this.recordSolution(state);
            return;
        }
        
        for (const choice of this.getChoices(state)) {
            if (this.isValidChoice(choice, state)) {
                const newState = this.makeChoice(state, choice);
                this.backtrack(newState);
                this.undoChoice(state, choice);
            }
        }
    }
}

// Example implementation
class PermutationSolver extends BacktrackingSolver<number[], number[]> {
    protected getInitialState(nums: number[]) {
        return { nums, path: [], used: new Array(nums.length).fill(false) };
    }
    
    protected isGoalState(state: any): boolean {
        return state.path.length === state.nums.length;
    }
    
    protected getChoices(state: any): number[] {
        return state.nums.map((_: any, i: number) => i);
    }
    
    protected isValidChoice(choice: number, state: any): boolean {
        return !state.used[choice];
    }
    
    protected makeChoice(state: any, choice: number): any {
        state.path.push(state.nums[choice]);
        state.used[choice] = true;
        return state;
    }
    
    protected undoChoice(state: any, choice: number): void {
        state.path.pop();
        state.used[choice] = false;
    }
    
    protected recordSolution(state: any): void {
        this.result.push([...state.path]);
    }
}
```

## Advanced Applications

### 1. Constraint Satisfaction with AC-3

#### Arc Consistency for Sudoku
```typescript
class SudokuSolver {
    private board: number[][];
    private domains: Set<number>[][];
    
    constructor(board: string[][]) {
        this.board = board.map(row => row.map(cell => cell === '.' ? 0 : parseInt(cell)));
        this.initializeDomains();
        this.applyAC3();
    }
    
    private initializeDomains(): void {
        this.domains = Array(9).fill(null).map(() => 
            Array(9).fill(null).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        );
        
        // Remove impossible values based on initial state
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] !== 0) {
                    this.domains[i][j] = new Set([this.board[i][j]]);
                    this.propagateConstraints(i, j, this.board[i][j]);
                }
            }
        }
    }
    
    private applyAC3(): boolean {
        const queue: [number, number, number, number][] = [];
        
        // Initialize queue with all arcs
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                for (const [ni, nj] of this.getNeighbors(i, j)) {
                    queue.push([i, j, ni, nj]);
                }
            }
        }
        
        while (queue.length > 0) {
            const [i, j, ni, nj] = queue.shift()!;
            
            if (this.revise(i, j, ni, nj)) {
                if (this.domains[i][j].size === 0) {
                    return false; // Inconsistent
                }
                
                // Add affected arcs back to queue
                for (const [xi, xj] of this.getNeighbors(i, j)) {
                    if (xi !== ni || xj !== nj) {
                        queue.push([xi, xj, i, j]);
                    }
                }
            }
        }
        
        return true;
    }
    
    private revise(i: number, j: number, ni: number, nj: number): boolean {
        let revised = false;
        
        for (const value of Array.from(this.domains[i][j])) {
            if (this.domains[ni][nj].size === 1 && this.domains[ni][nj].has(value)) {
                this.domains[i][j].delete(value);
                revised = true;
            }
        }
        
        return revised;
    }
    
    private getNeighbors(row: number, col: number): [number, number][] {
        const neighbors: [number, number][] = [];
        
        // Row neighbors
        for (let j = 0; j < 9; j++) {
            if (j !== col) neighbors.push([row, j]);
        }
        
        // Column neighbors
        for (let i = 0; i < 9; i++) {
            if (i !== row) neighbors.push([i, col]);
        }
        
        // Box neighbors
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (i !== row || j !== col) {
                    neighbors.push([i, j]);
                }
            }
        }
        
        return neighbors;
    }
}
```

### 2. Parallel Backtracking

#### Multi-threaded Search
```typescript
class ParallelBacktrackingSolver {
    private workers: Worker[] = [];
    private readonly numWorkers: number;
    
    constructor(numWorkers: number = navigator.hardwareConcurrency || 4) {
        this.numWorkers = numWorkers;
    }
    
    async solveParallel<T>(
        problem: T,
        splitStrategy: (problem: T, numParts: number) => T[]
    ): Promise<any[]> {
        const subProblems = splitStrategy(problem, this.numWorkers);
        
        const promises = subProblems.map((subProblem, index) => 
            this.solveInWorker(subProblem, index)
        );
        
        const results = await Promise.all(promises);
        return results.flat();
    }
    
    private async solveInWorker(subProblem: any, workerIndex: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const worker = new Worker('./backtracking-worker.js');
            
            worker.postMessage({ problem: subProblem, workerIndex });
            
            worker.onmessage = (event) => {
                resolve(event.data.result);
                worker.terminate();
            };
            
            worker.onerror = (error) => {
                reject(error);
                worker.terminate();
            };
        });
    }
}
```

---

This comprehensive technique guide covers advanced backtracking strategies, optimization methods, and implementation patterns that can be applied to solve complex computational problems efficiently.
