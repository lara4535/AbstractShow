// images variables
let bg;
let dd;
let pf;

// object
let platforms = [];
let player;
let score=0;

// player physics
let gravity=0.5;
let initialSpeed=-9;

function preload() {
  bg = loadImage('assets/background.png');
  dd = loadImage('assets/doodle.png');
  pf = loadImage('assets/platform.png');
}

function setup() {
  let gameStatus=select('#restart');
  gameStatus.mousePressed(gameRestart);

  createCanvas(400, 533);
  background(255);
  frameRate(35);
  fill(255,0,0);
  
  // new object: platforms and players
  for(let i=0;i<10;i++){
    let platform = new Platform (random()*width*3/4,height-75*i-20);
    platforms.push(platform);
  }

  player=new Player(platforms[0].x-10,platforms[0].y-100,initialSpeed);


}

function draw() {
  if(!isGameOver()){
    background(255);
    textSize(32);
    fill(50);
  text(score, 10, 10, 70, 80);
      
    
    player.display();
    player.x=mouseX;
    player.move();

    for(let i=0;i<platforms.length;i++){
      if(detectCollision(player,platforms[i]) && player.speed>=0){
        player.speed=initialSpeed;
        score+=1;
      }
      if(player.y<height*3/5){
        platforms[i].y-=initialSpeed/2;
      }
      platforms[i].display();

      
      if(platforms[i].y>height){
        platforms.shift();
        //new
        let newPlatform = new Platform(random()*width*3/4,height-75*10);
        platforms.push(newPlatform);
      }
      
    }
  }else{
    gameRestart();
  }

}

function detectCollision(a,b){
  return (a.y + 10 >= b.y && a.y <= b.y + 10 &&
        a.x + 10 >= b.x && a.x <= b.x + b.width);
}
function gameRestart(){
  platforms=[];
  for(let i=0;i<10;i++){
    let platform = new Platform (random()*width*3/4,height-75*i-20);
    platforms.push(platform);
  }

  player=new Player(platforms[0].x-10,platforms[0].y-100,initialSpeed);
  score=0;
}
function isGameOver(){
  if(player.y>height){
    alert("GAME OVER! SCORE: "+score );
    return true;
    
  }
  else{
    return false;
  }
}




class Player{
  constructor(x,y,speed){
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.height=80;
    this.width=80;
  }
  display(){
    image(dd,this.x,this.y);
    ellipse(this.x,this.y,20,20);
    if(this.x>width){
      this.x=0;
    }
    if(this.x<0){
      this.x=width;
    }
  }
  move(){
    this.speed+=gravity;
    this.y+=this.speed;
  }
}

class Platform{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.height=14;
    this.width=68;
  }
  display(){
    image(pf,this.x,this.y);
    rect(this.x,this.y,this.width,this.height);
  }
}
