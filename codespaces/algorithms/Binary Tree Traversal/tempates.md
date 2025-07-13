# Binary Tree Traversal Templates

This document contains template implementations for various binary tree traversal algorithms.

## Tree Node Definition

```typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}
```

## Traversal Methods

### Preorder Traversal

**Pattern**: Visit node first, then left subtree, then right subtree
**Use cases**: Tree copying, prefix expressions

```typescript
function preorderTraversal(node: TreeNode | null): void {
  if (!node) return;

  // visit node (process node.val)
  preorderTraversal(node.left);
  preorderTraversal(node.right);
}
```

### Inorder Traversal

**Pattern**: Visit left subtree, then node, then right subtree
**Use cases**: BST sorted order, expression evaluation

```typescript
function inorderTraversal(node: TreeNode | null): void {
  if (!node) return;

  inorderTraversal(node.left);
  // visit node (process node.val)
  inorderTraversal(node.right);
}
```

### Postorder Traversal

**Pattern**: Visit left subtree, then right subtree, then node
**Use cases**: Tree deletion, calculating subtree sizes

```typescript
function postorderTraversal(node: TreeNode | null): void {
  if (!node) return;

  postorderTraversal(node.left);
  postorderTraversal(node.right);
  // visit node (process node.val)
}
```

### Level Order Traversal (BFS)

**Pattern**: Visit all nodes level by level using a queue
**Use cases**: Finding shortest path, level-by-level processing

```typescript
function levelOrderTraversal(root: TreeNode | null): void {
  if (!root) return;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    // visit node (process node.val)

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

### Tree Property Templates

#### Maximum Depth

**Use cases**: Finding tree height, depth-based algorithms

```typescript
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

#### Path Sum Template

**Use cases**: Finding paths with specific sums, root-to-leaf problems

```typescript
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  // Leaf node check
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  const remainingSum = targetSum - root.val;
  return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
}
```

#### Tree Serialization/Deserialization

**Use cases**: Storing/loading tree structures, tree comparison

```typescript
function serialize(root: TreeNode | null): string {
  if (!root) return 'null';

  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data: string): TreeNode | null {
  const values = data.split(',');
  let index = 0;

  function buildTree(): TreeNode | null {
    if (index >= values.length || values[index] === 'null') {
      index++;
      return null;
    }

    const node = new TreeNode(parseInt(values[index]));
    index++;
    node.left = buildTree();
    node.right = buildTree();
    return node;
  }

  return buildTree();
}
```
