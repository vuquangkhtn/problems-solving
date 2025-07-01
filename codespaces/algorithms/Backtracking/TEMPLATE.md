## Universal Template

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

## Combinations - Each item may only be used once in the combination.

Refer: https://leetcode.com/problems/combination-sum-ii/?envType=problem-list-v2&envId=backtracking

```typescript
function backtrack(index: State, choices: Choice[]): void {
  // Base case: check if solution is complete
  if (isGoalState(state)) {
    recordSolution(state);
    return;
  }

  // Try each available choice
  for (let i = index; i < choices.length; i++) {
    // Make choice (modify state)
    makeChoice(state, choice);

    // !Important: an unlimited number of times => re-chose i
    backtrack(i + 1, getNextChoices(state, choices));

    // Undo choice (backtrack)
    undoChoice(state, choice);
  }
}
```

## Permutations - a set where the order matters. ({1, 2, 3}, {1, 3, 2}), ...

Refer: https://leetcode.com/problems/permutations/

```typescript
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function backtrack(start): void {
    if (path.length === nums.length) {
      // only get arr with same length
      result.push([...path]);
      return;
    }

    // track from 0 index
    for (let i = 0; i < nums.length; i++) {
      // avoid duplicated index
      if (!used[i]) {
        path.push(nums[i]);
        used[i] = true;
        backtrack(start);
        path.pop();
        used[i] = false;
      }
    }
  }

  backtrack(0);
  return result;
}
```

## The same item may be chosen an unlimited number of times

Refer: https://leetcode.com/problems/combination-sum/?envType=problem-list-v2&envId=backtracking

```typescript
function backtrack(index: State, choices: Choice[]): void {
  // Base case: check if solution is complete
  if (isGoalState(state)) {
    recordSolution(state);
    return;
  }

  // Try each available choice
  for (let i = index; i < choices.length; i++) {
    // Make choice (modify state)
    makeChoice(state, choice);

    // !Important: an unlimited number of times => re-chose i
    backtrack(i, getNextChoices(state, choices));

    // Undo choice (backtrack)
    undoChoice(state, choice);
  }
}
```
