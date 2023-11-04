let fluid, player;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  fluid = new Fluid(0.1, 0, 0.0000001);
  player = new Player(0, 0, 20, "red");
}

function draw() {
  stroke(100);
  strokeWeight(2);

  let cx = int((0.5 * width) / SCALE);
  let cy = int((0.5 * height) / SCALE);
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
}
