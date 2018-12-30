class Graph {
  constructor() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.begin = null;
  }

  setBegin(name) {
    this.begin = this.getNode(name);
  }
  setEnd(name) {
    this.end = this.getNode(name);
  }

  add(name) {
    if (this.graph[name] != undefined) {
      return this.graph[name];
    }
    var newnode = new MikeNode(name);
    this.nodes.push(newnode);
    this.graph[name] = newnode;
    return newnode;
  }

  addNode(n) {
    this.nodes.push(n);
    var name = n.value;
    this.graph[name] = n;
  }

  getNode(name) {
    return this.graph[name];
  }

  bfs() {
    if (this.begin == null || this.end == null) {
      return;
    }
    var s = [];
    var q = [];

    this.begin.parent = null;
    s.push(this.begin);
    q.push(this.begin);

    while(q.length > 0) {
      let current = q.shift();
      if (current == this.end) {
        return current;
      }
      current.edges.forEach(n => {
        if (s.includes(n) == false) {
          s.push(n);
          n.parent = current;
          q.push(n);
        }
      });
    }
    return null;
  }
}