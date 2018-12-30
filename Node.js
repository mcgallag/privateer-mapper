class MikeNode {
  constructor(v) {
    this.value = v;
    this.edges = [];
    this.searched = false;
    this.parent = null;
    this.children = [];
    this.parent = undefined;
  }

  addEdge(neighbor) {
    if (this.edges.includes(neighbor) == false) {
      this.edges.push(neighbor);
    }
    if (neighbor.edges.includes(this) == false) {
      neighbor.edges.push(this);
    }
  }

  addChild(child) {
    this.children.push(child);
  }

  printDirections() {
    let s = "";
    if (this.parent != null) {
      s += this.parent.printDirections() + " -> ";
    }
    s += this.value;
    return s;
  }
}