class Obstacle extends Car {
  constructor(ctx, startPosX, startPosY, width = 100, height = 150) {
    super(ctx, startPosX, startPosY, width, height);
  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}
