let fluid, player;
let cx, cy;
let gamemode = 1;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  fluid = new Fluid(0.1, 0, 0.0000001);
  player = new Player(0, 0, 1, "red");
  cx = int((0.5 * width) / SCALE);
  cy = int((0.5 * height) / SCALE);

}

function draw() {
  if (gamemode == 1) {
    stroke(100);
    strokeWeight(2);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        fluid.resetDensity(cx + i, cy + j);
        fluid.addDensity(cx + i, cy + j, 255);
      }
    }

    for (let i = 0; i < 2; i++) {
      let angle = noise(t) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.mult(0.2);
      t += 0.01;
      fluid.addVelocity(cx, cy, v.x, v.y);
    }
    fluid.step();
    fluid.renderD();
    player.draw();
    player.move();
    fluid.fadeD();
    // player.checkCollision();
  } else if (gamemode == 2) {
    
    // logic here for 2 player tron


    moveFluid();
  }
}

function moveFluid() {
  // left
  if (keyIsDown(65) && cx - 1 > 0) {
    cx -= 1;
  }
  // right
  if (keyIsDown(68) && cx + 2 < width / SCALE) {
    cx += 1;
  }
  // up 
  if (keyIsDown(87) && cy - 1 > 0) {
    cy -= 1;
  }
  // down 
  if (keyIsDown(83) && cy + 2 < height / SCALE) {
    cy += 1;
  }
}
