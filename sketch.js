//Create variables here
var database;
var  dog, happyDog, foodS, foodStock,lastFed , feedTime ,foodObj
var dogImg,happyDogImg

function preload()
{
  //load images here
  
  dogImg =loadImage("images/dogImg.png");

  happyDogImg =loadImage("images/dogImg1.png");
}

function setup() {

	createCanvas(1200, 500);
  database = firebase.database();
  dog = createSprite(1200/1.3,300,40,40);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  feed = createButton("Feed The Dog")
  feed.position(700,10);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800,10);
  addFood.mousePressed(addFoods);


}


function draw() {  
  background(rgb(46,139,87))

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({

    Food : x
  })
}

function feedDog (){
  dog.addImage(happyDogImg)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food :foodS
  })
}