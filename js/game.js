class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  init() {
    this.player = new Player(this.ctx);
    this.player.draw();
  }

  /* 
  TODO
  isCollision() {}
  gameOver() {}
  */
}
