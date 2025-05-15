// main.js

import { prettyPrint, Tree } from "./bstree.js";

function callBackPrint(node) {
  console.log(node.value);
}

let testArray = Array(20)
  .fill()
  .map(() => Math.floor(Math.random() * 100));

// Create a new BST
let bstTree = new Tree(testArray);

// Confirm that the
console.log("The tree is balanced: " + bstTree.isBalanced(bstTree.root));

// Print out by level, pre-order, in order, post-order
console.log("Level order:");
bstTree.levelOrder(bstTree.root, callBackPrint);
console.log("Pre order:");
bstTree.preOrder(bstTree.root, callBackPrint);
console.log("In order:");
bstTree.inOrder(bstTree.root, callBackPrint);
console.log("Post order:");
bstTree.postOrder(bstTree.root, callBackPrint);

// Add numbers greater than 100 to unbalance tree
bstTree.insert(135, bstTree.root);
bstTree.insert(101, bstTree.root);
bstTree.insert(122, bstTree.root);
bstTree.insert(136, bstTree.root);

// Confirm that the tree is unbalanced
console.log("The tree is balanced: " + bstTree.isBalanced(bstTree.root));

// Rebalance the tree
bstTree = bstTree.rebalance(bstTree.root);
console.log(
  "The tree has been rebalanced. Now checking if the tree is balanced..."
);

// Confirm that the tree is balanced
console.log("The tree is balanced: " + bstTree.isBalanced(bstTree.root));

// Print out by level, pre-order, in order, post-order
console.log("Level order:");
bstTree.levelOrder(bstTree.root, callBackPrint);
console.log("Pre order:");
bstTree.preOrder(bstTree.root, callBackPrint);
console.log("In order:");
bstTree.inOrder(bstTree.root, callBackPrint);
console.log("Post order:");
bstTree.postOrder(bstTree.root, callBackPrint);
