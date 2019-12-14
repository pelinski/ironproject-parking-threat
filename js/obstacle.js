class Obstacle extends Car {
  constructor(ctx, startPosX, startPosY, width, height) {
    super(ctx, startPosX, startPosY, width, height);
  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.drawImage(
      this.image,
      this.width,
      this.height,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}
