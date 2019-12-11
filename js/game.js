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
  }

  update() {
    let past = 0;
    let delta = 0;

    function draw(elapsed) {
      delta = elapsed - past;
      past = elapsed;
      let fps = 1000 / delta;
      this.ctx.clearRect(0, 0, 500, 500);

      /*

      // Update game objects
      gameObjects.forEach(function(object) {
        object.update(delta);
      });*/

      this.ctx.save();
      this.player.draw();
      console.log("update");
      this.ctx.restore();

      // Draw fps counter
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
      window.requestAnimationFrame(draw.bind(this));
    }
    window.requestAnimationFrame(draw.bind(this));
  }

  /* 
  TODO
  isCollision() {}
  gameOver() {}
  */
}
