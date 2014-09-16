float[] lastValues;
float[] nextValues;

float h = 0.01;

float sigma = 10;
float r = 28;
float b = 8/3;

float scale = 10;

float value;
float speed;

boolean firstClick = false;

void setup() {
  size(800, 500, P2D);

  lastValues = new float[3];
  nextValues = new float[3];

  background(50);

  lastValues[0] = lastValues[1] = lastValues[2] = random(-10, 10);

  smooth();
  strokeWeight(1.5);
  colorMode(HSB);
}


void draw() { 
  if (!firstClick) {
    background(50);
    text("Click anywhere on the canvas", 20, height-20);
  } 
  else {
    speed = 0;

    value = sigma * (lastValues[1] - lastValues[0]);
    nextValues[0] = lastValues[0] + (h * value);
    speed += (value*value);

    value = (r * lastValues[0]) - lastValues[1] - (lastValues[0] * lastValues[2]);
    nextValues[1] = lastValues[1] + (h * value);
    speed += (value*value);

    value = (lastValues[0] * lastValues[1]) - (b * lastValues[2]);
    nextValues[2] = lastValues[2] + (h * value);
    speed += (value*value);


    stroke(map(speed, 0, 60000, 0, 120), 255, 255);
    fill(map(speed, 0, 60000, 0, 120), 255, 255);
    //  println(scale*lastPlaneValues[0] + 300);
    //  println(scale*lastPlaneValues[1] + 300);
    //  println("  ");

    //ellipse(scale*nextValues[0] + 400, scale*nextValues[2]-30, 1, 1);
    line(scale*lastValues[0] + 400, scale*lastValues[2] - 30, scale*nextValues[0] + 400, scale*nextValues[2] - 30);

    //  if (frameCount < 200) {
    //    colorMode(RGB);
    //    stroke(50, 5);
    //    fill(50, 5);
    //    rect(0, 0, width, height);
    //    colorMode(HSB);
    //  }

    for (int i = 0; i < 3; i++) {
      lastValues[i] = nextValues[i];
    }
  }
}

void mouseClicked() {
  lastValues[0] = (mouseX - 400)/scale;
  lastValues[1] = 0;
  lastValues[2] = (mouseY + 30)/scale;
  colorMode(RGB);
  background(50);
  colorMode(HSB);

  if (!firstClick) firstClick = true;
}

