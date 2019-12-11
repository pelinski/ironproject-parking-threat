class Obstacle {
  constructor(ctx, posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.width = 60;
    this.height = 100;
  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.restore();
  }
}
