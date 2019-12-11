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
    this.update();
    this.startLevel();
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
      this.player.draw();
      this.ctx.restore();
      this.player.update(delta);

      this.ctx.save();
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
      this.ctx.restore();
      window.requestAnimationFrame(draw.bind(this));
    }
    window.requestAnimationFrame(draw.bind(this));
  }

  //create array with obstacles

  startLevel() {
    let nObstacles = 8;
    let obstaclesArray = [];
    for (let i = 0; i < nObstacles; i++) {
      obstaclesArray.push(new Obstacle());
    }
    console.log(obstaclesArray);
  }

  /* 
  TODO
  isCollision() {}
  gameOver() {}
  */
}
