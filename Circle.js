class Circle {
    constructor(_x, _y, _color) {
        this.x = _x;
        this.y = _y;
        this.r = 1;
        this.color = _color;
        this.growing = true;
    }

    grow() {
        if (this.growing) {
            this.r += 0.5;
        }
    }

    display() {
        noStroke();
        fill(this.color);
        strokeWeight(2);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    touchingScreenEdges() {
        if (this.x + this.r >= width ||
            this.x - this.r <= 0 ||
            this.y + this.r >= height ||
            this.y - this.r <= 0) {
            this.growing = false;
        }
    }
}