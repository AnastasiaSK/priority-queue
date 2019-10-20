class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left === null) {
      this.left = node;
      node.parent = this;
    } else if (this.right === null) {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) {
      this.left = null;
      node.parent = null;
    } else if (this.right === node) {
      this.right = null;
      node.parent = null;
    } else {
      throw Error("node is not a child of this node");
    }
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent) {
      const parent = this.parent;
      const left = this.left;
      const grandparent = this.parent.parent;
      let side;
      if (parent.left == this) {
        this.left = parent;
        parent.parent = this;
        if (parent.right) {
          parent.right.parent = this;
          this.right = parent.right;
        }
        if (left) {
          left.parent = parent;
          parent.left = left;
        }
      } else if (parent.right == this) {
        this.right = parent;
        parent.parent = this;
        parent.left.parent = this;
      }

      this.parent = grandparent;
      if (grandparent) {
        if (grandparent.left == parent) {
          grandparent.left = this;
        } else if (grandparent.right == parent) {
          grandparent.right = this;
        }
      }
    }
  }
}

module.exports = Node;
