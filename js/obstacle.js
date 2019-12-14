class Obstacle {
  constructor(ctx, posX = 200, posY = 200) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = 60;
    this.height = 100;
    this.color = "blue";
  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.restore();
  }
}
