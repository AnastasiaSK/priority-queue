const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = 30;
    if (maxSize) {
      this.maxSize = maxSize;
    }
  }

  push(data, priority) {}

  shift() {}

  size() {}

  isEmpty() {}
}

module.exports = PriorityQueue;
