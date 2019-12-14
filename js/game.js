class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.nObstacles = 7;
    this.obstacles = [];
  }

  init() {
    this.createGameElements();
    this.drawGameElements();

    this.update();
  }

  update() {
    let past = 0;
    let delta = 0;

    function draw(elapsed) {
      delta = elapsed - past;
      past = elapsed;

      //update game window
      this.ctx.clearRect(0, 0, this.width, this.height);

      //draw and update game elements
      this.drawGameElements();
      this.updateGameElements(delta);

      this.drawFps(delta);

      window.requestAnimationFrame(draw.bind(this));
    }
    window.requestAnimationFrame(draw.bind(this));
  }

  isCollision() {
    return this.obstacles.some(
      obs =>
        this.player.posX + this.player.width > obs.posX &&
        obs.posX + obs.width > this.player.posX &&
        this.player.posY + this.player.height > obs.posY &&
        obs.posY + obs.height > this.player.posY
    );
  }

  createGameElements() {
    this.player = new Player(this.ctx);
    for (let i = 0; i < this.nObstacles; i++) {
      let h = 100 / this.nObstacles;
      this.obstacles.push(
        new Obstacle(this.ctx, h * (i + 1) + i * this.player.width)
      );
    }
  }

  drawGameElements() {
    this.ctx.save();
    this.player.draw();
    this.obstacles.forEach(e => e.draw());
    this.ctx.restore();
  }

  updateGameElements(delta) {
    this.player.update(delta);
  }

  drawFps(delta) {
    let fps = 1000 / delta;
    this.ctx.save();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
    this.ctx.restore();
  }

  /* 
  TODO
  gameOver() {}
  */
}
