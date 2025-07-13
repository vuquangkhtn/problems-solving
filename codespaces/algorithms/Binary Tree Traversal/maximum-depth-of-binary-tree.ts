// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
import { TreeNode } from '../utils/tree-node';

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function maxDepth(root: TreeNode | null): number {
  const helper = (node) => {
    if (!node) {
      return 0;
    }
    return Math.max(helper(node.left) + 1, helper(node.right) + 1);
  };

  return helper(root);
}
