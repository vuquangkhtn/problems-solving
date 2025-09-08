# Heap Data Structure

## Overview

A heap is a specialized tree-based data structure that satisfies the heap property. It's commonly implemented as a binary heap using an array representation, making it efficient for priority queue operations.

## Key Concepts

### Heap Property
- **Max Heap**: Parent node ≥ all children (root is maximum)
- **Min Heap**: Parent node ≤ all children (root is minimum)

### Array Representation
For a node at index `i`:
- Left child: `2*i + 1`
- Right child: `2*i + 2`
- Parent: `Math.floor((i-1)/2)`

### Time Complexities
- **Insert**: O(log n)
- **Extract Min/Max**: O(log n)
- **Peek**: O(1)
- **Build Heap**: O(n)

## Core Operations

### 1. Insertion (Bubble Up)
```typescript
insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp();
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
```

### 2. Extraction (Bubble Down)
```typescript
extractMin(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop() || null;
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop() || 0;
    this.bubbleDown();
    return min;
}
```

## Available Implementations

This directory contains two heap implementations:

1. **MaxHeap.ts** - Complete max heap implementation with detailed helper methods
2. **MinHeap.ts** - Clean min heap implementation with modern TypeScript

## Common Use Cases

### 1. Priority Queue
- Task scheduling
- Dijkstra's algorithm
- A* pathfinding

### 2. Top K Problems
- Find K largest/smallest elements
- K closest points to origin
- Top K frequent elements

### 3. Median Finding
- Use two heaps (max heap for smaller half, min heap for larger half)
- Stream median calculation

### 4. Merge Operations
- Merge K sorted lists
- Merge K sorted arrays

## Interview Problem Patterns

### Pattern 1: Top K Elements
```typescript
// Find K largest elements
function findKLargest(nums: number[], k: number): number[] {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    
    return minHeap.toArray();
}
```

### Pattern 2: Merge K Sorted Lists
```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const heap = new MinHeap();
    
    // Add first node of each list to heap
    for (const list of lists) {
        if (list) heap.insert({ val: list.val, node: list });
    }
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (!heap.isEmpty()) {
        const { node } = heap.extractMin();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            heap.insert({ val: node.next.val, node: node.next });
        }
    }
    
    return dummy.next;
}
```

### Pattern 3: Running Median
```typescript
class MedianFinder {
    private maxHeap: MaxHeap; // smaller half
    private minHeap: MinHeap; // larger half
    
    constructor() {
        this.maxHeap = new MaxHeap();
        this.minHeap = new MinHeap();
    }
    
    addNum(num: number): void {
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.insert(num);
        } else {
            this.minHeap.insert(num);
        }
        
        // Balance heaps
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.extractMax());
        } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }
    
    findMedian(): number {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
        return this.maxHeap.size() > this.minHeap.size() 
            ? this.maxHeap.peek() 
            : this.minHeap.peek();
    }
}
```

## Interview Tips

### When to Use Heaps
- Need to repeatedly find min/max element
- Top K problems
- Priority-based processing
- Merge operations with multiple sorted sequences

### Common Mistakes
1. **Index Calculation**: Remember array is 0-indexed
2. **Heap Property**: Ensure correct comparison for min/max heap
3. **Edge Cases**: Handle empty heap, single element
4. **Custom Comparators**: For objects, define proper comparison logic

### Optimization Techniques
1. **Build Heap**: Use bottom-up approach for O(n) construction
2. **In-place Heapify**: For heap sort implementation
3. **Custom Objects**: Use comparison functions for complex data types

## Practice Problems

### Easy
- Kth Largest Element in a Stream
- Last Stone Weight
- Relative Ranks

### Medium
- Top K Frequent Elements
- Kth Largest Element in an Array
- Find Median from Data Stream
- K Closest Points to Origin
- Merge k Sorted Lists

### Hard
- Sliding Window Median
- Find Median from Data Stream (follow-up)
- Merge k Sorted Arrays
- Smallest Range Covering Elements from K Lists

## Space and Time Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(log n) | O(1) |
| Extract | O(log n) | O(1) |
| Peek | O(1) | O(1) |
| Build | O(n) | O(1) |
| Search | O(n) | O(1) |

**Note**: Heaps are not designed for searching arbitrary elements. Use balanced BST if search is required.

## Related Data Structures
- **Priority Queue**: Heap is the most common implementation
- **Binary Search Tree**: Better for search operations
- **Balanced Trees**: AVL, Red-Black trees for ordered operations
- **Fibonacci Heap**: Advanced heap with better amortized performance