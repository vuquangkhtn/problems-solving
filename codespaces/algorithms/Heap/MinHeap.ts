// multiple to -1 to make it a min heap
export class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop() || null;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop() || 0;
    this.bubbleDown();
    return min;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = leftChildIndex;
      }
      if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = rightChildIndex;
      }
      if (smallestIndex === index) break;

      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      index = smallestIndex;
    }
  }
}
// Usage example
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
console.log(minHeap.extractMin()); // 3
console.log(minHeap.extractMin()); // 5
console.log(minHeap.extractMin()); // 8
console.log(minHeap.extractMin()); // null (heap is empty)
