// https://leetcode.com/problems/container-with-most-water/

function maxArea(height: number[]): number {
  // Two Pointer
  let result = 0;

  let left = 0,
    right = height.length - 1;
  while (left < right) {
    const curwidth = right - left;
    const curheight = Math.min(height[left], height[right]);
    result = Math.max(result, curheight * curwidth);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;

  // Brute force
  // let maxStore = 0;
  // for (let i=0; i<height.length-1; i++) {
  //     for (let j=i+1; j<height.length; j++) {
  //         const store = Math.min(height[i], height[j]) * (j-i);

  //         if (maxStore < store) {
  //             maxStore = store;
  //         }
  //     }
  // }
  // return maxStore;
}
