class Player {
  constructor(ctx, startPosX = 200, startPosY = 200, color = "red") {
    this.ctx = ctx;
    this.width = 60;
    this.height = 100;
    this.color = color;
    this.posX = startPosX;
    this.posY = startPosY;
    this.speed = 100; //px por segundo;
    this.angle = 45;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
