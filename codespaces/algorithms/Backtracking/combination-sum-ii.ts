// https://leetcode.com/problems/combination-sum-ii

interface KeyPair {
  [key: string]: number;
}

function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  const getSum = (arr) => arr.reduce((acc, val) => acc + val, 0);
  const indexed = new Set();
  const backtracking = (start, arr: number[] = []) => {
    const key = JSON.stringify(
      arr.reduce<KeyPair>((acc, val) => {
        if (!acc[val]) acc[val] = 0;
        acc[val]++;
        return acc;
      }, {})
    );
    if (indexed.has(key)) return;
    indexed.add(key);

    const sum = getSum(arr);

    if (sum === target) {
      result.push([...arr]);

      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      arr.push(candidates[i]);
      backtracking(i + 1, arr);
      arr.pop();
    }
  };

  backtracking(0);

  return result;
}
