// https://leetcode.com/problems/unique-paths-ii/description/

// Dynamic Programming
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = 1;

  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0; // If there's an obstacle, set paths to 0
        continue;
      }

      if (i > 0) dp[i][j] += dp[i - 1][j]; // Add paths from above
      if (j > 0) dp[i][j] += dp[i][j - 1]; // Add paths from the left
    }
  }

  return dp[m - 1][n - 1]; // Return the number of unique paths to the bottom-right corner
}

// Brute Force
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const robotPosition = [0, 0];

  const hasReachObstacle = (position) => {
    const [x, y] = position;
    return obstacleGrid[x][y] === 1;
  };
  const isOutOfRange = (position) => {
    const [x, y] = position;
    if (obstacleGrid[x] === undefined || obstacleGrid[x][y] === undefined) return true;
    return false;
  };

  const isInvalidPosition = (position) => {
    if (isOutOfRange(position)) {
      return true;
    }
    if (hasReachObstacle(position)) {
      return true;
    }

    return false;
  };

  const hasReachDestination = (position) => {
    const [x, y] = position;

    return x === obstacleGrid.length - 1 && y === obstacleGrid[0].length - 1;
  };

  let possibles = 0;
  const findPath = (position) => {
    console.log('position', position);
    if (isInvalidPosition(position)) {
      console.log('isInvalidPosition', position);
      return false;
    }
    if (hasReachDestination(position)) {
      console.log('hasReachDestination', position);
      possibles++;
      return true;
    }

    findPath([position[0] + 1, position[1]]);
    findPath([position[0], position[1] + 1]);
  };
  findPath(robotPosition);
  return possibles;
}
