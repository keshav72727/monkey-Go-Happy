
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score1=0;
var score2=0;
var jungle,jungle_image,invisibleGround;
var START=1;
var PLAY=2;
var END=0;
var gameState=1;
var gameOver,gameOver_image,start,start_image;

function preload()
{  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle_image = loadImage("jungle.jpg");
  start_image = loadImage("PRESS SPACE KEY TO START THE GAME (2).jpg");
  gameOver_image = loadImage("game over! (1).jpg");
}

function setup() 
{  
  createCanvas(600,400);
  
  jungle = createSprite(200,200,600,400);
  jungle.addImage("jungle",jungle_image);
  jungle.scale=2.1;
  
  
  monkey = createSprite(60,330,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  gameOver = createSprite(300,200,600,400);
  gameOver.addImage("gameover",gameOver_image);
  
  invisibleGround = createSprite(300,390,600,10);
  invisibleGround.visible=false;
  
  start = createSprite(300,200,600,400);
  start.addImage("start",start_image);
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
}

function spawnObstacles()
{
    if (frameCount%300===0)
      {
        obstacle = createSprite(600,370);
        obstacle.addImage("obstacle",obstacleImage);
        obstacle.scale=0.23;
        obstacle.velocityX=-(5+score1/8);
        obstacle.lifetime=120;
        obstacleGroup.add(obstacle);
       
      }
}

function food ()
{
  if (frameCount%100===0)
    {
      banana = createSprite(600,60);
      banana.y=Math.round(random(60,280));
      banana.addImage("banana",bananaImage);
      banana.velocityX=-(5+score1/5);
      banana.lifetime=120;
      banana.scale=0.15;
      foodGroup.add(banana);
    }
}

function draw() 
{
  background(180);
  
  monkey.collide(invisibleGround);
  
  monkey.velocityY=monkey.velocityY+0.8;

  drawSprites();
   
  if (keyDown("r"))
    {
      gameState=PLAY;
      start.destroy();
    }
  
  if (gameState===PLAY)
    {
      score1=score1-1;
      
      jungle.velocityX=-(5+score1/10);
      
      score1=Math.round(frameCount/getFrameRate()); 
      
      gameOver.visible=false;
      
      stroke("black");
      fill("black");
      textSize(20);
      text("survival time = "+score1,400,30);
  
      stroke("purple");
      fill("purple");
      textSize(20);
      text("score = "+score2,50,30);
  
      
       if (monkey.isTouching(foodGroup))
      {
        foodGroup.destroyEach();
        score2=score2+5;
      }
      spawnObstacles();
      
      food();
      
      if (jungle.x<0)
      {
        jungle.x=jungle.width/2;
      }
      
      if (keyDown("space")&&monkey.y>=250)
        {
          monkey.velocityY=-15;
        }
      
      if (obstacleGroup.isTouching(monkey))
        {
          gameState=END;
        }
     
      if (gameState===END) 
      {
        jungle.velocityX=0;
        
        obstacleGroup.destroyEach();
        foodGroup.destroyEach();
        
        obstacleGroup.setVelocityEach(0);
        foodGroup.setVelocityEach(0);
        
        gameOver.visible=true;
        
        score1=0;
        score2=0;
     }
  } 
}