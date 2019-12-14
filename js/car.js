class Car {
  constructor(
    ctx,
    startPosX = 100,
    startPosY = 100,
    width = 100,
    height = 150
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.posX = startPosX;
    this.posY = startPosY;
    this.image = this.chargeImage();
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
    this.ctx.rotate(-this.rads());
    this.ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.ctx.restore();
  }

  // methods for graphics

  chargeImage() {
    let image = new Image();
    image.src = this.getRandomCarImage();
    return image;
  }

  getRandomCarImage() {
    let color = ["blue", "green", "orange", "purple", "red", "yellow"];
    let src =
      "./images/parking-pack/PNG/Cars/car" +
      this.getRandomInt(1, 7).toString() +
      "_" +
      color[this.getRandomInt(0, color.length - 1)] +
      ".png";
    console.log(src);
    return src;
  }

  getRandomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }
}
