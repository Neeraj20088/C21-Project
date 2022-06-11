
var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
    pathImg = loadImage("Road.png");
    Obstacle1 = loadImage("obstacle1.png");
    Obstacle2 = loadImage("obstacle2.png");
    Obstacle3 = loadImage("obstacle3.png");
    Obstacle4 = loadImage("obstacle4.png");
    mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
    mainRacerImg2= loadAnimation("mainPlayer3.png");
    
    
    cycleBell = loadSound("bell.mp3");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
 
    createCanvas(1200,300);
    // Moving background
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX = -15;
    
    

    //creating boy running
    mainCyclist  = createSprite(70,150);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    mainCyclist.scale=0.07;
      
    //set collider for mainCyclist
    
    
    mainCyclist.setCollider("rectangle",0,0,40,40);
    
    
      
    gameOver = createSprite(650,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;   

    coneG = new Group();
    manholeG = new Group();
    nailsG = new Group();
    roadblockG = new Group();

}

function draw() {
 
    background(0);
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Score: "+ distance,900,30);
    
    if(gameState===PLAY){
      
     distance = distance + Math.round(getFrameRate()/50);
     path.velocityX = -(6 + 2*distance/150);
    
     mainCyclist.y = World.mouseY;
    
     edges= createEdgeSprites();
     mainCyclist .collide(edges);
    

    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
      //code to play cycle bell sound
    if(keyDown("space")) {
      cycleBell.play();
    }

    var select_obstacle = Math.round(random(1,4));
  
    if (World.frameCount % 150 == 0) {
      if (select_obstacle == 1) {
        cones();
      } else if (select_obstacle == 2) {
        manholes();
      } else if (select_obstacle == 3) {
        nail();
      } else {
        roadblock();
      }
    }

    if(coneG.isTouching(mainCyclist)){
        gameState = END;
        cone.velocityY = 0;
       }
       
       if(manholeG.isTouching(mainCyclist)){
         gameState = END;
         manhole.velocityY = 0;
       }
       
       if(nailsG.isTouching(mainCyclist)){
         gameState = END;
         nails.velocityY = 0;
       }
    
       if(roadblockG.isTouching(mainCyclist)){
        gameState = END;
        roadblocks.velocityY = 0;

       }


} 
else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    coneG.setVelocityXEach(0);
    coneG.setLifetimeEach(-1);
  
    manholeG.setVelocityXEach(0);
    manholeG.setLifetimeEach(-1);
  
    nailsG.setVelocityXEach(0);
    nailsG.setLifetimeEach(-1);
    
    roadblockG.setVelocityXEach(0);
    roadblockG.setLifetimeEach(-1);

     if(keyDown("UP_ARROW")) {
       reset();
     }

}





}


function cones(){
    cone =createSprite(1100,Math.round(random(50, 250)));
    cone.scale = 0.2;
    cone.velocityX = -(6 + 2*distance/150);
    
    cone.addImage("cone",Obstacle1);
    cone.setLifetime=170;
    coneG.add(cone);
}

function manholes(){
    manhole =createSprite(1100,Math.round(random(50, 250)));
    manhole.scale = 0.2;
    manhole.velocityX = -(6 + 2*distance/150);
    
    
    manhole.addImage("manhole",Obstacle2);
    manhole.setLifetime=170;
    manholeG.add(manhole);
}

function nail(){
    nails =createSprite(1100,Math.round(random(50, 250)));
    nails.scale = 0.2;
    nails.velocityX = -(6 + 2*distance/150);
   
    
    nails.addImage("nail",Obstacle3);
    nails.setLifetime=170;
    nailsG.add(nails);
}

function roadblock(){

    roadblocks = createSprite(1100,Math.round(random(50, 250)));
    roadblocks.scale = 0.2;
    roadblocks.velocityX = -(6 + 2*distance/150);
  
    
    roadblocks.addImage("roadblock",Obstacle4);
    roadblocks.setLifetime = 170;
    roadblockG.add(roadblocks);


}



function reset(){
gameState = PLAY;
gameOver.visible = false;
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);

coneG.destroyEach();
manholeG.destroyEach();
nailsG.destroyEach();
roadblockG.destroyEach();
distance = 0;
}
