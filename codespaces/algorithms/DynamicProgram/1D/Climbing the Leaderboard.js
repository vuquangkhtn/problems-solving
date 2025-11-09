// https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem?isFullScreen=true

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
  const getRanks = (ranked) => {
    let orderRanked = [1];
    for (let i = 1; i < ranked.length; i++) {
      const prevRank = orderRanked[orderRanked.length - 1];

      if (ranked[i] === ranked[i - 1]) {
        orderRanked.push(prevRank);
      } else if (ranked[i] < ranked[i - 1]) {
        orderRanked.push(prevRank + 1);
      }
    }

    return orderRanked;
  };

  const getPlayerRanking = (orderRanked, player) => {
    // item: [rank, score]
    const playerRank = [];

    let iPlayer = 0,
      iRank = ranked.length - 1;
    while (iPlayer < player.length && iRank >= 0) {
      const rank = orderRanked[iRank];
      const score = ranked[iRank];
      const playerScore = player[iPlayer];

      if (playerScore < score) {
        playerRank.push(rank + 1);
        iPlayer++;
        continue;
      }

      if (playerScore > score) {
        iRank--;
        continue;
      }

      if (playerScore === score) {
        playerRank.push(rank);
        iPlayer++;
      }
    }

    if (iRank < 0 && iPlayer < player.length) {
      while (iPlayer < player.length) {
        playerRank.push(1);
        iPlayer++;
      }
    }

    return playerRank;
  };

  // Write your code here
  let orderRanked = getRanks(ranked);

  return getPlayerRanking(orderRanked, player);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const rankedCount = parseInt(readLine().trim(), 10);

  const ranked = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((rankedTemp) => parseInt(rankedTemp, 10));

  const playerCount = parseInt(readLine().trim(), 10);

  const player = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((playerTemp) => parseInt(playerTemp, 10));

  const result = climbingLeaderboard(ranked, player);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
