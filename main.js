// main.js

import { prettyPrint, Tree } from "./bstree.js";

function callBackPrint(node) {
  console.log(node.value);
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bstTree = new Tree(testArray);
bstTree.insert(2, bstTree.root);
bstTree.insert(22, bstTree.root);
bstTree.insert(21, bstTree.root);
prettyPrint(bstTree.root);
console.log(bstTree.isBalanced(bstTree.root));
