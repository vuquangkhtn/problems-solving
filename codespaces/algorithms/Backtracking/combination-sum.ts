// https://leetcode.com/problems/combination-sum

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  const getSum = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);

  const backtracking = (index, arr: number[] = []) => {
    const key = JSON.stringify(arr);
    const sum = getSum(arr);
    // console.log(index, arr, sum);
    if (sum === target) {
      result.push([...arr]);
      return;
    }

    if (sum > target || sum > 40) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      arr.push(candidates[i]);
      backtracking(i, arr);
      arr.pop();
    }
  };

  backtracking(0);

  return result;
}
