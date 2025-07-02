const dfs = (
  grid: Array<Array<string>>,
  row: number,
  col: number,
  currentWord: string
): boolean => {
  if (currentWord.length === 0) {
    return true;
  }

  const wordChar = currentWord[0];
  if (!grid[row] || !grid[row][col] || grid[row][col] !== wordChar) return false;

  let result = false;
  grid[row][col] = '*';
  const offset = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (const pos of offset) {
    const [x, y] = pos;
    result = dfs(grid, row + x, col + y, currentWord.substring(1));
    if (result) break;
  }
  grid[row][col] = wordChar;
  return result;
};

export function wordSearch(grid: Array<Array<string>>, word: string) {
  // Replace this placeholder return statement with your code

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (dfs(grid, i, j, word)) {
        return true;
      }
    }
  }

  return false;
}
