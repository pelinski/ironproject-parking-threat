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

    

    this.carPointsRelative = { // -20 is a correction for image border
      A: [-this.width / 2, -(this.height-20) / 2], 
      B: [this.width / 2, -(this.height-20) / 2],
      C: [this.width / 2, (this.height-20) / 2],
      D: [-this.width / 2, (this.height-20) / 2]
    };

    this.carPoints = {
      A: [],
      B: [],
      C: [],
      D: []
    };

    this.carPointsAng = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
    };

   

    this.carCenter = [
      this.startPosX + this.width / 2,
      this.startPosY + this.height / 2
    ];

    this.carAngle = -90; // car facing -y axis

    this.speed = 0; //px por segundo;
    this.rotationDir = 0; // changes to -1,1 when LEFT or RIGHT is pressed

    this.keyMap = {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39
    };


    //init
    this.setListeners();
    this.getCarPoints();
    this.getCarPointsAng();
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
    this.ctx.rect(this.carCenter[0], this.carCenter[1], 5, 5);
    this.ctx.rect(this.carPoints.B[0], this.carPoints.B[1], 5, 5);
    this.ctx.rect(this.carPoints.A[0], this.carPoints.A[1], 5, 5);
    this.ctx.rect(this.carPoints.C[0], this.carPoints.C[1], 5, 5);
    this.ctx.rect(this.carPoints.D[0], this.carPoints.D[1], 5, 5);
    this.ctx.stroke();
  }

  update(delta, obs) {
    this.move(delta);

    this.carAngle += 1 * this.rotationDir; //rotationDir is 0 when no key is pressed

    //update center position
    this.carCenter[0] = this.posX + this.width / 2;
    this.carCenter[1] = this.posY + this.height / 2;

    this.updateCarPoints();
  }

  move(delta) {
    this.posX += Math.cos(this.rads()) * (this.speed / 1000) * delta;
    this.posY += Math.sin(this.rads()) * (this.speed / 1000) * delta;

    for (const point in this.carPoints) {
      this.carPoints[point][0] +=
        Math.cos(this.rads()) * (this.speed / 1000) * delta;
      this.carPoints[point][1] +=
        Math.sin(this.rads()) * (this.speed / 1000) * delta;
    }
  }

  //positions init;

  getCarPoints() {
    for (const point in this.carPoints) {
      this.carPoints[point] = [
        this.carCenter[0] + this.carPointsRelative[point][0],
        this.carCenter[1] + this.carPointsRelative[point][1]
      ];
    }
  }

  getCarPointsAng() {
    for (const point in this.carPointsAng) {
      this.carPointsAng[point] = Math.atan(
        this.carPointsRelative[point][1] / this.carPointsRelative[point][0]
      );
    }
  }


  //update point positions

  updateCarPoints(){
    let angle = (Math.PI * this.rotationDir) / 180;
    var rotationMatrix = new Array(2);
    rotationMatrix[0] = [Math.cos(angle), -Math.sin(angle)];
    rotationMatrix[1] = [Math.sin(angle), Math.cos(angle)];

    let auxRel = [];
    let T = [];

    for(const point in this.carPoints) {

      //get relative position to center of car
      auxRel[0] = this.carPoints[point][0] - this.carCenter[0];
      auxRel[1] = this.carPoints[point][1] - this.carCenter[1];

      //rotate point over car center
      T[0] = rotationMatrix[0][0] * auxRel[0] + rotationMatrix[0][1] * auxRel[1];
      T[1] = rotationMatrix[1][0] * auxRel[0] + rotationMatrix[1][1] * auxRel[1];

      //update position
      this.carPoints[point][0] = T[0] + this.carCenter[0];
      this.carPoints[point][1] = T[1] + this.carCenter[1];
    }
  }


  //events

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

  //maths

  rads() {
    return (this.carAngle * 2 * Math.PI) / 360;
  }

  sumVectors(a, b, type = 1) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + type * b[i];
    }
    return c;
  }
}
