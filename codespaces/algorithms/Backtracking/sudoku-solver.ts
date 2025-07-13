// https://leetcode.com/problems/sudoku-solver/description/
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
  const checkCol = ([r, c], digit) => {
    for (let i = 0; i < 9; i++) {
      if (i === r) continue;
      if (board[i][c] === digit) return false;
    }
    return true;
  };

  const checkRow = ([r, c], digit) => {
    for (let i = 0; i < 9; i++) {
      if (i === c) continue;
      if (board[r][i] === digit) return false;
    }
    return true;
  };

  const checkSquare = ([r, c], digit) => {
    const startCol = Math.floor(c / 3) * 3;
    const startRow = Math.floor(r / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i === r && j === c) continue;
        if (board[i][j] === digit) return false;
      }
    }
    return true;
  };

  const canMatch = (point, digit) => {
    return checkCol(point, digit) && checkRow(point, digit) && checkSquare(point, digit);
  };

  const backtracking = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let k = 1; k <= 9; k++) {
            const digit = k + '';
            if (canMatch([i, j], digit)) {
              board[i][j] = digit;
              if (backtracking(board)) return true;
              board[i][j] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  backtracking(board);
}
