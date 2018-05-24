function Grid() {
  this.cells = [];
  this.width = 10;
  this.height = 10;

  this.allCovered = true;

  this.lost = false;

  this.numMines = 10;

  this.init = function() {
    for (var i=0; i<this.height; i++) {
      for (var j=0; j<this.width; j++) {
        this.cells.push(new Cell(j, i));
      }
    }
  }

  this.getAdjacentCells = function(cell) {
    var adj = [];
    var cellX = cell.pos.x;
    var cellY = cell.pos.y;

    /* var cellArr = cellY * 10 + cellX;

    if (cellX > 0 && cellY > 0) adj.push(this.cells[cellArr - 11]);
    if (cellY > 0) adj.push(this.cells[cellArr - 10]);
    if (cellX < 9 && cellY > 0) adj.push(this.cells[cellArr - 9]);
    if (cellX > 0) adj.push(this.cells[cellArr - 1]);
    if (cellX < 9) adj.push(this.cells[cellArr + 1]);
    if (cellX > 0 && cellY < 9) adj.push(this.cells[cellArr + 9]);
    if (cellY < 9) adj.push(this.cells[cellArr + 10]);
    if (cellX < 9 && cellY < 9) adj.push(this.cells[cellArr + 11]); */

    var cellArr = cellY * this.width + cellX;

    if (cellX > 0 && cellY > 0) adj.push(this.cells[cellArr - (this.width+1)]);
    if (cellY > 0) adj.push(this.cells[cellArr - this.width]);
    if (cellX < (this.width-1) && cellY > 0) adj.push(this.cells[cellArr - (this.width-1)]);
    if (cellX > 0) adj.push(this.cells[cellArr - 1]);
    if (cellX < (this.width-1)) adj.push(this.cells[cellArr + 1]);
    if (cellX > 0 && cellY < (this.height-1)) adj.push(this.cells[cellArr + (this.width-1)]);
    if (cellY < (this.height-1)) adj.push(this.cells[cellArr + this.width]);
    if (cellX < (this.width-1) && cellY < (this.height-1)) adj.push(this.cells[cellArr + (this.width+1)]);

    return adj;
  }

  this.generate = function(cell) {
    this.allCovered = false;

    adj = this.getAdjacentCells(cell);
    cell.noMine = true;
    for (var i=0; i<adj.length; i++) {
      adj[i].noMine = true;
    }

    for (var i=0; i<this.numMines; i++) {
      var search = true;
      while (search) {
        var rand = floor(random(this.cells.length));
        if (!this.cells[rand].noMine) {
          this.cells[rand].hasMine = true;
          this.cells[rand].noMine = true;
          search = false;
        } else { /* redo */ }
      }
    }

    for (var i=0; i<this.cells.length; i++) {
      var adj = this.getAdjacentCells(this.cells[i]);
      var mineCount = 0;
      for (var j=0; j<adj.length; j++) {
        if (adj[j].hasMine) mineCount++;
      }
      this.cells[i].numMinesAdj = mineCount;
    }

    this.uncover(cell);
  }

  this.uncover = function(cell) {
    if (!cell.hasMine) {
      cell.covered = false;
      var adj = this.getAdjacentCells(cell);

      var mineCount = 0;
      for (var i=0; i<adj.length; i++) {
        if (adj[i].hasMine) mineCount++;
      }

      if (mineCount == 0) {
        // keep uncovering
        for (var i=0; i<adj.length; i++) {
          if (adj[i].covered) {
            this.uncover(adj[i]);
          }
        }
      }
    } else {
      this.lost = true;
    }
  }

  this.show = function() {
    for (var i=0; i<this.cells.length; i++) {
      this.cells[i].show();
    }

    if (this.lost) {
      textSize(100);
      stroke(255, 0, 0);
      fill(255, 0, 0);
      text("You Lost...", width/2, height/2);
    }
  }

  this.onClick = function() {
    var cell;
    for (var i=0; i<this.cells.length; i++) {
      if (this.cells[i].hoveringOver()) {
        cell = this.cells[i];
        i = this.cells.length + 1;
      }
    }

    if (cell != null) {
      if (this.allCovered) {
        this.generate(cell);
      } else {
        this.uncover(cell);
      }

      var adj = this.getAdjacentCells(cell);
      var mineCount = 0;
      for (var i=0; i<adj.length; i++) {
        if (adj[i].hasMine) mineCount++;
      }
      var flagCount = 0;
      for (var i=0; i<adj.length; i++) {
        if (adj[i].hasFlag) flagCount++;
      }
      if (mineCount > 0 && mineCount == flagCount) {
        for (var i=0; i<adj.length; i++) {
          if (!adj[i].hasFlag) {
            this.uncover(adj[i]);
          }
        }
      }
    }
  }

  this.checkWin = function() {
    var numCovered = 0;
    for (var i=0; i<this.cells.length; i++) {
      if (this.cells[i].covered) numCovered++;
    }

    if (numCovered == this.numMines && !this.lost) {
      textSize(100);
      stroke(255, 0, 0);
      fill(255, 0, 0);
      text("You Won!", width/2, height/2);
    }
  }

  this.onSpace = function() {
    var cell;
    for (var i=0; i<this.cells.length; i++) {
      if (this.cells[i].hoveringOver()) {
        cell = this.cells[i];
        i = this.cells.length + 1;
      }
    }

    if (cell != null && cell.covered) {
      cell.hasFlag = !cell.hasFlag;
    }
  }
}
