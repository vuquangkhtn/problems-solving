import { solveNQueens } from "./code";

function main() {
  let n = [4, 5, 6, 7, 8];
  for (let i = 0; i < n.length; i++) {
    console.log(i + 1 + ".\tQueens:", `${n[i]}, Chessboard: (${n[i]}x${n[i]})`);
    let res = solveNQueens(n[i]);
    console.log(
      `\n\tTotal solutions count for ${n[i]} queens on a (${n[i]}x${n[i]}) chessboard: ${res}`,
    );
    console.log("-".repeat(100), "\n");
  }
}

main();
