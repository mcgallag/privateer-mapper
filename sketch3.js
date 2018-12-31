var font;
const maxFontSize = 400;
var xOffset = -30;
var yOffset = -15;
var displayTextArray = ["Gwar isn't", "A", "good band"];

var smart = false;

var rocketArray = [];

function preload() {
  font = loadFont("Library3am.otf");
}

function getPoints(txt) {
  let size = 0;
  var bbox;
  do {
    size += 8;
    bbox = font.textBounds(txt, 0, 0, size);
  } while (bbox.w < windowWidth && bbox.h < windowHeight && size <= maxFontSize);
  size -= 32;
  bbox = font.textBounds(txt, 0, 0, size);
  var points = font.textToPoints(txt, (windowWidth-bbox.w) / 2 + xOffset, (windowHeight-bbox.h) / 2 + bbox.h + yOffset, size);

  return points;
}

function mouseClicked() {
  smart = !smart;
  if (!smart) {
    for (let rockets of rocketArray) {
      for (let rocket of rockets) {
        rocket.applyForce(p5.Vector.random2D());
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let line of displayTextArray) {
    rocketArray.push([]);
  }
  updatePoints(displayTextArray);
}

function draw() {
  background(0);
  for (let rockets of rocketArray) {
    for (let rocket of rockets) {
      if (smart)
        rocket.behaviors();
      rocket.update();
      rocket.show();
    }
  }
}

function calculateSize(textArray) {
  let size = 8;
  for (let line of textArray) {
    let bbox = font.textBounds(line, 0, 0, size);
    while (bbox.w < windowWidth && bbox.h < windowHeight && size <= maxFontSize) {
      size += 8;
      bbox = font.textBounds(line, 0, 0, size);
    }
    while (bbox.w > windowWidth || bbox.h > windowHeight) {
      size -= 22;
      bbox = font.textBounds(line, 0, 0, size);
    }
  }
  return size;
}

function updatePoints(textArray) {
  let bboxArray = [];
  let totalHeight = 0;

  // figure out a size such that every line will remain within windowWidth
  let size = calculateSize(textArray);

  for (let line of textArray) {
    var bbox = font.textBounds(line, 0, 0, size);
    totalHeight += bbox.h;
    bboxArray.push(bbox);
  }

  for (let i = 0; i < textArray.length; i++) {
    var line = textArray[i];
    var rockets = rocketArray[i];
    var bbox = bboxArray[i];

    // hopefully this works! the y offset is the tricky part
    var points = font.textToPoints(line, (windowWidth-bbox.w) / 2 + xOffset, (windowHeight-totalHeight) / 2 + (bbox.h*i) / 2 + yOffset, size);

    updateRockets(rockets, points);
  }
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    line = displayTextArray.pop();
    if (line.length == 0) {
      rocketArray.pop();
      return;
    }
    line = line.substring(0, line.length-1)
    displayTextArray.push(line);

    updatePoints(displayTextArray);
  }
}

function keyTyped() {
  if (keyCode == ENTER) {
    displayTextArray.push("");
    return;
  }
  let line = displayTextArray.pop();
  line += char(keyCode);
  displayTextArray.push(line);

  updatePoints(displayTextArray);
}

function updateRockets(rockets, points) {
  if (points.length <= rockets.length) {
    // if we need to get rid of extra rockets
    let diff = rockets.length - points.length;
    rockets.splice(points.length, diff)
  } else {
    let diff = points.length - rockets.length;
    for (let i = 0; i < diff; i++) {
      rockets.push(new Rocket());
    }
  }
  for (let i = 0; i < points.length; i++) {
    rockets[i].updateTarget(points[i]);
  }
}