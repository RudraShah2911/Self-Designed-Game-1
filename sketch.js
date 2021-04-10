var bricks, paddle, ball, edges 
var paddleImg, ballImg
var gameState = "SERVE"
var lives, lifeImg, lifeGrp


function preload(){

  paddleImg = loadImage("paddle.png")
  ballImg = loadImage("ball.png")
  lifeImg = loadImage("life.png")
}


function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites()
  
  brickGroup = new Group()
  lifeGrp = new Group()

  for(var i = 20 ; i < 800 ; i = i + 50 ){
    for(var j = 50 ; j < 200 ; j = j + 30){
      bricks = createSprite (i , j, 30, 10)
      bricks.shapeColor = color(random(50,255),random(50,255),random(50,255))
      brickGroup.add(bricks)
    }
    
    
  }

  for(var i = 20 ; i < 160 ; i = i + 30 ){
    life = createSprite(i, 20, 20, 20)
    life.addImage(lifeImg)
    life.scale = 0.1
    lifeGrp.add(life)
  }

  paddle = createSprite(400, 370, 100,20)
  paddle.addImage(paddleImg)
  paddle.scale = 0.5
  paddle.debug = true
  paddle.setCollider("rectangle",0,0,200,40)
  ball = createSprite(400, 310, 20, 20)
  ball.addImage(ballImg)
  ball.scale = 0.2

  lives = 5
  
  
}

function draw() {
  background("black");  
  console.log(lifeGrp.length)

  
  textSize(20)
  stroke("white")
  //text("Lives : " + lives, 0,30)

  paddle.x = mouseX

  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
  ball.bounceOff(paddle)

  for (var i = 0 ; i < brickGroup.length ; i = i + 1){
    if (ball.isTouching(brickGroup.get(i))){
      ball.bounceOff(brickGroup.get(i))
      brickGroup.get(i).destroy()
    }
  }

  if ((ball.y > 390)&&(gameState === "PLAY")){
    lives = lives - 1
    //lifeGrp.length = lives
    lifeGrp.get(lives).destroy()
    reset()
    gameState = "SERVE"
  }

  if ((keyDown("space"))&&(gameState === "SERVE")){
    serve()
    gameState = "PLAY"
  }

  if (lives < 1){
    gameState = "END"
    text("GAME OVER!!!", 300, 200)
    text("Press 'R' to Restart", 300, 220)
  }

  if (brickGroup.length === 0){
    textSize(50)
    stroke("white")
    text("You Won!!!", 300,200)
    gameState = "END"
  }

  if((gameState === "END")&&(keyDown("R"))){
    for(var i = 20 ; i < 800 ; i = i + 50 ){
      for(var j = 50 ; j < 200 ; j = j + 30){
        bricks = createSprite (i , j, 30, 10)
        bricks.shapeColor = color(random(50,255),random(50,255),random(50,255))
        brickGroup.add(bricks)
      }
    }

    
    gameState = "SERVE"
    lives = 5
    for(var i = 20 ; i < 160 ; i = i + 30 ){
      life = createSprite(i, 20, 20, 20)
      life.addImage(lifeImg)
      life.scale = 0.1
      lifeGrp.add(life)
    }
  }


 
  
  drawSprites();
}

function reset(){
  ball.x = 400
  ball.y = 310
  ball.velocityX = 0
  ball.velocityY = 0
}

function serve(){
  
    ball.velocityX = 3
    ball.velocityY = 2
  
}