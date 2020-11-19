var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var princess, obstacle, obstaclesGroup, playGround, invisibleGround, gameOver, restart;

var princessImage, crateImage, spikeImage, backgroundImage, gameOverImage, restartImage;

var score;

function preload(){
  princessImage = loadImage("princess.png");
  
  crateImage = loadImage("crate.png");
  spikeImage = loadImage("spike.png");
  
  backgroundImage = loadImage("background.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);

  playground = createSprite(300, 200, 10, 10);
  playground.addImage("background", backgroundImage);
  playground.scale = 2;
  
  princess = createSprite(100, 400, 10, 10);
  princess.addImage("princess", princessImage);
  princess.scale = 1;
  
  gameOver = createSprite(300, 200, 10, 10);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  restart = createSprite(300, 350, 10, 10);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  invisibleGround = createSprite(300, 550, 600, 10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white");
  
  if(gamestate === PLAY) {
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && princess.y >= 100) {
      princess.velocityY = -12;
    }
    
    princess.velocityY = princess.velocityY + 0.6;
    
    playground.velocityX = -3;
    
    if(playground.x < 100) {
      playground.x = 400;
    }
    
    spawnObstacles();
    
    if(princess.isTouching(obstaclesGroup)) {
      gamestate = END;
    }
  }  
  
  if(gamestate === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    playground.velocityX = 0;
    princess.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {  
      reset();
    }
  }
  
  princess.collide(invisibleGround); 
  
  drawSprites();
  
  stroke("black");
  fill("black");
  textSize(25);
  text("Score: "+ score, 350, 100);
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
   obstacle = createSprite(600,510,10,10);
   obstacle.velocityX = -6;
    obstacle.setCollider('circle',0,0,50)
    //obstacle.debug = true
   
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(spikeImage);
              break;
      case 2: obstacle.addImage(crateImage);
              break;
      default: break;
    } 
    
   obstacle.scale = 0.5;
   obstacle.lifetime = 180;
     
   obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
}