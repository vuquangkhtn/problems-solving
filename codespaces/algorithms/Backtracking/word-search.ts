// https://leetcode.com/problems/word-search

interface KeyPair {
  [key: string]: number;
}

function exist(board: string[][], word: string): boolean {
  const m = board.length,
    n = board[0].length;

  const checkWord = (row, col, length = 0, indexed = new Set()) => {
    if (length === word.length) {
      return true;
    }

    const key = `${row},${col}`;
    if (indexed.has(key)) return false;

    if (board[row] && board[row][col] && word[length] === board[row][col]) {
      indexed.add(key);
      const top = checkWord(row + 1, col, length + 1, indexed);
      const bot = checkWord(row - 1, col, length + 1, indexed);
      const right = checkWord(row, col + 1, length + 1, indexed);
      const left = checkWord(row, col - 1, length + 1, indexed);
      indexed.delete(key);

      return top || bot || right || left;
    }

    return false;
  };

  // check if board includes all chars in word
  const wordCount = word.split('').reduce((acc, char) => {
    if (!acc[char]) {
      acc[char] = 0;
    }
    acc[char]++;
    return acc;
  }, {} as KeyPair);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const char = board[i][j];
      if (wordCount[char]) {
        wordCount[char]--;
      }
    }
  }
  if (Object.values(wordCount).some((val) => val > 0)) return false;

  // check if word is exist or not
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const result = checkWord(i, j);

      if (result) return true;
    }
  }

  return false;
}
