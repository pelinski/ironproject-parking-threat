class Player extends Car {
  constructor(ctx, startPosX, startPosY, width, height) {
    super(
      ctx,
      (startPosX = 100),
      (startPosY = 100),
      (width = 100),
      (height = 150)
    );
    this.speed = 0; //px por segundo;
    this.rotationDir = 0;
    this.angle = 0;
    this.keyMap = {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39
    };
    this.setListeners();
  }

  update(delta) {
    this.posX += Math.sin(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.cos(this.rads()) * (this.speed / 1000) * delta;

    /*if (this.posX > 500) {
      this.posX = -100;
    }
    if (this.posY > 500) {
      this.posY = -100;
    }*/

    this.angle -= 1 * this.rotationDir;
  }

  setListeners() {
    document.addEventListener("keydown", this.eventHandler(1).bind(this));
    document.addEventListener("keyup", this.eventHandler(0).bind(this));
  }

  eventHandler(type) {
    return function(event) {
      event.preventDefault(); //prevent page from scrolling
      if (event.keyCode === this.keyMap.UP) {
        this.speed = -100 * type;
      } else if (event.keyCode === this.keyMap.DOWN) {
        this.speed = +100 * type;
      } else if (event.keyCode === this.keyMap.RIGHT) {
        this.rotationDir = 1 * type;
      } else if (event.keyCode === this.keyMap.LEFT) {
        this.rotationDir = -1 * type;
      }
    };
  }

  rads() {
    return (this.angle * 2 * Math.PI) / 360;
  }
}
