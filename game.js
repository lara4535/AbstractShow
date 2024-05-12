let bg;
let dd;
let pf;
let platforms = [];
let initialVelocity=-8;
let gravity=0.5;
function preload() {
  bg = loadImage('assets/background.png');
  dd = loadImage('assets/doodle.png');
  pf = loadImage('assets/platform.png');
//   jumpSound = loadSound('assets/jump3.mp3');
}

function setup(){
  createCanvas(400,533);

}

function draw(){
      background(0);
    image(bg, 0, 0);


  
}
