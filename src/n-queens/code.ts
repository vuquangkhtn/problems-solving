const isValidMove = (
  proposedRow: number,
  proposedCol: number,
  solutions: Array<number>,
) => {
  for (let i = 0; i < proposedRow; i++) {
    let oldRow = i;
    let oldCol = solutions[i];

    let distance = proposedRow - oldRow;

    if (
      proposedCol === oldCol ||
      proposedCol === oldCol - distance ||
      proposedCol === oldCol + distance
    ) {
      return false;
    }
  }
  return true;
};

export function solveNQueens(n: number) {
  // Replace this placeholder return statement with your code
  let result = 0;

  const solveNQueensRec = (row: number, solutions: Array<number>) => {
    if (row === n) {
      result++;
      return;
    }

    // check each col
    for (let i = 0; i < n; i++) {
      const isValid = isValidMove(row, i, solutions);

      if (isValid) {
        solutions[row] = i;
        solveNQueensRec(row + 1, solutions);
      }
    }
  };

  solveNQueensRec(0, new Array(n).fill(-1));

  return result;
}
