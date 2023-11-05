/* TODO:

UI:
  1. Reset, start buttons.
  2. Gamemode selection.
  3. Modify viscosity, diffusion, dt, etc.

GAMEMODE 1:
  1. Add timestep for player
  2. Add display for GAME OVER and then reset the game and wait for start button
  3. Implement Jimmy's ML model if it works

GAMEMODE 2:
  1. Add 2 player functionality
  2. Add display for GAME OVER and then reset the game and have a start button
  3. Modify constructor for fluid

*/

// global variables for fluid logic
let N = 100;
let iter = 1;
let SCALE = 8;
let t = 0;
let speed = SCALE;

// modifiable variables
// we used 0.0000001 for viscosity

let viscosity = 0;
let dt = 0.5;
let playerColor = "white";

let gamemode = 2;
// for gamemode 1
let fluid, player;
//for gamemode 2;
let fluid1, fluid2;

function setup() {
  createCanvas(800, 800);
  frameRate(60);

  // ADD TIMESTEP FOR PLAYER

  if (gamemode == 1) {
    fluid = new Fluid(
      dt,
      0,
      viscosity,
      int((0.5 * width) / SCALE),
      int((0.5 * height) / SCALE)
    );
    player = new Player(0, 0, 2, playerColor);
  } else if (gamemode == 2) {
    fluid1 = new Fluid(dt, 0, viscosity, 1, 1);
    fluid2 = new Fluid(dt, 0, viscosity, width / SCALE - 2, height / SCALE - 2);
  }
}

function draw() {
  stroke(255);
  strokeWeight(2);
  if (gamemode == 1) {
    generateDye(fluid);

    player.draw();
    player.move();

    if (player.checkCollision(fluid)) {
      noLoop();
      reset();
      loop();
    }
  } else if (gamemode == 2) {
    generateDye(fluid1, fluid2);
    generateDye(fluid2, fluid1);

    if (keyIsPressed) {
      moveFluid(fluid1, fluid2);
    }
  }
}

// reset function for each gamemode
function reset() {
  if (gamemode == 1) {
    fluid = new Fluid(
      dt,
      0,
      viscosity,
      int((0.5 * width) / SCALE),
      int((0.5 * height) / SCALE)
    );
    player = new Player(0, 0, 2, playerColor);
  } else if (gamemode == 2) {
    fluid1 = new Fluid(dt, 0, viscosity, 1, 1);
    fluid2 = new Fluid(dt, 0, viscosity, width / SCALE - 2, height / SCALE - 2);
  }
}

//function to generate dye in fluid
function generateDye(fluid, otherFluid) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      fluid.resetDensity(fluid.cx + i, fluid.cy + j);
      fluid.addDensity(fluid.cx + i, fluid.cy + j, 255);
    }
  }

  for (let i = 0; i < 2; i++) {
    let angle = noise(t) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(0.2);
    t += 0.01;
    fluid.addVelocity(fluid.cx, fluid.cy, v.x, v.y);
  }

  fluid.step();
  if (gamemode == 1) {
    fluid.renderD();
  } else if (gamemode == 2) {
    fluid.renderD2(otherFluid);
  }
  fluid.fadeD();
}

function moveFluid(fluid1, fluid2) {
  // Moves for fluid 1
  // left
  if (keyIsDown(65) && fluid1.cx - 1 > 0) {
    fluid1.cx -= 1;
  }
  // right
  if (keyIsDown(68) && fluid1.cx + 2 < width / SCALE) {
    fluid1.cx += 1;
  }
  // up
  if (keyIsDown(87) && fluid1.cy - 1 > 0) {
    fluid1.cy -= 1;
  }
  // down
  if (keyIsDown(83) && fluid1.cy + 2 < height / SCALE) {
    fluid1.cy += 1;
  }

  // Moves for fluid 2
  // left
  if (keyIsDown(LEFT_ARROW) && fluid2.cx - 1 > 0) {
    fluid2.cx -= 1;
  }
  //right
  if (keyIsDown(RIGHT_ARROW) && fluid2.cx + 2 < width / SCALE) {
    fluid2.cx += 1;
  }
  //up
  if (keyIsDown(UP_ARROW) && fluid2.cy - 1 > 0) {
    fluid2.cy -= 1;
  }
  //down
  if (keyIsDown(DOWN_ARROW) && fluid2.cy + 2 < height / SCALE) {
    fluid2.cy += 1;
  }
}
