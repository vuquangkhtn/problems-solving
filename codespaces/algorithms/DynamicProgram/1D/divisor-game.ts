// https://leetcode.com/problems/divisor-game/?envType=problem-list-v2&envId=dynamic-programming
function divisorGame(n: number): boolean {
  function getDivisors(n: number): number[] {
    const divisors: number[] = [];
    for (let i = 1; i < n; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  const dp = new Array(n + 1).fill(false);
  dp[1] = false;
  for (let i = 2; i <= n; i++) {
    let divisors = getDivisors(i);
    for (const divisor of divisors) {
      if (!dp[i - divisor]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
