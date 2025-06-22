// https://leetcode.com/problems/letter-combinations-of-a-phone-number

const DIGITAL_MAPPING = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};

function letterCombinations(digits: string): string[] {
  const result: string[] = [];
  const backtracking = (index = 0, arr: string[] = []) => {
    if (arr.length === digits.length && arr.length > 0) {
      result.push(arr.join(''));
      return;
    }

    for (let i = index; i < digits.length; i++) {
      const digit = digits[i];
      for (let j = 0; j < DIGITAL_MAPPING[digit].length; j++) {
        arr.push(DIGITAL_MAPPING[digit][j]);
        backtracking(i + 1, arr);
        arr.pop();
      }
    }
  };

  backtracking();

  return result;
}
