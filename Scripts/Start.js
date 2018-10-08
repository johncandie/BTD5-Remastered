const context = document.querySelector("#canvas").getContext("2d");
//const mask = document.querySelector("#mask").getContext("2d");


function Start() {
  var start = setInterval(Update, 1000/60);
}

var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

var MapSelected = Map1;

let frame = 0;

var Lifes;

var Money;

Difficulty = Easy;

if(Difficulty == Hard) {
  Lifes = Hard.Lifes;
  Money = Hard.Money;
}
if(Difficulty == Medium){
  Lifes = Medium.Lifes;
  Money = Medium.Money;
}
if(Difficulty == Easy){
  Lifes = Easy.Lifes;
  Money = 99999999999999;

}
function Update(){ //This is for keeping the everything in game at the same size when the screen change.

  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;

  context.canvas.width = width;
  context.canvas.height = height;
  
  //mask.canvas.width = width;
  //mask.canvas.height = height;
 
  DrawMap();

  //bloon.animate(frame);
  //bloon.draw();
    
  if(Lifes <= 0) {
    clearInterval(start);
  }
  
  frame++;
  
  CheckBloons();
  
  DisplayTowers();
  
  context.font = "50px Comic Sans MS";
 
  context.fillStyle = "red";
  context.fillText(`${Lifes}`, ((row*SquareSize)-(row*6))-15, 50);
 
  context.fillStyle = "gold";
  context.fillText(`${Money}`, ((row*SquareSize)-(row*6))+83, 50);
}