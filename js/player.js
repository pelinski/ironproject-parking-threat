class Player extends Car {
  constructor(
    ctx,
    startPosX = 650,
    startPosY = 200,
    width = 100,
    height = 150
  ) {
    super(ctx, startPosX, startPosY, width, height);
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

  update(delta, obs) {
    if ( 
      //there is a collision
      obs.some(
        function(obs) {
          return (
            this.posX + this.width > obs.posX &&
            obs.posX + obs.width > this.posX &&
            this.posY + this.height > obs.posY &&
            obs.posY + obs.height > this.posY
          );
        }.bind(this)
      )
    ) {
      this.posX -= Math.sin(this.rads()) * (this.speed / 1000) * delta;
      this.posY -= Math.cos(this.rads()) * (this.speed / 1000) * delta;
    } else {
      this.move(delta);
    }

    /*if (this.posX > 500) {
      this.posX = -100;
    }
    if (this.posY > 500) {
      this.posY = -100;
    }*/

    this.angle -= 1 * this.rotationDir;
  }

  move(delta) {
    this.posX += Math.sin(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.cos(this.rads()) * (this.speed / 1000) * delta;
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
