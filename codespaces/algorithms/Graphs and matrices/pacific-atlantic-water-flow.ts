// https://leetcode.com/problems/pacific-atlantic-water-flow/description/

function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[0].length;

  const result: number[][] = [];

  const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const pacificReachable = Array.from(new Array(m), () => new Array(n).fill(false));
  const atlanticReachable = Array.from(new Array(m), () => new Array(n).fill(false));

  const isInvalid = (row, col) => heights[row] === undefined || heights[row][col] === undefined;
  const dfs = (reachable, row, col, prevHeight = 0) => {
    if (isInvalid(row, col) || heights[row][col] < prevHeight || reachable[row][col]) {
      return;
    }

    reachable[row][col] = true;

    for (const direction of DIRECTIONS) {
      dfs(reachable, row + direction[0], col + direction[1], heights[row][col]);
    }
  };

  // rows
  for (let i = 0; i < m; i++) {
    dfs(pacificReachable, i, 0);
    dfs(atlanticReachable, i, n - 1);
  }

  // cols
  for (let i = 0; i < n; i++) {
    dfs(pacificReachable, 0, i);
    dfs(atlanticReachable, m - 1, i);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacificReachable[i][j] && atlanticReachable[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
}
