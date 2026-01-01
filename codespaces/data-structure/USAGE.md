# Data Structures - Usage Guide

## Stack

**Use Cases:**

- Last-In-First-Out (LIFO) operations

**Scenario:** Implementing undo functionality in a text editor

- Push each action onto the stack
- Pop to undo the last action

---

## Queue

**Use Cases:**

- First-In-First-Out (FIFO) processing

**Scenario:** Processing tasks in order of arrival

- Enqueue: Add task to queue
- Dequeue: Process and remove oldest task

---

## Dequeue (Double-Ended Queue)

**Use Cases:**

- Sliding window problems
- Palindrome checking
- Interleaving sequences
- Cache implementation (LRU)
- A\* pathfinding algorithm

**Scenario:** Finding maximum in sliding window

- Add element to rear
- Remove from front when window slides
- Remove from rear for smaller elements

---

## Linked List

**Use Cases:**

- Dynamic memory allocation
- Undo/Redo stacks
- Graph adjacency lists
- Hash table chaining
- Music playlist (previous/next navigation)
- Polynomial representation

**Scenario:** Implementing a browser history

- Insert new page at head
- Navigate backwards/forwards through nodes
- No need to allocate contiguous memory

---

## Stack (Monotonic Stack)

**Use Cases:**

- Next Greater Element problems
- Trapping rain water
- Largest rectangle in histogram
- Stock span problem
- Remove K Digits

**Scenario:** Finding next greater element for each element

- Maintain stack of indices in decreasing order
- When found a greater element, pop and record
- Solve in O(n) time

---

## Heap (Max Heap)

**Use Cases:**

- Priority queue (high priority items first)
- Finding top K largest elements
- Heap sort algorithm
- Load balancing
- Dijkstra's algorithm (max version)

**Scenario:** Getting top K most frequent elements

- Insert all elements with frequency
- Extract K times from max heap
- O(n + k log n) complexity

---

## Heap (Min Heap)

**Use Cases:**

- Finding K smallest elements
- Dijkstra's shortest path algorithm
- Huffman coding
- Median finding in streaming data
- Task scheduling (earliest deadline first)

**Scenario:** Finding median in a stream of numbers

- Use max heap for smaller half
- Use min heap for larger half
- Maintain size balance for quick median retrieval

---

## Binary Search Tree (BST)

**Use Cases:**

- Sorted data with dynamic insertion/deletion
- Range queries
- Autocomplete systems
- Expression trees
- File systems (directory structures)

**Scenario:** Implementing an autocomplete system

- Insert words maintaining BST property
- In-order traversal gives sorted words
- Find words starting with prefix in O(log n)

---

## AVL Tree

**Use Cases:**

- Self-balancing search operations
- Database indexing
- File systems
- When O(log n) guaranteed lookup is critical
- Competitive programming with sorted data

**Scenario:** Frequent insertions/deletions with guaranteed performance

- Automatic balancing after each operation
- Prevents worst-case O(n) operations
- Trade-off: More complex than BST

---

## Red-Black Tree

**Use Cases:**

- Java TreeMap/TreeSet implementation
- Linux kernel file systems
- Less strict balancing than AVL
- When insertions/deletions > searches
- Database B+ tree variants

**Scenario:** Implementing a sorted map with frequent updates

- Faster insertion/deletion than AVL
- Acceptable height: up to 2 log(n)
- Good balance between operations

---

## Trie

**Use Cases:**

- Autocomplete/search suggestions
- IP routing (longest prefix matching)
- Spell checking
- Word games (crossword, Scrabble)
- Dictionary implementation
- T9 text input (mobile phones)

**Scenario:** Building an autocomplete search engine

- Insert all words into trie
- For each prefix, retrieve all words efficiently
- O(m) to search where m = word length

---

## Map (Hash Map)

**Use Cases:**

- Fast lookups (O(1) average)
- Caching/memoization
- Counting frequencies
- Group anagrams
- Phone book implementation
- Session storage

**Scenario:** Two-sum problem

- Insert each number and its index into map
- For each number, check if complement exists
- O(n) time, O(n) space solution

---

## Set (Hash Set)

**Use Cases:**

- Removing duplicates
- Membership testing
- Finding common elements
- Detecting cycles in graphs
- Unique constraint validation
- Intersection/Union operations

**Scenario:** Finding duplicate numbers in array

- Insert each number into set
- If already exists, it's a duplicate
- O(n) time, O(n) space solution

---

## Round Robin

**Use Cases:**

- CPU task scheduling
- Load balancing across servers
- Fair resource allocation
- Network packet transmission
- Tournament scheduling

**Scenario:** CPU task scheduling

- Allocate time slice to each task
- Move to back of queue if not completed
- Ensures fairness across all tasks

---

## Summary Table

| Data Structure  | Insert   | Delete   | Search   | Use Case             |
| --------------- | -------- | -------- | -------- | -------------------- |
| Stack           | O(1)     | O(1)     | O(n)     | LIFO operations      |
| Queue           | O(1)     | O(1)     | O(n)     | FIFO operations      |
| Dequeue         | O(1)     | O(1)     | O(n)     | Sliding window       |
| Linked List     | O(1)\*   | O(1)\*   | O(n)     | Dynamic allocation   |
| Monotonic Stack | O(1)     | O(1)     | -        | Next greater element |
| Max Heap        | O(log n) | O(log n) | O(n)     | Priority queue       |
| Min Heap        | O(log n) | O(log n) | O(n)     | Priority queue       |
| BST             | O(log n) | O(log n) | O(log n) | Sorted dynamic data  |
| AVL Tree        | O(log n) | O(log n) | O(log n) | Balanced tree        |
| Red-Black Tree  | O(log n) | O(log n) | O(log n) | Balanced tree        |
| Trie            | O(m)     | O(m)     | O(m)     | String prefix        |
| Hash Map        | O(1)     | O(1)     | O(1)     | Fast lookup          |
| Hash Set        | O(1)     | O(1)     | O(1)     | Membership test      |
| Round Robin     | O(1)     | O(1)     | -        | Fair scheduling      |

\*with pointer to insertion/deletion point
