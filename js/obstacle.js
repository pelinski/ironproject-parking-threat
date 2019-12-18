class Obstacle extends Car {
  constructor(ctx, startPosX, startPosY,rotate =0, width = 100, height = 150) {
    super(ctx, startPosX, startPosY, width, height);
    this.rotate = rotate;
  }

  //static, no update method
  draw() {
    this.ctx.save();
    this.ctx.translate(this.carCenter[0], this.carCenter[1]);
    if (this.rotate) {this.ctx.rotate(Math.PI);}
    this.ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}
