class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player;
    this.gameStop = false;

    this.parkingPlace;

    this.numberOfCarObstacles = 5; //Ntot = 2n
    this.carObstacles = [];
    this.spaceBetweenCarObstacles = 100 / this.numberOfCarObstacles;
    this.parkingRowPositions = [50, 400];

    this.walkingObstacles = [];

    this.framesCounter = 0;
    //this.numberOfCollisions = 0;
  }

  init() {
    this.createGameElements();
    this.drawGameElements();

    this.update();
  }

  update() {
    let past = 0;
    let delta = 0;

    function draw(elapsed) {
      this.framesCounter++;
      delta = elapsed - past;
      past = elapsed;

      //update game window
      this.ctx.clearRect(0, 0, this.width, this.height);

      //draw and update game elements
      if (!this.gameStop) {
        this.clearWalkingObstacles();
        this.drawGameElements();
        this.updateGameElements(delta);
        this.drawFps(delta);
      }

      //check win status
      this.gameOver();
      this.win();
      if( this.gameOver() || this.win()) {
        this.gameStop = true;
      }
      if (this.win()) {
        console.error("you won");
      }

      window.requestAnimationFrame(draw.bind(this));
    }
    window.requestAnimationFrame(draw.bind(this));
  }

  createGameElements() {
    this.player = new Player(this.ctx);
    this.createParkedCars();
    this.generateWalkingObstacles();
  }

  drawGameElements() {
    this.ctx.save();
    this.player.draw();
    this.carObstacles.forEach(e => e.draw());
    this.walkingObstacles.forEach(e => e.draw());
    //this.drawControlPoints();
    this.ctx.restore();
  }

  updateGameElements(delta) {
    this.player.update(delta);
    if (this.walkingObstacles.length == 0) this.generateWalkingObstacles();
    this.walkingObstacles.forEach(e => e.animate(this.framesCounter));
    this.walkingObstacles.forEach(e => e.move(delta));
  }

  drawFps(delta) {
    let fps = 1000 / delta;
    this.ctx.save();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
    this.ctx.restore();
  }

  //obstacles

  createParkedCars() {
    let parkingPlaceIdx = this.getRandomInt(0, this.numberOfCarObstacles - 1);
    let parkingPlaceRow = Math.round(Math.random());

    for (let i = 0; i < this.numberOfCarObstacles; i++) {
      if (i != parkingPlaceIdx) {
        let rotate = Math.round(Math.random());
        this.carObstacles.push(
          new CarObstacle(
            this.ctx,
            this.spaceBetweenCarObstacles * (i + 1) + i * this.player.width,
            this.parkingRowPositions[0],
            rotate
          ),
          new CarObstacle(
            this.ctx,
            this.spaceBetweenCarObstacles * (i + 1) + i * this.player.width,
            this.parkingRowPositions[1],
            rotate
          )
        );
      }
    }

    if (parkingPlaceRow == 0) {
      let rotate = Math.round(Math.random());
      this.carObstacles.push(
        new CarObstacle(
          this.ctx,
          this.spaceBetweenCarObstacles * (parkingPlaceIdx + 1) +
            parkingPlaceIdx * this.player.width,
          this.parkingRowPositions[1],
          rotate
        )
      );
      this.parkingPlace = new parkingPlace(
        this.ctx,
        this.spaceBetweenCarObstacles +
          parkingPlaceIdx * (this.player.width + this.spaceBetweenCarObstacles),
        this.parkingRowPositions[0],
        this.player.width,
        this.player.height
      );
    } else if (parkingPlaceRow == 1) {
      let rotate = Math.round(Math.random());
      this.carObstacles.push(
        new CarObstacle(
          this.ctx,
          this.spaceBetweenCarObstacles * (parkingPlaceIdx + 1) +
            parkingPlaceIdx * this.player.width,
          this.parkingRowPositions[0],
          rotate
        )
      );
      this.parkingPlace = new parkingPlace(
        this.ctx,
        this.spaceBetweenCarObstacles +
          parkingPlaceIdx * (this.player.width + this.spaceBetweenCarObstacles),
        this.parkingRowPositions[1],
        this.player.width,
        this.player.height
      );
    }
  }

  generateWalkingObstacles() {
    this.walkingObstacles.push(new WalkingObstacle(this.ctx, 15, 350));
  }

  clearWalkingObstacles() {
    this.walkingObstacles = this.walkingObstacles.filter(wo => wo.posX >= 0);
  }

  //maths

  getRandomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }

  //game methods

  isCollision() {
    return (
      this.carObstacles.some(
        function(obs) {
          return (
            //why is <for keys in object> not working
            (this.player.carPoints.A[0] > obs.posX &&
              this.player.carPoints.A[0] < obs.posX + obs.width - 15 &&
              this.player.carPoints.A[1] > obs.posY &&
              this.player.carPoints.A[1] < obs.posY + obs.height - 15) ||
            (this.player.carPoints.B[0] > obs.posX &&
              this.player.carPoints.B[0] < obs.posX + obs.width - 15 &&
              this.player.carPoints.B[1] > obs.posY &&
              this.player.carPoints.B[1] < obs.posY + obs.height - 15) ||
            (this.player.carPoints.C[0] > obs.posX &&
              this.player.carPoints.C[0] < obs.posX + obs.width - 15 &&
              this.player.carPoints.C[1] > obs.posY &&
              this.player.carPoints.C[1] < obs.posY + obs.height - 15) ||
            (this.player.carPoints.D[0] > obs.posX &&
              this.player.carPoints.D[0] < obs.posX + obs.width - 15 &&
              this.player.carPoints.D[1] > obs.posY &&
              this.player.carPoints.D[1] < obs.posY + obs.height - 15)
          );
        }.bind(this)
      ) ||
      this.walkingObstacles.some(
        function(obs) {
          return (
            //why is <for keys in object> not working
            (this.player.carPoints.A[0] > obs.posX &&
              this.player.carPoints.A[0] < obs.posX + obs.width &&
              this.player.carPoints.A[1] > obs.posY &&
              this.player.carPoints.A[1] < obs.posY + obs.height) ||
            (this.player.carPoints.B[0] > obs.posX &&
              this.player.carPoints.B[0] < obs.posX + obs.width &&
              this.player.carPoints.B[1] > obs.posY &&
              this.player.carPoints.B[1] < obs.posY + obs.height) ||
            (this.player.carPoints.C[0] > obs.posX &&
              this.player.carPoints.C[0] < obs.posX + obs.width &&
              this.player.carPoints.C[1] > obs.posY &&
              this.player.carPoints.C[1] < obs.posY + obs.height) ||
            (this.player.carPoints.D[0] > obs.posX &&
              this.player.carPoints.D[0] < obs.posX + obs.width &&
              this.player.carPoints.D[1] > obs.posY &&
              this.player.carPoints.D[1] < obs.posY + obs.height)
          );
        }.bind(this)
      )
    );
  }

  gameOver() {
    if (this.isCollision()) {
      console.error("gameover");
      let image = new Image();
      image.src = "./images/game-over.png";
      this.ctx.drawImage(image, 0, 0);
      return true;
    }
  }

  win() {
    let isPlayerAtParkingPlace = (
      //why is <for keys in object> not working
      this.player.carPoints.A[0] > this.parkingPlace.posX - 10 &&
      this.player.carPoints.A[0] <
        this.parkingPlace.posX + this.parkingPlace.width + 20 &&
      this.player.carPoints.A[1] > this.parkingPlace.posY + 10 &&
      this.player.carPoints.A[1] <
        this.parkingPlace.posY + this.parkingPlace.height + 20 &&
      this.player.carPoints.B[0] > this.parkingPlace.posX - 10 &&
      this.player.carPoints.B[0] <
        this.parkingPlace.posX + this.parkingPlace.width + 20 &&
      this.player.carPoints.B[1] > this.parkingPlace.posY + 10 &&
      this.player.carPoints.B[1] <
        this.parkingPlace.posY + this.parkingPlace.height + 20 &&
      this.player.carPoints.C[0] > this.parkingPlace.posX - 10 &&
      this.player.carPoints.C[0] <
        this.parkingPlace.posX + this.parkingPlace.width + 20 &&
      this.player.carPoints.C[1] > this.parkingPlace.posY + 10 &&
      this.player.carPoints.C[1] <
        this.parkingPlace.posY + this.parkingPlace.height + 20 &&
      this.player.carPoints.D[0] > this.parkingPlace.posX - 10 &&
      this.player.carPoints.D[0] <
        this.parkingPlace.posX + this.parkingPlace.width + 20 &&
      this.player.carPoints.D[1] > this.parkingPlace.posY + 10 &&
      this.player.carPoints.D[1] <
        this.parkingPlace.posY + this.parkingPlace.height + 20
    );

    if (isPlayerAtParkingPlace) {
      let image = new Image();
      image.src = "./images/win.png";
      this.ctx.drawImage(image, 0, 0);

    }
    

    return isPlayerAtParkingPlace;
  }

  //debug
  drawControlPoints() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.parkingPlace.posX - 20,
      this.parkingPlace.posY - 10,
      2,
      2
    );
    this.ctx.rect(
      this.parkingPlace.posX - 20,
      this.parkingPlace.posY + this.parkingPlace.height + 10,
      2,
      2
    );
    this.ctx.rect(
      this.parkingPlace.posX + this.parkingPlace.width + 20,
      this.parkingPlace.posY - 10,
      2,
      2
    );
    this.ctx.rect(
      this.parkingPlace.posX + this.parkingPlace.width + 20,
      this.parkingPlace.posY + this.parkingPlace.height + 10,
      2,
      2
    );

    this.ctx.stroke();

    this.carObstacles.forEach(
      function(e) {
        this.ctx.beginPath();
        this.ctx.rect(e.posX, e.posY, 10, 10);
        this.ctx.rect(e.posX, e.posY + e.height - 15, 10, 10);
        this.ctx.rect(e.posX + e.width - 15, e.posY, 10, 10);
        this.ctx.rect(e.posX + e.width - 15, e.posY + e.height - 15, 10, 10);
        this.ctx.stroke();
      }.bind(this)
    );
  }
}
