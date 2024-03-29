class Car {
  constructor(ctx, startPosX, startPosY, width = 100, height = 150) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.posX = startPosX;
    this.posY = startPosY;
    this.carCenter = [
      this.posX + this.width / 2,
      this.posY + this.height / 2
    ];
    this.image = this.chargeImage();
  }

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
    return src;
  }

  getRandomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }
}
