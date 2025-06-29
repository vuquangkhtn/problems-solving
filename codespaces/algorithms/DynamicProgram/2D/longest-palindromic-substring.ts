// https://leetcode.com/problems/longest-palindromic-substring/

function longestPalindrome(s: string): string {
  /**
   * Brute force approach
   * complexibility: O(n^3)
   */
  // const isPalindromic = (left, right) => {
  //     if (right >= s.length) return false;

  //     while (s[left] === s[right]) {
  //         left++;
  //         right--;
  //     }

  //     if (left > right) return true;
  //     return false;
  // }

  // let result = '';
  // for (let i=0; i<s.length; i++) {
  //     let str = s[i];
  //     for (let j=i+1; j<s.length; j++) {
  //         str += s[j];
  //         if (isPalindromic(i, j) && result.length < j-i+1) {
  //             result = str;
  //         }
  //     }
  // }
  // return result;

  /**
   * Dynamic Programming
   * O(n^2)
   */

  const dp = Array.from(new Array(s.length), () => new Array(s.length).fill(false));

  let start = 0;
  let maxLength = 1;
  // 1 char palindrome
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }

  // 2 char palindrome
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  for (let length = 3; length <= s.length; length++) {
    for (let i = 0; i <= s.length - length; i++) {
      const j = i + length - 1;

      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        start = i;
        maxLength = length;
      }
    }
  }

  return s.substring(start, start + maxLength);
}
