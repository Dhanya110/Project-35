//Create variables here

var dog,dogImage,happyDogImage;
var database,foodS,foodStock

function preload(){
 
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  //createCanvas
  createCanvas( 600, 600);
  
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20)

  dog=createSprite(310,350,10,10);
  dog.addImage(dogImage);
dog.scale=0.27
}

function draw() {  
background(46,139,87)

if (foodS!==undefined){
  textSize(30);
  fill(0)
  text ("Press 'Up Arrow' to feed Tipu",120,50)
  textSize(20);
  text ("Food Remaining:"+foodS,230,120)
}

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImage);
}

if(keyWentUp(UP_ARROW)){
   dog.addImage(dogImage);
}

if (foodS===0){
  foodS=20;
}

  drawSprites();
  
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS=data.val();
}