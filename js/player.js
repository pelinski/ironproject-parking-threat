class Player {
  constructor(ctx, startPosX = 100, startPosY = 100, color = "red") {
    this.ctx = ctx;
    this.width = 60;
    this.height = 100;
    this.color = color;
    this.posX = startPosX;
    this.posY = startPosY;
    this.speed = 0; //px por segundo;
    this.rotationDir = 0;
    this.angle = 0;
    this.keyMap = {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39
    };
    this.setListeners();
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(this.posX, this.posY);
    this.ctx.rotate(this.rads());
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.restore();
  }

  update(delta) {
    this.posX += Math.cos(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.sin(this.rads()) * (this.speed / 1000) * delta;

    /*if (this.posX > 500) {
      this.posX = -100;
    }
    if (this.posY > 500) {
      this.posY = -100;
    }*/

    this.angle -= 1 * this.rotationDir;
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === this.keyMap.UP) {
        this.posY += 1;
      } else if (e.keyCode === this.keyMap.DOWN) {
        this.posY -= 1;
      } else if (e.keyCode === this.keyMap.RIGHT) {
        this.rotationDir = 1;
      } else if (e.keyCode === this.keyMap.LEFT) {
        this.rotationDir = -1;
      }
    });
  }

  rads() {
    return (this.angle * 2 * Math.PI) / 360;
  }
}
