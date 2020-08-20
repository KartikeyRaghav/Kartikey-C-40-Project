var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var cars, car1, car2, car3, car4;
var car1_img, car2_img, car3_img, car4_img;
var enemy,enemy_Img1,enemy_Img2,enemy_Img3,enemy_Img4,enemy_Img5;
var road_sticks = [];
var road_side = [];
var enemyg;
var scoree,startScreen,gameArea;
var goGame = false;
var explosion_Image;
var score = 0;

function preload(){
  car1_Img = loadImage("images/Car.png");
  car2_Img = loadImage("images/Car2.png");
  enemy_Img1 = loadImage("images/Enemy1.png");
  enemy_Img2 = loadImage("images/Enemy2.png");
  enemy_Img3 = loadImage("images/Enemy3.png");
  enemy_Img4 = loadImage("images/Enemy4.png");
  enemy_Img5 = loadImage("images/Enemy5.png");
  explosion = loadSound("Explosion.mp3");
  explosion_Image= loadImage("images/Explosion.png");
}


function setup(){
  canvas = createCanvas(1300,600);

  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

  road1 = new Road(325);
  road2 = new Road(975);

  var a = -50;
  for(var i = 0; i < 5; i++) {
    stick = new Road_Stick(325,a);
    a += 150;
  }

  var b = -50;
  for(var i = 0; i < 5; i++) {
    stick = new Road_Stick(975,b);
    b += 150;
  }

  car1 = createSprite(325,height-100,100,180);
  car1.addImage("Still",car1_Img);
  car1.scale = 0.8;
 
  car2 = createSprite(925,height-100,100,180);
  car2.addImage("Moving",car2_Img);
  car2.scale = 0.8;
  
  enemyg = createGroup();

  explosive = createSprite(200,200,10,10);
  explosive.addImage("Still", explosion_Image);
  explosive.visible = false;
}



function draw(){

  if(goGame === true){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    scoree = document.querySelector('.score');
    startScreen = document.querySelector('.startScreen');
    startScreen.addEventListener('click', start);
    gameArea = document.querySelector('.gameArea');

    for(var j = 0; j < road_sticks.length; j++) {
      road_sticks[j].setVelocity(0,5);

      if(road_sticks[j].y > 700) {
        road_sticks[j].y = -50;
      }
    }
    createEnemy1();
    createEnemy2();
    game.play();
  }

  if(gameState === 2) {
    game.end();
  }
}


function gamePlay() {
  if(gameState === 1) {

    if(car1.y > 200) {if(keyIsDown(UP_ARROW)) {car1.y -= 5;}}
    if(car1.y < 495) {if(keyIsDown(DOWN_ARROW)) {car1.y += 5;}}
    if(car1.x < 590) {if(keyIsDown(RIGHT_ARROW)) {car1.x += 5;}}
    if(car1.x > 60) {if(keyIsDown(LEFT_ARROW)) {car1.x -= 5;}}

    if(car2.y > 200) {if(keyIsDown(87)) {car2.y -= 5;}}
    if(car2.y < 495) {if(keyIsDown(90)) {car2.y += 5;}}
    if(car2.x < 1240) {if(keyIsDown(83)) {car2.x += 5;}}
    if(car2.x > 710) {if(keyIsDown(65)) {car2.x -= 5;}}

    for(var k = 0; k < enemyg.length; k++) {
      enemyg[k].setVelocity(0,5);

      if(car1.collide(enemyg[k])){
        explosion.play();
        explosive.position.x = car1.position.x;
        explosive.position.y = car1.position.y;
        explosive.visible = true;
        gameState = 2;
        noLoop();
      }

      if(car2.collide(enemyg[k])){
        explosion.play();
        explosive.position.x = car2.position.x;
        explosive.position.y = car2.position.y;
        explosive.visible = true;
        gameState = 2;
        noLoop();
      }
    }

    if(gameState===1) {
      drawSprites();
      textSize(20);
      fill("green");
      text("Score: " + score,1200,20);
      road1.linee();
      road2.linee();
      window.requestAnimationFrame(gamePlay);

      if(frameCount%20===0) {
        score++;
      }
    }

    if(gameState===2){
      textSize(80);
      fill("red");
      text("YOU HIT A CAR. GAME ENDED",40,300);
      text("Score: "+ score,440, 400);
    }
  }
}

function start() {
  gameArea.classList.remove('hide');
  startScreen.classList.add('hide');

  window.requestAnimationFrame(gamePlay);

  form.reset.position(20,605);
}


function createEnemy1() {
  if(frameCount % 120 === 0) {
    var enemy1 = createSprite(random(750,1250),-200,100,180);
    rand = Math.round(random(1, 5));
    enemy1.scale = 0.6;
    switch (rand) {
    case 1:
        enemy1.addImage(enemy_Img1);
        break;
    case 2:
        enemy1.addImage(enemy_Img2);
        break;
    case 3:
        enemy1.addImage(enemy_Img3);
        break;
    case 4:
        enemy1.addImage(enemy_Img4);
        break;
    case 5:
        enemy1.addImage(enemy_Img5);
        break;
    default:
        enemy1.addImage(enemy_Img5);
        break;
    }

    if(rand === 3 || rand === 4) {    
        enemy1.scale = 0.8;
    }
    enemyg.add(enemy1);
  }
  
}

function createEnemy2(x,y) {
  
  if(frameCount % 120 === 0) {
    var enemy1 = createSprite(random(50,600),-200,100,180);
    rand = Math.round(random(1, 5));
    enemy1.scale = 0.6;
    switch (rand) {
    case 1:
        enemy1.addImage(enemy_Img1);
        break;
    case 2:
        enemy1.addImage(enemy_Img2);
        break;
    case 3:
        enemy1.addImage(enemy_Img3);
        break;
    case 4:
        enemy1.addImage(enemy_Img4);
        break;
    case 5:
        enemy1.addImage(enemy_Img5);
        break;
    default:
        enemy1.addImage(enemy_Img5);
        break;
    }

    if(rand === 3 || rand === 4) {    
        enemy1.scale = 0.8;
    }
    enemyg.add(enemy1);
  }
}