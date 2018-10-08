var DartMonkeySrc = new Image();
  DartMonkeySrc.src = "./Assets/Sprites/DartMonkey.png";

var Towers = new Array();

var TowerIsClicked = false;

var TowerSelected;


var clickX;
var clickY;

var hoverX;
var hoverY;


window.addEventListener("click", function(e) {
  clickX = e.pageX;
  clickY = e.pageY;
  if(clickX >= (row*SquareSize)-(row*6)-15 && clickX <= ((row*SquareSize)-(row*6)-15)+50 && clickY >= 100 && clickY <=150 && Money >= DartMonkeyPrice) ClickedOnDartMonkey();
});
window.addEventListener("keydown", function(e){
  if(e.keyCode == 81 &&  Money >= DartMonkeyPrice) ClickedOnDartMonkey();
  if(e.keyCode == 27) document.body.style.cursor = "default"; TowerIsClicked = false;
});

function DisplayTowers(){
  context.drawImage(DartMonkeySrc, (row*SquareSize)-(row*6)-15, 100, 60, 60);

    for(let i = 0; i < Towers.length; i++){
      Towers[i].draw();
    }
    
  if(TowerIsClicked === true) {
    context.drawImage(TowerSelected, hoverX - 25, hoverY - 25, 50, 50);
  }
}
