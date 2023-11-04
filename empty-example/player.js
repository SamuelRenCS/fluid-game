
class Player {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = size;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    // move
    move() {
        if (keyIsDown(LEFT_ARROW) && this.x - this.size / 2 > 0) {
            this.x -= this.speed;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x + this.size < width) {
            this.x += this.speed;
        }
        if (keyIsDown(UP_ARROW) && this.y > 0) {
            this.y -= this.speed;
        }
        if (keyIsDown(DOWN_ARROW) && this.y < height - this.size) {
            this.y += this.speed;
        }
    }
}

