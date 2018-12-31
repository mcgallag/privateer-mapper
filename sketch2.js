var attractors = [];
var particles = [];
var numParticles = 500;
var numAttractors = 0;
var bg = false;
var center;

function setup() {
  // colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  center = createVector(windowWidth / 2, windowHeight / 2);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(windowWidth), random(windowHeight)));
    // particles.push(new Particle(windowWidth / 2, windowHeight / 2));
  }
  for (let i = 0; i < numAttractors; i++) {
    attractors.push(createVector(random(windowWidth), random(windowHeight)));
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  for (let attractor of attractors) {
    point(attractor.x, attractor.y);
  }
  for (let particle of particles) {
    for (let attractor of attractors) {
      particle.attracted(attractor);
    }
    particle.update();
    particle.show();
  }
}

function mouseClicked() {
  background(0);
  attractors.push(createVector(mouseX, mouseY));
}