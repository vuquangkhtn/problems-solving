# Sorting Algorithms

## Overview

Sorting is one of the most fundamental operations in computer science. Understanding different sorting algorithms, their trade-offs, and when to use each one is crucial for technical interviews and real-world applications.

## Algorithm Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | In-Place | Notes |
|-----------|-----------|--------------|------------|-------|--------|----------|-------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ | Educational only |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ✗ | ✓ | Minimal swaps |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ | Good for small arrays |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✓ | ✗ | Consistent performance |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ✗ | ✓ | Average case excellent |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ | ✓ | Guaranteed O(n log n) |
| **Counting Sort** | O(n + k) | O(n + k) | O(n + k) | O(k) | ✓ | ✗ | Integer keys only |
| **Radix Sort** | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | ✓ | ✗ | Fixed-length keys |
| **Bucket Sort** | O(n + k) | O(n + k) | O(n²) | O(n) | ✓ | ✗ | Uniform distribution |

## Basic Sorting Algorithms

### 1. Bubble Sort
**Concept**: Repeatedly swap adjacent elements if they're in wrong order

```typescript
function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    return result;
}
```

### 2. Selection Sort
**Concept**: Find minimum element and place it at the beginning

```typescript
function selectionSort(arr: number[]): number[] {
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}
```

### 3. Insertion Sort
**Concept**: Build sorted array one element at a time

```typescript
function insertionSort(arr: number[]): number[] {
    const result = [...arr];
    
    for (let i = 1; i < result.length; i++) {
        const key = result[i];
        let j = i - 1;
        
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}
```

## Advanced Sorting Algorithms

### 1. Merge Sort
**Concept**: Divide and conquer - split array and merge sorted halves

```typescript
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### 2. Quick Sort
**Concept**: Choose pivot, partition around it, recursively sort partitions

```typescript
function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// In-place version
function quickSortInPlace(arr: number[], low = 0, high = arr.length - 1): void {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSortInPlace(arr, low, pivotIndex - 1);
        quickSortInPlace(arr, pivotIndex + 1, high);
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
```

### 3. Heap Sort
**Concept**: Build max heap, repeatedly extract maximum

```typescript
function heapSort(arr: number[]): number[] {
    const result = [...arr];
    const n = result.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapify(result, i, 0);
    }
    
    return result;
}

function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
```

## Non-Comparison Based Sorting

### 1. Counting Sort
**Use Case**: Integer keys with known range

```typescript
function countingSort(arr: number[], maxValue: number): number[] {
    const count = new Array(maxValue + 1).fill(0);
    const result = new Array(arr.length);
    
    // Count occurrences
    for (const num of arr) {
        count[num]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }
    
    // Build result array
    for (let i = arr.length - 1; i >= 0; i--) {
        result[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return result;
}
```

### 2. Radix Sort
**Use Case**: Fixed-length integer or string keys

```typescript
function radixSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const result = [...arr];
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(result, exp);
    }
    
    return result;
}

function countingSortByDigit(arr: number[], exp: number): void {
    const count = new Array(10).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences of each digit
    for (let i = 0; i < arr.length; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy output array to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}
```

### 3. Bucket Sort
**Use Case**: Uniformly distributed floating-point numbers

```typescript
function bucketSort(arr: number[], bucketCount = 10): number[] {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = (max - min) / bucketCount;
    
    const buckets: number[][] = Array(bucketCount).fill(null).map(() => []);
    
    // Distribute elements into buckets
    for (const num of arr) {
        const bucketIndex = Math.min(
            Math.floor((num - min) / bucketSize),
            bucketCount - 1
        );
        buckets[bucketIndex].push(num);
    }
    
    // Sort individual buckets and concatenate
    const result: number[] = [];
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
        result.push(...bucket);
    }
    
    return result;
}
```

## Specialized Sorting Techniques

### 1. Tim Sort (Hybrid)
**Concept**: Combination of merge sort and insertion sort (used in Python and Java)

```typescript
function timSort(arr: number[]): number[] {
    const MIN_MERGE = 32;
    const result = [...arr];
    const n = result.length;
    
    // Sort individual subarrays of size MIN_MERGE using insertion sort
    for (let i = 0; i < n; i += MIN_MERGE) {
        const right = Math.min(i + MIN_MERGE - 1, n - 1);
        insertionSortRange(result, i, right);
    }
    
    // Start merging from size MIN_MERGE
    for (let size = MIN_MERGE; size < n; size *= 2) {
        for (let start = 0; start < n; start += size * 2) {
            const mid = start + size - 1;
            const end = Math.min(start + size * 2 - 1, n - 1);
            
            if (mid < end) {
                mergeRange(result, start, mid, end);
            }
        }
    }
    
    return result;
}

function insertionSortRange(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}

function mergeRange(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}
```

### 2. External Sorting
**Use Case**: Sorting data that doesn't fit in memory

```typescript
class ExternalSort {
    private chunkSize: number;
    
    constructor(chunkSize: number = 1000) {
        this.chunkSize = chunkSize;
    }
    
    sort(data: number[]): number[] {
        if (data.length <= this.chunkSize) {
            return data.sort((a, b) => a - b);
        }
        
        // Phase 1: Sort chunks and store them
        const sortedChunks: number[][] = [];
        for (let i = 0; i < data.length; i += this.chunkSize) {
            const chunk = data.slice(i, i + this.chunkSize);
            sortedChunks.push(chunk.sort((a, b) => a - b));
        }
        
        // Phase 2: Merge sorted chunks
        return this.mergeChunks(sortedChunks);
    }
    
    private mergeChunks(chunks: number[][]): number[] {
        const result: number[] = [];
        const pointers = new Array(chunks.length).fill(0);
        
        while (true) {
            let minValue = Infinity;
            let minChunkIndex = -1;
            
            // Find minimum value among all chunks
            for (let i = 0; i < chunks.length; i++) {
                if (pointers[i] < chunks[i].length && chunks[i][pointers[i]] < minValue) {
                    minValue = chunks[i][pointers[i]];
                    minChunkIndex = i;
                }
            }
            
            if (minChunkIndex === -1) break; // All chunks exhausted
            
            result.push(minValue);
            pointers[minChunkIndex]++;
        }
        
        return result;
    }
}
```

## Custom Comparators and Object Sorting

```typescript
interface Person {
    name: string;
    age: number;
    salary: number;
}

// Sort by multiple criteria
function sortPeople(people: Person[]): Person[] {
    return people.sort((a, b) => {
        // Primary: by age (ascending)
        if (a.age !== b.age) {
            return a.age - b.age;
        }
        
        // Secondary: by salary (descending)
        if (a.salary !== b.salary) {
            return b.salary - a.salary;
        }
        
        // Tertiary: by name (alphabetical)
        return a.name.localeCompare(b.name);
    });
}

// Generic comparator function
function createComparator<T>(
    keyFn: (item: T) => any,
    ascending = true
): (a: T, b: T) => number {
    return (a: T, b: T) => {
        const aKey = keyFn(a);
        const bKey = keyFn(b);
        
        if (aKey < bKey) return ascending ? -1 : 1;
        if (aKey > bKey) return ascending ? 1 : -1;
        return 0;
    };
}

// Usage
const people: Person[] = [
    { name: "Alice", age: 30, salary: 50000 },
    { name: "Bob", age: 25, salary: 60000 },
    { name: "Charlie", age: 30, salary: 55000 }
];

// Sort by age
people.sort(createComparator(p => p.age));

// Sort by salary (descending)
people.sort(createComparator(p => p.salary, false));
```

## Interview Problem Patterns

### 1. Merge Intervals
```typescript
interface Interval {
    start: number;
    end: number;
}

function mergeIntervals(intervals: Interval[]): Interval[] {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a.start - b.start);
    
    const merged: Interval[] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current.start <= last.end) {
            // Overlapping intervals, merge them
            last.end = Math.max(last.end, current.end);
        } else {
            // Non-overlapping interval
            merged.push(current);
        }
    }
    
    return merged;
}
```

### 2. Top K Elements
```typescript
function topKFrequent(nums: number[], k: number): number[] {
    const frequencyMap = new Map<number, number>();
    
    // Count frequencies
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Sort by frequency
    const sortedByFreq = Array.from(frequencyMap.entries())
        .sort((a, b) => b[1] - a[1]);
    
    return sortedByFreq.slice(0, k).map(([num]) => num);
}
```

### 3. Meeting Rooms
```typescript
function canAttendMeetings(intervals: Interval[]): boolean {
    intervals.sort((a, b) => a.start - b.start);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i].start < intervals[i - 1].end) {
            return false;
        }
    }
    
    return true;
}

function minMeetingRooms(intervals: Interval[]): number {
    if (intervals.length === 0) return 0;
    
    const starts = intervals.map(i => i.start).sort((a, b) => a - b);
    const ends = intervals.map(i => i.end).sort((a, b) => a - b);
    
    let rooms = 0;
    let endPointer = 0;
    
    for (let i = 0; i < starts.length; i++) {
        if (starts[i] >= ends[endPointer]) {
            endPointer++;
        } else {
            rooms++;
        }
    }
    
    return rooms;
}
```

## When to Use Each Algorithm

### Choose Based on:
1. **Data Size**: Small (insertion), Large (merge/quick)
2. **Memory Constraints**: In-place (quick/heap) vs Extra space (merge)
3. **Stability Required**: Stable (merge/counting) vs Unstable (quick/heap)
4. **Data Type**: Integers (counting/radix) vs General (comparison-based)
5. **Performance Guarantees**: Worst-case (merge/heap) vs Average-case (quick)

### Real-World Applications
- **Database Indexing**: B-tree sorting
- **Graphics**: Z-order sorting for rendering
- **Networking**: Packet scheduling
- **File Systems**: Directory listing
- **Search Engines**: Result ranking

## Problem Implementations

This directory contains the following problem solutions:

### TypeScript Solutions
- **[Almost Sorted](./Almost%20Sorted.ts)** - Determine minimum swaps to sort an array
- **[Fraudulent Activity Notifications](./Fraudulent%20Activity%20Notifications.ts)** - Detect fraudulent transactions using sorting
- **[Lily's Homework](./Lily's%20Homework.ts)** - Find minimum swaps for beautiful array
- **[The Full Counting Sort](./The%20Full%20Counting%20Sort.ts)** - Stable counting sort implementation

## Practice Problems

### Easy
- Sort Colors (Dutch Flag)
- Merge Sorted Array
- Intersection of Two Arrays
- Relative Sort Array

### Medium
- Merge Intervals
- Top K Frequent Elements
- Sort Characters By Frequency
- Meeting Rooms II
- Largest Number

### Hard
- Merge k Sorted Lists
- Count of Smaller Numbers After Self
- Reverse Pairs
- Maximum Gap

## Performance Tips

1. **Use Built-in Sort**: For most cases, use `Array.sort()`
2. **Custom Comparators**: Write efficient comparison functions
3. **Preprocessing**: Sometimes transforming data helps
4. **Hybrid Approaches**: Combine algorithms for better performance
5. **Memory Management**: Consider cache locality and memory usage

Remember: The best sorting algorithm depends on your specific use case, data characteristics, and constraints!