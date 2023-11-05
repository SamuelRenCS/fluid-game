// function to use 1D array and fake the extra two dimensions --> 3D
function IX(x, y) {
  return x + y * N;
}

// Fluid cube class
class Fluid {
  constructor(dt, diffusion, viscosity, cx, cy, color) {
    this.size = N;
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;
    this.cx = cx;
    this.cy = cy;
    this.color = color;

    this.s = new Array(N * N).fill(0);
    this.density = new Array(N * N).fill(0);

    this.Vx = new Array(N * N).fill(0);
    this.Vy = new Array(N * N).fill(0);

    this.Vx0 = new Array(N * N).fill(0);
    this.Vy0 = new Array(N * N).fill(0);
    this.health = 100;
  }

  // step method
  step() {
    let N = this.size;
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    let Vx = this.Vx;
    let Vy = this.Vy;
    let Vx0 = this.Vx0;
    let Vy0 = this.Vy0;
    let s = this.s;
    let density = this.density;

    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);

    project(Vx0, Vy0, Vx, Vy);

    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);

    project(Vx, Vy, Vx0, Vy0);
    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);

    this.fadeD();
  }

  // method to add density
  addDensity(x, y, amount) {
    let index = IX(x, y);
    this.density[index] += amount;
  }

  resetDensity(x, y) {
    let index = IX(x, y);
    this.density[index] = 0;
  }

  // method to add velocity
  addVelocity(x, y, amountX, amountY) {
    let index = IX(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }

  // function to render density
  renderD() {
    colorMode(RGB, 255);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * SCALE;
        let y = j * SCALE;
        let d = this.density[IX(i, j)];
        fill(0, 0, d % 256);
        noStroke();
        square(x, y, SCALE);
      }
    }
  }

  // function to render density in gamemode 1
  renderD2(otherFluid) {
    colorMode(RGB, 255);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * SCALE;
        let y = j * SCALE;
        let d1 = this.density[IX(i, j)];
        let d2 = otherFluid.density[IX(i, j)];

        if (this.color === "blue") {
          fill(d2 % 256, 0, d1 % 256);
          red[IX(i, j)] = d2 % 256;
          blue[IX(i, j)] = d1 % 256;
        } else if (this.color === "red") {
          fill(d1 % 256, 0, d2 % 256);
          red[IX(i, j)] = d1 % 256;
          blue[IX(i, j)] = d2 % 256;
        }
        noStroke();
        square(x, y, SCALE);

        // compute average velocity for dye collision
        let vxAvg = (this.Vx[IX(i, j)] + otherFluid.Vx[IX(i, j)]) / 2;
        let vyAvg = (this.Vy[IX(i, j)] + otherFluid.Vy[IX(i, j)]) / 2;
        this.Vx[IX(i, j)] = vxAvg;
        this.Vy[IX(i, j)] = vyAvg;
        otherFluid.Vx[IX(i, j)] = vxAvg;
        otherFluid.Vy[IX(i, j)] = vyAvg;
      }
    }
  }

  fadeD() {
    for (let i = 0; i < this.density.length; i++) {
      this.density[i] = Math.max(this.density[i] - 0.1, 0);
    }
  }

  damage() {
    if (this.color === "blue") {
      this.health = Math.max(this.health - red[IX(this.cx, this.cy)] * 0.01, 0);
      updateHealth(this.health, "blue");
    } else if (this.color === "red") {
      this.health = Math.max(this.health - blue[IX(this.cx, this.cy)] * 0.01, 0);
      updateHealth(this.health, "red");
    }

    console.log(this.color + " " + this.health);
  }
}
