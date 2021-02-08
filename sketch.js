var balloon, balloonAnimation;
var bg;
var database;
var position;

function preload() {
  bg = loadImage("Hot Air Ballon-01.png");
  balloonAnimation = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();

  createCanvas(displayWidth,displayHeight);
  balloon = createSprite(displayWidth/2, displayHeight/2, 50, 50);
  balloon.addAnimation("balloon_colorChange", balloonAnimation);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readHeight, showError);
}

function draw() {
  background(bg);

  if (keyDown("LEFT_ARROW")) {
    updateHeight(-10,0);
  }
  else if (keyDown("RIGHT_ARROW")) {
    updateHeight(+10,0);
  } 
  else if (keyDown("UP_ARROW")) {
    updateHeight(0,-10);
    balloon.scale -= 0.01;
  }
  else if (keyDown("DOWN_ARROW")) {
    updateHeight(0,+10);
    balloon.scale += 0.01;
  }
  
  drawSprites();

  textSize(32);
  fill(255,0,0);
  stroke(0);
  text("**Use arrow keys to move Hot Air Balloon", 80,50);
}

function updateHeight(x,y) {
  database.ref("balloon/position").set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError() {
  console.log("Error in writing to the database");
}