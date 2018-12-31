const RADIUS = 5;
const MAXSPEED = 5;
const MAXFORCE = 0.8;
const DEFAULT_RED = 0;
const DEFAULT_GREEN = 255;
const DEFAULT_BLUE = 0;
const DEFAULT_ALPHA = 255;

class Rocket {
  constructor(x=0, y=0, alpha = DEFAULT_ALPHA, radius = RADIUS) {
    this.position = createVector(random(windowWidth), random(windowHeight));
    // this.velocity = createVector();
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.target = createVector(x, y);
    this.radius = radius;
    this.color = color(DEFAULT_RED, DEFAULT_GREEN, DEFAULT_BLUE, alpha);
    this.maxspeed = MAXSPEED;
    this.maxforce = MAXFORCE;
  }

  behaviors() {
    let seek = this.arrive(this.target);
    this.applyForce(seek);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    if (this.position.x < 0 || this.position.x > windowWidth)
      this.velocity.x *= -1;
      if (this.position.y < 0 || this.position.y > windowHeight)
      this.velocity.y *= -1;

    this.acceleration.mult(0);
  }

  show() {
    stroke(this.color);
    strokeWeight(1);
    noFill();
    // point(this.position.x, this.position.y);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }

  arrive(target) {
    try {
      let desired = p5.Vector.sub(target, this.position);
      let d = desired.mag();
      let speed = (d < 100) ?
        (d / 100) * this.maxspeed :
        this.maxspeed;
      desired.setMag(speed);

      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } catch (error) {
      console.log(target);
      console.log(this.position);
      console.log(error);
      throw error;
      // return createVector(0, 0);
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  updateTarget(pt) {
    this.target.x = pt.x;
    this.target.y = pt.y;
    this.color = color(DEFAULT_RED, DEFAULT_GREEN, DEFAULT_BLUE, pt.alpha);
  }
}