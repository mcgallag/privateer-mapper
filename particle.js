class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y);
    this.vel = createVector();
    // this.vel = p5.Vector.random2D();
    // this.vel.setMag(random(2,10));
    this.acc = createVector();
    this.limit = random(3,7);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    // 1102
    // let maxdist = 1102.0;
    // let d = p5.Vector.sub(center, this.pos);
    // let distance = d.mag();
    // let hue = distance / maxdist;
    // hue *= 360;
    // let saturation = 100 - ((distance / maxdist) * 100);
    // let brightness = 80 - ((distance / maxdist) * 80);
    stroke(192);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.limit);
    this.pos.add(this.vel); 
    this.acc.mult(0);
  }

  attracted(target) {
    // dir = target - pos
    // var force = p5.Vector.sub(target, this.pos);
    var force = createVector(target.x - this.pos.x, target.y - this.pos.y);
    var dsquared = force.magSq();
    dsquared = constrain(dsquared, 5, 50);
    var G = 50;
    var strength = G / dsquared;
    force.setMag(strength);
    this.applyForce(force.mult(1));
  }
}