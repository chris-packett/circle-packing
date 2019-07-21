let circles;
let img;
let pixels;
const path = 'assets/image.jpeg';

function preload() {
    img = loadImage(path);
}

function setup() {
    createCanvas(398, 500);

    pixelDensity(1);
    img.loadPixels();

    circles = [];
}

function draw() {
    background(0);
    frameRate(60);

    let total = 15;
    let count = 0;
    let attempts = 0;

    while (count < total) {
        let newC = getNewCircle();

        if (newC !== null) {
            circles.push(newC);
            count++;
        }

        attempts++;

        if (attempts > 1000) {
            noLoop();
        }
    }

    circles.forEach(circle => {
        if (circle.growing) {
            if (circle.touchingScreenEdges()) {
                circle.growing = false;
            } else {
                circles.forEach(other => {
                    checkIfCircleTouchingOtherCircle(circle, other);
                });
            }
        }

        circle.display();
        circle.grow();
    });
}

function getNewCircle() {
    let withinOtherCircle = false;
    const x = random(0, img.width);
    const y = random(0, img.height);

    circles.forEach(circle => {
        withinOtherCircle = checkIfLocationWithinOtherCircle(x, y, circle);
    });

    if (!withinOtherCircle) {
        const color = getCircleColor(x, y);
        
        return new Circle(x, y, color(c));
    } else {
        return null;
    }
}

function checkIfLocationWithinOtherCircle(x, y, circle) {
    let within = false;

    const distance = dist(x, y, circle.x, circle.y);

    if (distance < circle.r) {
        within = true;
    }

    return within;
}

function checkIfCircleTouchingOtherCircle(circle, other) {
    if (circle !== other) {
        const actualDistance = dist(circle.x, circle.y, other.x, other.y);
        const buffer = 2;

        const validDistance = circle.r + other.r;

        if (actualDistance - buffer < validDistance) {
            circle.growing = false;
        }
    }
}

function getCircleColor(x, y) {
    const index = (int(x) + int(y) * img.width) * 4;

    const r = img.pixels[index];
    const g = img.pixels[index+1];
    const b = img.pixels[index+2];

    return color(r, g, b);
}