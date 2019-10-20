const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  push(data, priority) {
    let node = new Node(data, priority);

    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.parentNodes.length !== 0) {
      this.detachRoot();
      return this.root.data;
    }
  }

  detachRoot() {
    let node = this.root;

    let nodeIndex = this.parentNodes.findIndex(element => element === node);
    if (nodeIndex !== -1) {
      this.parentNodes.splice(nodeIndex, 1);
    }
    this.root = null;
    return node;
  }

  restoreRootFromLastInsertedNode(detached) {
    this.root = this.parentNodes.pop();

    if (!this.isEmpty()) {
      this.root = this.parentNodes.pop();
      if (this.root.parent) {
        if (
          this.root.parent !== detached &&
          this.root.parent.right === this.root
        )
          this.parentNodes.unshift(this.root.parent);
        this.root.remove();
        if (detached.left !== this.root && detached.left)
          this.root.appendChild(detached.left);
        if (detached.right !== this.root && detached.right)
          this.root.appendChild(detached.right);
        if (!this.root.right) this.parentNodes.unshift(this.root);
      }
    }
  }

  size() {}

  isEmpty() {
    return this.root === null && this.parentNodes.length === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }

  insertNode(node) {
    this.parentNodes.push(node);
    if (this.root === null) {
      this.root = node;
    } else {
      this.parentNodes[0].appendChild(node);
      if (this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node.parent) {
      let currentNodeIndex = this.parentNodes.findIndex(
        element => element === node
      );
      let currentNodeParentIndex = this.parentNodes.findIndex(
        element => element === node.parent
      );

      if (currentNodeIndex !== -1) {
        if (currentNodeParentIndex !== -1) {
          this.parentNodes[currentNodeParentIndex] = node;
        }
        this.parentNodes[currentNodeIndex] = node.parent;
      }
      node.swapWithParent();

      this.shiftNodeUp(node);
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
