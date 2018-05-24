function Cell(x, y) {
  this.pos = createVector(x, y);
  this.l = 50;
  this.strokeColor = color(0, 0, 255);

  this.covered = true;
  this.noMine = false;
  this.hasMine = false;
  this.hasFlag = false;

  this.numMinesAdj = -1;

  this.show = function() {
    if (this.hoveringOver()) stroke(this.strokeColor);
    else noStroke();
    if (this.covered) fill(200);
    else fill(255);
    var x = this.l + this.pos.x*(this.l+5);
    var y = this.l + this.pos.y*(this.l+5);
    rect(x, y, this.l, this.l);
    if (this.hasFlag && !grid.lost) {
      image(flag, x, y, 35, 35);
    }
    if (!this.covered) {
      textSize(20);
      switch (this.numMinesAdj) {
        case -1, 0:
          // do nothing
          break;
        case 1:
          stroke(0, 0, 255);
          fill(0, 0, 255);
          text("1", x, y);
          break;
        case 2:
          stroke(0, 200, 0);
          fill(0, 200, 0);
          text("2", x, y);
          break;
        case 3:
          stroke(255, 0, 0);
          fill(255, 0, 0);
          text("3", x, y);
          break;
        case 4:
          stroke(0, 0, 100);
          fill(0, 0, 100);
          text("4", x, y);
          break;
        case 5:
          stroke(100, 0, 0);
          fill(100, 0, 0);
          text("5", x, y);
          break;
      }
    }
    if (this.hasMine && grid.lost) {
      image(mine, x, y, 35, 35);
    }
  }

  this.hoveringOver = function() {
    var x = (this.l / 2) + (this.pos.x * (this.l + 5));
    var y = (this.l / 2) + (this.pos.y * (this.l + 5));
    var x2 = (this.l / 2 + this.l) + (this.pos.x * (this.l + 5));
    var y2 = (this.l / 2 + this.l) + (this.pos.y * (this.l + 5));

    var hover = mouseX > x && mouseX < x2 && mouseY > y && mouseY < y2;
    return hover;
  }
}
