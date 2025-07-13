// LeetCode Problem: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  /**
    preorder: node -> left -> right
    inorder: left -> node -> right
    */
  if (!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);

  const mid = inorder.indexOf(rootVal);
  /**
    => With inorder (root is mid):
    - there are 0 -> mid - 1 left nodes => inorder.slice(0, mid)
    - there are mid + 1 -> end right nodes => inorder.slice(mid+1)

    => With preorder (root is 0 index):
    - 1 -> mid are next left nodes (removed root)
    - mid + 1 -> end are next right nodes
    */

  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

  return root;
}
