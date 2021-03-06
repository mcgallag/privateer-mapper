var data, gemini, begin, end, output;
var attractor;
var particle;

function preload() {
  data = loadJSON("priv.json");
}

function setup() {
  BuildGemini();
  createCanvas(windowWidth, windowHeight);
  attractor = createVector(200, 200);
  particle = new Particle(200, 100);
}

function draw() {
  // put drawing code here
  background(0);
  stroke(255);
  strokeWeight(4);
  point(attractor.x, attractor.y);

  particle.attracted(attractor);
  particle.update();
  particle.show();
}

function beginChanged() {
  gemini.setBegin(begin.value());
  output.value(gemini.bfs().printDirections());
}

function endChanged() {
  gemini.setEnd(end.value());
  output.value(gemini.bfs().printDirections());
}

function BuildGemini() {
  // noCanvas();
  gemini = new Graph();
  
  let systems = data.systems;
  
  for (let i = 0; i < systems.length; i++) {
    let name = systems[i].name;
    let neighbors = systems[i].neighbors;
    let children = systems[i].children;
    let newnode = gemini.add(name);
    neighbors.forEach(neighbor => {
      let n = gemini.add(neighbor);
      newnode.addEdge(n);
    });
    children.forEach(child => {
      newnode.addChild(child);
    });
  }
  begin = select("#begin");
  end = select("#end");
  output = select("#output");
  var i = Object.keys(gemini.graph);
  i.sort();
  for (let systemName of i) {
    begin.option(systemName);
    end.option(systemName);
  }
  begin.changed(beginChanged);
  end.changed(endChanged);
  gemini.setBegin(begin.value());
  gemini.setEnd(end.value());
  output.value(gemini.bfs().printDirections());
}
