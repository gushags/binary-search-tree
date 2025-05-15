// bstree.js

import { mergeSort } from "./mergeSort.js";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.sorted = false;
    this.unique = false;
  }
  // methods
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (!this.sorted) {
      arr = mergeSort(arr);
      this.sorted = true; // only sort once
    }

    if (!this.unique) {
      arr = [...new Set(arr)];
      end = arr.length - 1;
      this.unique = true; // only filter out duplicate values once
    }

    if (start > end) return null; // base condition to end recursion
    let mid = start + Math.floor((end - start) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1); // create left side of BST
    node.right = this.buildTree(arr, mid + 1, end); // create right side of BST

    return node;
  }
  insert(value, node) {
    if (value < node.value) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        this.insert(value, node.right);
      }
    }
  }

  delete(valueToDelete, node) {
    let currentNode = node;
    let parentOfCurrentNode;
    let childOfDeletedNode;
    let nodeToDelete;

    while (currentNode) {
      if (currentNode.value === valueToDelete) {
        nodeToDelete = currentNode;
        break;
      }
      parentOfCurrentNode = currentNode;
      if (valueToDelete < currentNode.value) {
        currentNode = currentNode.left;
      } else if (valueToDelete > currentNode.value) {
        currentNode = currentNode.right;
      }
    }
    if (!nodeToDelete) {
      return null;
    }
    // nodeToDelete has two children
    if (nodeToDelete.left && nodeToDelete.right) {
      this.replaceWithSuccessorChild(nodeToDelete);
    } else {
      // nodeToDelete has 0 or 1 children
      childOfDeletedNode = nodeToDelete.left || nodeToDelete.right;
      if (!parentOfCurrentNode) {
        // deleting root node
        nodeToDelete.value = childOfDeletedNode.value;
        nodeToDelete.left = childOfDeletedNode.left;
        nodeToDelete.right = childOfDeletedNode.right;
      } else if (nodeToDelete === parentOfCurrentNode.left) {
        parentOfCurrentNode.left = childOfDeletedNode;
      } else if (nodeToDelete === parentOfCurrentNode.right) {
        parentOfCurrentNode.right = childOfDeletedNode;
      }
    }
    return nodeToDelete;
  }
  // helper function for delete
  replaceWithSuccessorChild(node) {
    let successorNode = node.right;
    let parentofSuccessorNode;
    if (!successorNode.left) {
      node.value = successorNode.value;
      node.right = successorNode.right;
      return;
    }
    while (successorNode.left) {
      parentofSuccessorNode = successorNode;
      successorNode = successorNode.left;
    }
    if (successorNode.right) {
      parentofSuccessorNode.left = successorNode.right;
    } else {
      parentofSuccessorNode.left = null;
    }
    node.value = successorNode.value;
    return successorNode;
  }

  find(searchValue, node) {
    if (!node || node.value === searchValue) {
      return node;
    }
    if (searchValue < node.value) {
      return this.find(searchValue, node.left);
    } else {
      return this.find(searchValue, node.right);
    }
  }

  levelOrder(node, callback, qArray = [node]) {
    if (typeof callback != "function") {
      throw new Error("A callback function is required.");
    }
    if (qArray.length === 0) return;
    if (node.left) qArray.push(node.left);
    if (node.right) qArray.push(node.right);
    callback(node);
    qArray.shift();
    this.levelOrder(qArray[0], callback, qArray);
  }

  inOrder(node, callback) {
    if (typeof callback != "function") {
      throw new Error("A callback function is required.");
    }
    if (node === null) {
      return;
    } else {
      this.inOrder(node.left, callback);
      callback(node);
      this.inOrder(node.right, callback);
    }
  }

  preOrder(node, callback) {
    if (typeof callback != "function") {
      throw new Error("A callback function is required.");
    }
    if (node === null) {
      return;
    } else {
      callback(node);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  postOrder(node, callback) {
    if (typeof callback != "function") {
      throw new Error("A callback function is required.");
    }
    if (node === null) {
      return;
    } else {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node);
    }
  }

  height(value, node) {
    let targetNode = this.find(value, node);
    if (targetNode === null) {
      throw new Error("That value is not in the search tree.");
    }
    return this.getHeight(targetNode);
  }

  // helper for height because height because we need to find the correct
  // node corresponding to value, but don't want to keep searching for the
  //correct node recursively
  getHeight(targetNode) {
    if (targetNode === null) {
      return -1;
    }
    let leftHeight = this.getHeight(targetNode.left);
    let rightHeight = this.getHeight(targetNode.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value, node) {
    if (this.find(value, node) === null) {
      throw new Error("That value is not in the search tree.");
    }
    return this.height(node.value, node) - this.height(value, node);
  }

  // returns height if balanced, -1 if any node is inbalanced
  checkBalanced(currentNode) {
    if (currentNode === null) {
      return 0;
    }

    let leftHeight = this.checkBalanced(currentNode.left);
    if (leftHeight === -1) return -1;

    let rightHeight = this.checkBalanced(currentNode.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    //if it is balanced then return the height
    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(node) {
    if (this.checkBalanced(node) > 0) {
      return true;
    } else {
      return false;
    }
  }

  rebalance(node) {
    // check if the tree is balanced. If it is, do nothing
    // if unbalanced, traverse the tree inorder and create an ordered array
    // use the ordered array to build a new tree
    if (this.checkBalanced(node) > 0) {
      return;
    } else {
      let sortedArray = [];
      this.inOrder(node, (node) => {
        sortedArray.push(node.value);
      });
      let newTree = new Tree(sortedArray);
      return newTree;
    }
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
