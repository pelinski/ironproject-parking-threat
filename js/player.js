class Player extends Car {
  constructor(
    ctx,
    startPosX = 650,
    startPosY = 200,
    width = 100,
    height = 150
  ) {
    super(ctx, startPosX, startPosY, width, height);
    this.carVertex = {
      A: [-this.width / 2, -this.height / 2],
      B: [this.width / 2, -this.height / 2],
      C: [this.width / 2, this.height / 2],
      D: [-this.width / 2, this.height / 2]
    };
    this.carVertexAbs = {
      A: [],
      B: [],
      C: [],
      D: []
    };
    this.carCenter = [this.posX + this.width / 2, this.posY + this.height / 2];
    this.speed = 0; //px por segundo;
    this.rotationDir = 0;
    this.angle = -90; // car facing up
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
      this.posX + this.width / 2,
      this.posY + this.height / 2,
      5,
      5
    ); //control vertices
    this.ctx.rect(this.carVertexAbs.A[1], this.carVertexAbs.A[0], 5, 5);
    this.ctx.stroke();
  }

  update(delta, obs) {
    if (
      this.carVertexAbs.A[0] > 50 &&
      this.carVertexAbs.A[0] < 300 &&
      this.carVertexAbs.A[1] < 100 + 150 &&
      this.carVertexAbs.A[0] > 100
    ) {
      console.error("in");
      this.posX -= 0.5 * Math.cos(this.rads()) * (this.speed / 1000) * delta;
      this.posY -= 0.5 * Math.sin(this.rads()) * (this.speed / 1000) * delta;
    } else {
      this.move(delta);
    }

    this.positions();
    // do not get out of the canvas

    /*if (this.posX > 500) {
      this.posX = -100;
    }
    if (this.posY > 500) {
      this.posY = -100;
    }*/

    this.angle -= 1 * this.rotationDir;

    //update center position
    this.carCenter[0] = this.posX + this.width / 2;
    this.carCenter[1] = this.posY + this.height / 2;
    this.positions();
  }

  move(delta) {
    this.posX += Math.cos(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.sin(this.rads()) * (this.speed / 1000) * delta;
  }

  positions() {
    //TODO : simplify this sintax

    this.carVertexAbs.A = this.sumVectors(this.carVertex.A, this.carCenter);
    this.carVertexAbs.B = this.sumVectors(this.carVertex.B, this.carCenter);
    this.carVertexAbs.C = this.sumVectors(this.carVertex.C, this.carCenter);
    this.carVertexAbs.D = this.sumVectors(this.carVertex.D, this.carCenter);

    /*
    
    console.log(this.vertexRot(this.carVertex.A));
    Object.keys(this.carVertex).forEach(
      e => (this.carVertex.e = this.vertexRot(this.carVertex.e))
    );
    Object.keys(this.carVertexAbs).forEach(
      e =>
        (this.carVertexAbs.e = this.sumVectors(
          this.carVertex.e,
          this.carCenter
        ))
    );*/

    /*
    this.carVertex.forEach(e => this.vertexRot(this.carVertex.e));
    this.carVertexAbs.forEach(e => this.sumVectors(this.carVertex.e, this.carCenter));
    */
  }

  rotateAbs(type) {
    if (type != 0) {
      this.carVertex.A = this.vertexRot(this.carVertex.A);
      this.carVertex.B = this.vertexRot(this.carVertex.B);
      this.carVertex.C = this.vertexRot(this.carVertex.C);
      this.carVertex.D = this.vertexRot(this.carVertex.D);
    }
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
        this.rotationDir = -1 * type;
        this.rotateAbs(type);
      } else if (event.keyCode === this.keyMap.LEFT) {
        this.rotationDir = 1 * type;
        this.rotateAbs(type);
      }
    };
  }

  rads() {
    return (this.angle * 2 * Math.PI) / 360;
  }

  vertexRot(A) {
    var rotationMatrix = new Array(2);
    rotationMatrix[0] = [Math.cos(this.rads()), -Math.sin(this.rads())];
    rotationMatrix[1] = [Math.sin(this.rads()), Math.cos(this.rads())];

    let At = [];

    At[0] = rotationMatrix[0][0] * A[0] + rotationMatrix[0][1] * A[1];
    At[1] = rotationMatrix[1][0] * A[0] + rotationMatrix[1][1] * A[1];


    At[1] = -At[1]; 

    return At;
  }

  sumVectors(a, b) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + b[i];
    }
    return c;
  }
}
