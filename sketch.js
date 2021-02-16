var aircraft;
var aircraftImg;
var enemy1;
var backgroundImg;
var enemyGroup,weaponGroup;
var enemyImg1,enemyImg2;
var gameState;
gameState = "start";
var playImg,playButton;
var score =0;
var shootSound,dieSound
var ruleButtonImg;
var weapon1Img, weapon2Img, abilityImg;
var life1Img,nolifeImg;
var counter = 3;
var life1,life2,life3,life4;
var lives = [life1,life2,life3,life4]


function preload(){
  //aircraftImg = loadAnimation("Images/aircraft1.png","Images/aircraft2.png","Images/aircraft3.png","Images/aircraft4.png")
  aircraftImg = loadAnimation("Project Images/Aircraft.gif");
  backgroundImg = loadImage("Images/Background Img3.PNG");
  enemyImg1 = loadAnimation("Images/Enemy1.png");
  slide1 = loadImage("Opening Slide/Slide1.JPG");
  playImg = loadImage("Images/Play Button.PNG");
  endimg = loadImage("Images/end.PNG");
  restartImg = loadImage("Images/Restart.PNG");
  rulesImg = loadImage("Opening Slide/Slide2.JPG");
  shootSound = loadSound("Sounds/shoot.wav");
  dieSound = loadSound("Sounds/explosion.wav");
  rulesButtonImg = loadImage("Images/RulesImg.jpg");
  life1Img = loadImage("Project Images/full life.png");
  nolifeImg = loadImage("Project Images/no life.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(width/2,height/2,width,height);
  
  playButton = createSprite(width/2+400,height/2+50,50,50);
  playButton.scale = 0.6;
  playButton.addImage(playImg);
  aircraft = createSprite(50,0);
  aircraft.addAnimation("aircraftimg",aircraftImg);
 //aircraft.scale = 2;
  aircraft.visible = false;
  restart = createSprite(width/2,height-100);
  restart.addImage(restartImg);
  restart.scale =0.3;
  restart.visible = false;
  rules= createSprite(width/2-200,height/2);
  rules.addImage(rulesImg);
  rules.scale = 0.6;
  rules.visible = false;
  ruleButton = createSprite(width/2 + 400,height/2-100,30,50,20);
  ruleButton.addImage(rulesButtonImg);
  ruleButton.scale = 0.3;
  //ruleButton.visible = false;
  aircraft.debug = true;
  aircraft.setCollider("rectangle",0,0,150,50);
  life1 = createSprite(width/2+650,30);
  life1.addImage(life1Img);
  life1.scale = 0.2;
  life1.visible = false;
  life2 = createSprite(width/2+600,30);
  life2.addImage(life1Img);
  life2.scale = 0.2;
  life2.visible = false;
  life3 = createSprite(width/2+550,30);
  life3.addImage(life1Img);
  life3.scale = 0.2;
  life3.visible = false;
  life4 = createSprite(width/2+700,30);
  life4.addImage(life1Img);
  life4.scale = 0.2;
  life4.visible = false;
  
  enemyGroup = new Group();
  weapon1Group = new Group();
  weapon2Group = new Group();
}

function draw() {
 console.log(lives.length);
  /*background.velocityX = -3;
  if(background.x<0){
    background.x = background.width/2;
  }*/
  

  if(gameState === "start"){
   
    background.addImage(slide1);//background(slide1);
  
 if(mousePressedOver(ruleButton)){
   rules.visible = true;
 }
  
    if(mousePressedOver(playButton)){
      gameState = "play";
      playButton.visible = false;
      life1.visible = true;
      life2.visible = true;
      life3.visible = true;
    }

    drawSprites();

    
  //textSize(30);
    //text("Press up arrow for rules",width/2-200,60);
  }

 

if(gameState === "play"){
 
  ruleButton.visible = false;
  rules.visible = false;
  background.addImage(backgroundImg);//background(backgroundImg);
  background.velocityX =-6;
  if(background.x <0){
    background.x = background.width/2;
  }
 
  
 aircraft.visible = true;
  if(keyDown(UP_ARROW)){
    aircraft.y -= 5;
  }
  if(keyDown(DOWN_ARROW)){
    aircraft.y += 5;
  }
  if(keyDown(LEFT_ARROW)){
    aircraft.x -= 5;
  }
  if(keyDown(RIGHT_ARROW)){
    aircraft.x += 5;
  }
  if(keyDown(SHIFT)){
    enemyGroup.destroyEach();
  }
  if(keyDown(ENTER)){
    life4.visible = true;
  }
  edges = createEdgeSprites();
  aircraft.bounceOff(edges);
  
  if(keyDown("space")){
  spawnWeapon();
  shootSound.play();
  }
    enemy();
  
    for(var i = 0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(weapon1Group) || enemyGroup.get(i).isTouching(weapon2Group) ){
        enemyGroup.get(i).destroy();
        score = score+1;
      }
    }

  for(var i=0; i<=lives.length; i++){
    if(enemyGroup.isTouching(aircraft)){
      //gameState = "end";
      counter = counter-1;
      lives[i].visible = false;
      dieSound.play();
    }
  }


    drawSprites();
    textSize(30);
  fill("red");
  text("Score:"+score, width/2,30);
  if(score <= 15 || score === 0){
    text("LEVEL 1",20,30);
  }
  else if(score > 15){
    text("LEVEL 2",20,30);
    //enemy1.velocityX = -20;
  }
   
}
if(gameState === "end"){
  background.addImage(endimg);// background("black");
  background.scale = 3.5;
  background.x = width/2;
  background.y = height/2;
  background.velocityX = 0;
  enemyGroup.destroyEach();
  aircraft.visible = false;
  weapon1Group.destroyEach();
  weapon2Group.destroyEach();
 restart.visible = true;
 score = 0;
 life1.visible = false;
 life2.visible = false;
 life3.visible = false;
 life4.visible = false;

  if(mousePressedOver(restart)){
    gameState = "play";
    restart.visible =false;
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
  }
  drawSprites(); 
}

  
  
 
  
}

function enemy(){
  if(frameCount %30 === 0){
    
  
 var enemy1 = createSprite(Math.round(random(150,width)),Math.round(random(0,height)),70,70);
  enemy1.addAnimation("enemy1.img",enemyImg1);
  enemy1.velocityX = -10;
 enemy1.scale = 0.3;
  console.log(score);
  if(score >= 15){
    enemy1.velocityX = -(score*2+10)
  }

  enemyGroup.add(enemy1);
  
}
}

function spawnWeapon(){
  if(frameCount %5 === 0){
    weapon1 = createSprite(aircraft.x+90,aircraft.y+10,50,3);
    weapon2 = createSprite(aircraft.x+90,aircraft.y-20,50,3);
    weapon1.velocityX = 5;
    weapon2.velocityX = 5;
    weapon1.lifetime = 100;
    weapon2.lifetime = 100;
    weapon1.shapeColor = "red";
    weapon2.shapeColor = "red";
    weapon1Group.add(weapon1);
    weapon2Group.add(weapon2);
    //console.log(weapon.depth);
    //console.log(enemy1.depth);
    //enemy.depth = weapon.depth
    //enemy.depth += 1;
  }
}

function ability(){
  if (frameCount % 60 === 0) {
    var ability = createSprite(600,120,40,10);
   ability.scale = 0.5;
    ability.velocityX = -3;
    
     //assign lifetime to the variable
    ability.lifetime = 100;


    
  }
}