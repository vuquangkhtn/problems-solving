/**
 * avl-tree.ts
 *
 * Simple generic AVL Tree implementation in TypeScript.
 *
 * Features:
 * - Generic keys with a comparator (defaults to numeric/string comparison).
 * - insert, remove, contains, findMin, findMax.
 * - in-order, pre-order, post-order traversal helpers.
 * - Balanced after insertions/removals using LL, RR, LR, RL rotations.
 *
 * Usage:
 * const tree = new AVLTree<number>();
 * tree.insert(10); tree.insert(20); tree.insert(5);
 * console.log(tree.toArray()); // in-order sorted array
 *
 * Or with custom comparator:
 * const cmp = (a: Person, b: Person) => a.id - b.id;
 * const peopleTree = new AVLTree<Person>(cmp);
 */

export class AVLNode<T> {
  key: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;

  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree<T> {
  root: AVLNode<T> | null = null;
  private comparator: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    if (comparator) {
      this.comparator = comparator;
    } else {
      // default comparator supports numbers and strings
      this.comparator = ((a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }) as (a: T, b: T) => number;
    }
  }

  // Public API

  insert(key: T): void {
    this.root = this._insert(this.root, key);
  }

  remove(key: T): void {
    this.root = this._remove(this.root, key);
  }

  contains(key: T): boolean {
    let node = this.root;
    while (node) {
      const cmp = this.comparator(key, node.key);
      if (cmp === 0) return true;
      node = cmp < 0 ? node.left : node.right;
    }
    return false;
  }

  findMin(): T | null {
    const node = this._minNode(this.root);
    return node ? node.key : null;
  }

  findMax(): T | null {
    let node = this.root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node.key;
  }

  size(): number {
    return this.toArray().length;
  }

  // Traversals

  toArray(): T[] {
    const out: T[] = [];
    this._inOrder(this.root, out);
    return out;
  }

  toPreOrderArray(): T[] {
    const out: T[] = [];
    this._preOrder(this.root, out);
    return out;
  }

  toPostOrderArray(): T[] {
    const out: T[] = [];
    this._postOrder(this.root, out);
    return out;
  }

  // Private helpers

  private height(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private updateHeight(node: AVLNode<T>) {
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  private balanceFactor(node: AVLNode<T> | null): number {
    if (!node) return 0;
    return this.height(node.left) - this.height(node.right);
  }

  private rotateRight(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    // perform rotation
    x.right = y;
    y.left = T2;

    // update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    // perform rotation
    y.left = x;
    x.right = T2;

    // update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  private _insert(node: AVLNode<T> | null, key: T): AVLNode<T> {
    if (!node) return new AVLNode(key);

    const cmp = this.comparator(key, node.key);
    if (cmp < 0) {
      node.left = this._insert(node.left, key);
    } else if (cmp > 0) {
      node.right = this._insert(node.right, key);
    } else {
      // duplicate keys are ignored; could be changed to allow duplicates
      return node;
    }

    this.updateHeight(node);

    const bf = this.balanceFactor(node);

    // Left Left
    if (bf > 1 && this.comparator(key, node.left!.key) < 0) {
      return this.rotateRight(node);
    }

    // Right Right
    if (bf < -1 && this.comparator(key, node.right!.key) > 0) {
      return this.rotateLeft(node);
    }

    // Left Right
    if (bf > 1 && this.comparator(key, node.left!.key) > 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Left
    if (bf < -1 && this.comparator(key, node.right!.key) < 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private _minNode(node: AVLNode<T> | null): AVLNode<T> | null {
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }

  private _remove(node: AVLNode<T> | null, key: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.comparator(key, node.key);
    if (cmp < 0) {
      node.left = this._remove(node.left, key);
    } else if (cmp > 0) {
      node.right = this._remove(node.right, key);
    } else {
      // node to be deleted found
      if (!node.left || !node.right) {
        const temp = node.left ? node.left : node.right;
        if (!temp) {
          // no child
          return null;
        } else {
          // one child
          node = temp;
        }
      } else {
        // two children: get inorder successor (smallest in right subtree)
        const temp = this._minNode(node.right)!;
        node.key = temp.key;
        node.right = this._remove(node.right, temp.key);
      }
    }

    // Update height and balance
    this.updateHeight(node);

    const bf = this.balanceFactor(node);

    // Left Left
    if (bf > 1 && this.balanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }

    // Left Right
    if (bf > 1 && this.balanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Right
    if (bf < -1 && this.balanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }

    // Right Left
    if (bf < -1 && this.balanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private _inOrder(node: AVLNode<T> | null, out: T[]) {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.key);
    this._inOrder(node.right, out);
  }

  private _preOrder(node: AVLNode<T> | null, out: T[]) {
    if (!node) return;
    out.push(node.key);
    this._preOrder(node.left, out);
    this._preOrder(node.right, out);
  }

  private _postOrder(node: AVLNode<T> | null, out: T[]) {
    if (!node) return;
    this._postOrder(node.left, out);
    this._postOrder(node.right, out);
    out.push(node.key);
  }
}
