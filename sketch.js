//Coded By Samyak Jain With <3 For WhiteHat Jr.

var backGround, backGround_img, ground;
var mario_stop, mario_running; 
var score; 
var gameState;
var pipeGroup, coinGroup;
var coin_img, pipe_img;
var pipeGroundGroup;
var pipeSpriteGroup;
var restart, restart_img;
var END = 0;
var PLAY = 1;
var jump_sound;

function preload() {
    mario_running = loadAnimation('marioRun1.png', 'marioRun2.png', 'marioRun3.png');
    mario_stop = loadAnimation("mario.png");

    backGround_img = loadImage("mariobg.jpg");

    coin_img = loadImage("coin.png");

    pipe_img = loadImage("pipe.png");

    restart_img = loadImage("restart.png");

    jump_sound = loadSound("jump.mp3")

}

function setup() {
//Creating The Sprites
backGround = createSprite(200, 200, 800, 400);
backGround.addImage("background", backGround_img);
backGround.scale = 2.75;

ground = createSprite(200, 370, 400, 20);
ground.visible = false;


mario = createSprite(60, 330, 30, 60);
mario.addAnimation("stop", mario_stop);
mario.addAnimation("running", mario_running);
mario.scale = 0.55;
mario.setCollider("circle", 0, 0, 40);

restart = createSprite(200, 180, 60, 40);
restart.addImage("restart", restart_img);

restart.scale = 0.05;

//Creating Score
score = 0;

//Creating GameStates
PLAY = 1;
END = 0;

gameState = PLAY;

//Creating End Sprites
end = createSprite(200, 180, 40, 60);
end.visible = false;

//Creating Groups
pipeGroup = new Group();
coinGroup = new Group();
pipeGroundGroup = new Group();
pipeSpriteGroup = new Group();
}

  function draw() {
    background("white");
    
      if(gameState === PLAY) {
        
        //Making mario move forward
         if(keyDown("space") && gameState === PLAY) {
        backGround.velocityX = -10;
        mario.x = 60;
        mario.changeAnimation("running", mario_running); 
      }
      
       if(keyWentUp("space")) {
         jump_sound.play()
        backGround.velocityX = 0;
        mario.x = 60;
        mario.changeAnimation("stop", mario_stop);
      }
      
      //making mario go back
      if(keyDown("LEFT_ARROW")){
      backGround.velocityX = -10 ;
    }
    
    if(keyWentUp("LEFT_ARROW")){
      backGround.velocityX = 0 ;
    }
      
      //making mario jump
      if(keyDown("UP_ARROW") && mario.y > 303) {
        jump_sound.play()
        mario.velocityY = -15;
        mario.x = 60;
        //playSound( "https://studio.code.org/sound://category_jump/arcade_game_jump_1.mp3");
      }
      
      //Gravity
      mario.velocityY = mario.velocityY + 0.7;
      
     
      //Infinite Game World
      if(backGround.x < 0) {
      backGround.x = backGround.width/2;
      }
      
       //Killing mario
       if(mario.isTouching(pipeSpriteGroup)) {
        mario.visible = false;
        gameState = END;
        
      
      }

      //Scoring System
      if(mario.isTouching(coinGroup)) {
        coinGroup.destroyEach();
        score = score + 10;
        
      }
      
      //Making mario stand on the pipe
      if(mario.isTouching(pipeGroundGroup)) {
        mario.collide(pipeGroundGroup);
        mario.velocityX = 0;
       
      }
      else if(mario.isTouching(ground)) {
        mario.collide(ground);
        mario.velocityX = 0;
      }
      
      
      //important functions
       pipeGroundSpawn();
       coinSpawn();
       pipeSpawn();
       pipeSpriteSpawn();
      
      
     
      
      if(mario.x > 400 || mario.x < 0) {
        gameState = END;
   
      }
      }
      
      
      //Game End State
      else if(gameState === END) {
        backGround.velocityX = 0;
        
        restart.visible = true;
        
      }
    
     
      
      mario.collide(ground);
      
      
      //Restarting game
      if(mousePressedOver(restart)) {
        gameState = PLAY;
        restart.visible = false;
        mario.x = 60;
        mario.velocityX = 0;
        
        
        pipeGroup.destroyEach();
        coinGroup.destroyEach();
        pipeGroundGroup.destroyEach();
        
        mario.visible = true;
        mario.changeAnimation("stop", mario_stop);
        
        score = 0;
        
      }
      
    
    createEdgeSprites();
    drawSprites();
    
    //Prinitng The Score
    fill("black");
    textSize(15);
    strokeWeight(104);
    text("Score: " + score, 180, 20);
    
    //restarting game instructions
    if(gameState === END) {
      text("You Lost.", 170, 120);
      text("Start Again:", 160, 140);
      
    }
    
  }
  
  
  //Creating Imp. Functions
  
  function pipeSpawn() {
    if(World.frameCount % 300 === 0) {
    var pipe = createSprite(400, 345, 30, 60);
    pipe.velocityX = -3;
    pipe.addImage(pipe_img);
    pipe.scale = "0.3";
    
    pipe.depth = mario.depth;
    
    mario.depth = mario.depth + 1;

    //pipe.debug = true;

    pipeGroup.add(pipe);
    
    pipe.lifetime = 135;
    
    
    }
  }
  
  function pipeGroundSpawn() {
    if(World.frameCount % 300 === 0) {
    var pipeGround = createSprite(400, 345, 70, 160);
    pipeGround.velocityX = -3;
    pipeGround.visible = false;
    
    pipeGround.depth = mario.depth;
    
    mario.depth = mario.depth + 1;
    
    
    pipeGround.lifetime = 135;
    
    pipeGroundGroup.add(pipeGround);
    
    
    }
  }
  
  function coinSpawn() {
    if(World.frameCount % 200 === 0){
    var coin = createSprite(400, 340, 20, 20);
    coin.velocityX = -3;
    coin.addImage(coin_img);
    coin.scale = 0.3;
    
    coinGroup.add(coin);
    
    coin.lifetime = 135;
    }
  }

  function pipeSpriteSpawn() {
    if(World.frameCount % 300 === 0) {
    var pipeSprite = createSprite(400, 345, 30, 60);
    pipeSprite.velocityX = -3;
    pipeSprite.visible = false;
    
    pipeSprite.depth = mario.depth;
    
    mario.depth = mario.depth + 1;
    
    
    pipeSprite.lifetime = 135;
    
    pipeSpriteGroup.add(pipeSprite);
  }
  }