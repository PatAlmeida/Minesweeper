var grid;
var mine;
var flag;

function preload() {
  mine = loadImage("mine.png");
  flag = loadImage("flag.png");
}

function setup() {
  canvas = createCanvas(600, 600);
  //canvas.parent('canvas');

  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  strokeWeight(3);

  grid = new Grid();
  grid.init();
}

function draw() {
  background(51);
  grid.show();
  grid.checkWin();
}

function mousePressed() {
  grid.onClick();
}

function keyPressed() {
  if (keyCode == 32) {
    grid.onSpace();
  }
}
