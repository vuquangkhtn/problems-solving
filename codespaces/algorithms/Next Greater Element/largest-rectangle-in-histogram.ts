// https://leetcode.com/problems/largest-rectangle-in-histogram/description/

function largestRectangleArea(heights: number[]): number {
  // stack larger height position
  const indexStack: number[] = [];
  let max = 0;

  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = i === heights.length ? 0 : heights[i];

    while (indexStack.length && heights[indexStack[indexStack.length - 1]] > currentHeight) {
      // Calculate width:
      // - If stack is empty, width is from 0 to current index
      // - Otherwise, width is from the bar after the new top to current index
      const index = indexStack.pop()!;
      const height = heights[index];
      const width = indexStack.length === 0 ? i : i - indexStack[indexStack.length - 1] - 1;

      console.log(i, height, width);
      max = Math.max(max, height * width);
    }

    // stackHeight <= currentHeight
    indexStack.push(i);
  }

  return max;
}
