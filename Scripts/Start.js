const context = document.querySelector("#canvas").getContext("2d");
var start;
function Start() {
  start = setInterval(Update, 1000/60);
  document.querySelector(".loader").style.display = "none";
  document.querySelector("#canvas").style.backgroundImage = `url("./Assets/Sprites/Wood.jpg")`;
  document.querySelector("#canvas").style.backgroundSize = "50px 50px";
}
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

var MapSelected = Map1;


let frame = 0;

var Lifes;

var Money;

Difficulty = Easy;
switch(Difficulty){
  case Hard:   Lifes = Hard.Lifes; Money = Hard.Money; break;
  case Medium:   Lifes = Medium.Lifes; Money = Medium.Money; break;
  case Easy:   Lifes = Easy.Lifes; Money = Easy.Money; break;
}

function Update(){
  frame++;
 //This is for keeping the everything in game at the same size when the screen change.
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;

  context.canvas.width = width;
  context.canvas.height = height;
 
  DrawMap();
    
  if(Lifes <= 0) {
    clearInterval(start);
  }
  
  
  context.font = "40px Comic Sans MS";
 
  context.fillStyle = "red";
  context.fillText(`${Lifes}`, 1200, 88);
 
  context.fillStyle = "gold";
  context.fillText(`${Money}`, 1200, 38);
    
  CheckBloons();
  
  checkDarts();
  
  displayTowers();
  

}
window.onload = Start;
