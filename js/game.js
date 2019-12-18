class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player;
    this.parkingPlace;
    this.numberOfObstacles = 5; //Ntot = 2n
    this.obstacles = [];
    this.spaceBetweenObstacles = 100 / this.numberOfObstacles;
    this.parkingRowPositions = [100, 600];
    this.numberOfCollisions=0;
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
      delta = elapsed - past;
      past = elapsed;

      //update game window
      this.ctx.clearRect(0, 0, this.width, this.height);

      //draw and update game elements
      this.drawGameElements();
      this.updateGameElements(delta, this.obstacles);
      this.drawFps(delta);

      //check game Over
      this.gameOver();
    

      window.requestAnimationFrame(draw.bind(this));
    }
    window.requestAnimationFrame(draw.bind(this));
  }

  isCollision() {
    if (this.obstacles.some(
      obs =>
        this.player.posX + this.player.width > obs.posX &&
        obs.posX + obs.width > this.player.posX &&
        this.player.posY + this.player.height > obs.posY &&
        obs.posY + obs.height > this.player.posY
    )) {
      //this.numberOfCollisions++;
      console.error("collision")
    }

  }


  createGameElements() {
    this.player = new Player(this.ctx);
    this.createParkedCars();
  }

  drawGameElements() {
    this.ctx.save();
    this.player.draw();
    this.obstacles.forEach(e => e.draw());
    this.ctx.restore();
  }

  updateGameElements(delta,obstacles) {
    this.player.update(delta,obstacles);
  }

  drawFps(delta) {
    let fps = 1000 / delta;
    this.ctx.save();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("FPS: " + Math.round(fps), 10, 20);
    this.ctx.restore();
  }

  createParkedCars() {
    let parkingPlaceIdx = this.getRandomInt(0, this.numberOfObstacles - 1);
    let parkingPlaceRow = Math.round(Math.random());

    for (let i = 0; i < this.numberOfObstacles; i++) {
      if (i != parkingPlaceIdx) {
        this.obstacles.push(
          new Obstacle(
            this.ctx,
            this.spaceBetweenObstacles * (i + 1) + i * this.player.width,
            this.parkingRowPositions[0]
          ),
          new Obstacle(
            this.ctx,
            this.spaceBetweenObstacles * (i + 1) + i * this.player.width,
            this.parkingRowPositions[1]
          )
        );
      }
    }

    if (parkingPlaceRow == 0) {
      this.obstacles.push(
        new Obstacle(
          this.ctx,
          this.spaceBetweenObstacles * (parkingPlaceIdx + 1) +
            parkingPlaceIdx * this.player.width,
          this.parkingRowPositions[1]
        )
      );
      this.parkingPlace = new parkingPlace(
        this.ctx,
        parkingPlaceIdx * this.player.width,
        this.parkingRowPositions[0],
        this.player.width,
        this.player.height
      );
    } else if (parkingPlaceRow == 1) {
      this.obstacles.push(
        new Obstacle(
          this.ctx,
          this.spaceBetweenObstacles * (parkingPlaceIdx + 1) +
            parkingPlaceIdx * this.player.width,
          this.parkingRowPositions[0]
        )
      );
      this.parkingPlace = new parkingPlace(
        this.ctx,
        parkingPlaceIdx * this.player.width,
        this.parkingRowPositions[1],
        this.player.width,
        this.player.height
      );
    }
  }

  getRandomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }

  gameOver() {
    this.isCollision();
    
    if (this.numberOfCollisions == 3) {
      console.error("Game Over");
      return true;
    }
  }
}
