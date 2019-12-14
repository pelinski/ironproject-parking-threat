class Obstacle {

  constructor(
    ctx,
    startPosX = 200,
    startPosY = 200,
    width = 100,
    height = 150,
    color = "red"
  ) {
    this.ctx = ctx;
    this.posX = startPosX;
    this.posY = startPosY;
    this.width = width;
    this.height = height;
    this.color = color;

  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.restore();
  }
}
