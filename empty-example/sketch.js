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
let t2 = 1000;
let speed = SCALE;

// color arrays
let red = new Array(N * N).fill(0);
let blue = new Array(N * N).fill(0);

// modifiable variables
// we used 0.0000001 for viscosity

let viscosity = 0.0000001;
let dt = 0.5;
let playerColor = "white";

// for gamemode 1
let fluid, player;
//for gamemode 1;
let fluid1, fluid2;
let color1 = "red";
let color2 = "blue";
//for gamemode 2
let fluid3, fluid4;

function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");
  frameRate(60);

  // ADD TIMESTEP FOR PLAYER

  if (gamemode == 0) {
    fluid = new Fluid(
      dt - 0.2,
      0,
      viscosity,
      int((0.5 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t
    );
    player = new Player(0, 0, 2, playerColor);
  } else if (gamemode == 1) {
    fluid1 = new Fluid(dt, 0, viscosity, 1, 1, color1, t);
    fluid2 = new Fluid(
      dt,
      0,
      viscosity,
      width / SCALE - 2,
      height / SCALE - 2,
      color2,
      t2
    );
  } else if (gamemode == 2) {
    fluid3 = new Fluid(
      dt,
      0,
      viscosity,
      int((0.25 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t
    );

    fluid4 = new Fluid(
      dt,
      0,
      viscosity,
      int((0.75 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t2
    );
  }
}

function draw() {
  background(0);
  if (gamemodeSelected) {
    stroke(255);
    strokeWeight(2);

    if (gamemode == 0) {
      generateDye(fluid);

      player.draw();
      player.move();

      if (player.checkCollision(fluid)) {
        noLoop();
        reset();
        loop();
      }
    } else if (gamemode == 1) {
      generateDye(fluid1, fluid2);
      generateDye(fluid2, fluid1);
      if (keyIsPressed) {
        moveFluid(fluid2, fluid1);
      }
    } else if (gamemode == 2) {
      generateDye(fluid3, fluid4);
      generateDye(fluid4, fluid3);
      if (keyIsPressed) {
        moveFluid(fluid4, fluid3);
      }
    }
  }
}

// reset function for each gamemode
function reset() {
  if (gamemode == 0) {
    fluid.reset(
      dt - 0.4,
      0,
      viscosity,
      int((0.5 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t
    );
    player.resetPlayer(0, 0, 2, playerColor);
  } else if (gamemode == 1) {
    fluid1.reset(dt, 0, viscosity, 1, 1, color1, t);
    fluid2.reset(
      dt,
      0,
      viscosity,
      width / SCALE - 2,
      height / SCALE - 2,
      color2,
      t2
    );

    // reset color arrays
    red.fill(0);
    blue.fill(0);
  } else if (gamemode == 2) {
    fluid3.reset(
      dt,
      0,
      viscosity,
      int((0.5 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t
    );

    fluid4.reset(
      dt,
      0,
      viscosity,
      int((0.75 * width) / SCALE),
      int((0.5 * height) / SCALE),
      "blue",
      t2
    );
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
    let angle = noise(fluid.t) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(0.2);
    fluid.t += 0.01;
    fluid.addVelocity(fluid.cx, fluid.cy, v.x, v.y);
    fluid.t += 0.01;
  }

  fluid.step();
  if (gamemode == 0) {
    fluid.renderD();
  } else if (gamemode == 1) {
    fluid.renderD2(otherFluid);
    fluid.damage();
  } else if (gamemode == 2) {
    fluid.renderDPaint(otherFluid);
  }
  fluid.fadeD();
}

// function to move fluid in gamemode 2

function moveFluid(fluid1, fluid2 = null) {
  // Moves for fluid 1
  // left
  if (keyIsDown(LEFT_ARROW) && fluid1.cx - 1 > 0) {
    fluid1.cx -= 1;
  }
  //right
  if (keyIsDown(RIGHT_ARROW) && fluid1.cx + 2 < width / SCALE) {
    fluid1.cx += 1;
  }
  //up
  if (keyIsDown(UP_ARROW) && fluid1.cy - 1 > 0) {
    fluid1.cy -= 1;
  }
  //down
  if (keyIsDown(DOWN_ARROW) && fluid1.cy + 2 < height / SCALE) {
    fluid1.cy += 1;
  }

  if (fluid2 != null) {
    // Moves for fluid 2
    // left
    if (keyIsDown(65) && fluid2.cx - 1 > 0) {
      fluid2.cx -= 1;
    }
    // right
    if (keyIsDown(68) && fluid2.cx + 2 < width / SCALE) {
      fluid2.cx += 1;
    }
    // up
    if (keyIsDown(87) && fluid2.cy - 1 > 0) {
      fluid2.cy -= 1;
    }
    // down
    if (keyIsDown(83) && fluid2.cy + 2 < height / SCALE) {
      fluid2.cy += 1;
    }
  }
}
