class WalkingObstacle {
  constructor(ctx, startPosX, startPosY, width = 40, height = 40) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.posX = startPosX;
    this.posY = startPosY;

    this.frames = 2;
    this.framesIndex = 0;

    this.speed = 10;

    this.image = this.chargeImage();
  }

  draw() {
    this.ctx.save();
    //this.ctx.translate(this.carCenter[0], this.carCenter[1]);
    //this.ctx.rotate(this.rads() + Math.PI / 2);
    this.ctx.drawImage(
      this.image[this.framesIndex],
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.restore();
  }

  move(delta) {
    this.posX += (this.speed / 1000) * delta;
  }

  animate(framesCounter) {
    if (framesCounter % 30 === 0) {
      this.framesIndex++;

      if (this.framesIndex > 1) this.framesIndex = 0;
    }
  }

  chargeImage() {
    let image = this.getRandomPersonImage();
    let image1 = new Image();
    let image2 = new Image();
    image1.src = image[0];
    image2.src = image[1];
    return [image1, image2];
  }

  getRandomPersonImage() {
    let color = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
    let hair = ["Black", "Blond", "Brown"];
    let src =
      "./images/parking-pack/PNG/Other/Person_" +
      color[this.getRandomInt(0, color.length - 1)] +
      hair[this.getRandomInt(0, hair.length - 1)];
    let src1 = src + "1.png";
    let src2 = src + "2.png";
    return [src1, src2];
  }

  getRandomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }
}
