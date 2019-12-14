class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.nObstacles = 4;
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
      let fps = 1000 / delta;
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.save();
      this.drawGameElements();
      this.ctx.restore();
      this.updateGameElements(delta);

      if (this.isCollision) console.log(this.isCollision());

      this.ctx.save();
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
      this.ctx.restore();

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
      this.obstacles.push(new Obstacle(this.ctx, 200 + i * 100));
    }
  }

  drawGameElements() {
    this.player.draw();
    this.obstacles.forEach(e => e.draw());
  }

  updateGameElements(delta) {
    this.player.update(delta);
  }

  /* 
  TODO
  isCollision() {}
  gameOver() {}
  */
}
