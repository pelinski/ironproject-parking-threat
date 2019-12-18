class Player extends Car {
  constructor(
    ctx,
    startPosX = 650,
    startPosY = 200,
    width = 100,
    height = 150
  ) {
    super(ctx, startPosX, startPosY, width, height);
    this.startPosX = 650;
    this.startPosY = 200;
    this.carVertex = {
      A: [-this.width / 2, -this.height / 2],
      B: [this.width / 2, -this.height / 2],
      C: [this.width / 2, this.height / 2],
      D: [-this.width / 2, this.height / 2]
    };
    this.carVertexAbs = {
      A: [startPosX, startPosY],
      B: [],
      C: [],
      D: []
    };

    this.carCenter = [
      this.startPosX + this.width / 2,
      this.startPosY + this.height / 2
    ];
    this.angC0 = Math.atan(this.height / this.width);
    this.angC = Math.atan(this.height / this.width);
    this.posC = [
      this.carCenter[0] + this.width / 2,
      this.carCenter[1] + this.height / 2
    ];

    this.carCenter = [this.posX + this.width / 2, this.posY + this.height / 2];
    this.speed = 0; //px por segundo;
    this.rotationDir = 0; // changes to -1,1 when LEFT or RIGHT is pressed
    this.angle = -90; // car facing -y axis
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
    this.ctx.translate(this.carCenter[0], this.carCenter[1]);
    this.ctx.rotate(this.rads() + Math.PI / 2);
    this.ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.ctx.restore();
    this.ctx.beginPath();
    this.ctx.rect(
      //center
      this.carCenter[0],
      this.carCenter[1],
      5,
      5
    ); //control vertices
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.rect(this.posC[0], this.posC[1], 5, 5);
    this.ctx.stroke();
  }

  update(delta, obs) {
    this.move(delta);

    this.angle += 1 * this.rotationDir; //rotationDir is 0 when no key is pressed
    this.angC += (Math.PI / 180) * this.rotationDir;
    

    //update center position
    this.carCenter[0] = this.posX + this.width / 2;
    this.carCenter[1] = this.posY + this.height / 2;

    
    this.updateVertexAbs();
  }

  move(delta) {
    this.posX += Math.cos(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.sin(this.rads()) * (this.speed / 1000) * delta;
    this.posC[0] += Math.cos(this.rads()) * (this.speed / 1000) * delta;
    this.posC[1] += Math.sin(this.rads()) * (this.speed / 1000) * delta;
  }

  updateVertexAbs() {
    let angle = (Math.PI * this.rotationDir) / 180;
    let aux = [];
    aux[0] = this.posC[0] - this.carCenter[0];
    aux[1] = this.posC[1] - this.carCenter[1];

    //angle in rad
    var rotationMatrix = new Array(2);
    rotationMatrix[0] = [Math.cos(angle), -Math.sin(angle)];
    rotationMatrix[1] = [Math.sin(angle), Math.cos(angle)];

    let At = [];

    At[0] = rotationMatrix[0][0] * aux[0] + rotationMatrix[0][1] * aux[1];
    At[1] = rotationMatrix[1][0] * aux[0] + rotationMatrix[1][1] * aux[1];

    this.posC[0] = At[0] + this.carCenter[0];
    this.posC[1] = At[1] + this.carCenter[1];
  }

  setListeners() {
    document.addEventListener("keydown", this.eventHandler(1).bind(this));
    document.addEventListener("keyup", this.eventHandler(0).bind(this));
  }

  eventHandler(type) {
    return function(event) {
      event.preventDefault(); //prevent page from scrolling
      if (event.keyCode === this.keyMap.UP) {
        this.speed = 100 * type;
      } else if (event.keyCode === this.keyMap.DOWN) {
        this.speed = -100 * type;
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

  sumVectors(a, b, type = 1) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + type * b[i];
    }
    return c;
  }
}
