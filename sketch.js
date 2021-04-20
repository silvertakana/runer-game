var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database,shadow = [];

var form, player, game;

var cars, car1, car2, car3, car4,carimg = [],track,ground;

function preload(){
  for(let i = 0;i<4;i++){
    carimg[i] = loadImage("images/runner"+(i+1)+".png");
  }
  
  for(let i = 0;i<4;i++){
    shadow[i] = loadImage("images/runner"+(i+1)+".png");
  }
  track =loadImage('images/track.jpg');
  ground =loadImage('images/ground.png');
  
  // shadow.loadPixels()
}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  for(let j = 0;j<4;j++){
    shadow[j].loadPixels()
  // console.log(shadow[j].pixels.length)

  for(let i = 0;i<shadow[j].pixels.length;i+=4){
    // let p =shadow.pixels[i]
    if(shadow[j].pixels[i + 3] !== 0){
      shadow[j].pixels[i] = 0;
      shadow[j].pixels[i + 1] = 0;
      shadow[j].pixels[i + 2] = 0;
      shadow[j].pixels[i + 3] = 100;
    }
  }
  shadow[j].updatePixels();
  }
  
  
    
   
  
  console.log(shadow.pixels)
  // player.updateCount(0);
  // game.update(0);
  
}


function draw(){
  console.log(playerCount)
  if(playerCount >= 4){
    game.update(1);
  }else{
    game.update(0);
  }
  if(gameState === 1){
    clear();
    game.play();
  }else if(gameState === 2){
    game.end();
  }
  // image(shadow,0, 0, width, height)
}
