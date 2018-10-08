var DartMonkeyPrice = 200;
const DartMonkey = function(x, y){
  this.x = x; this.y = y;
  this.draw = function(){
      context.drawImage(DartMonkeySrc, x, y, 50, 50);
  };
  DartMonkeyPrice = 200*Difficulty.Prices;
};


var DartMonkeyPos;

function ClickedOnDartMonkey(){
  //document.body.style.cursor = "none";
  
  TowerIsClicked = true;
  TowerSelected = DartMonkeySrc;
  
  window.addEventListener("mousemove", function(e){
    hoverX = e.pageX;
    hoverY = e.pageY;
  //  console.log(hoverX, hoverY);
  });
  
  window.addEventListener ("click", function(e) {
    if(TowerIsClicked === true){
      DartMonkeyPos = Math.floor(e.pageY / SquareSize) * row + Math.floor(e.pageX / SquareSize);
      if(MapSelected[DartMonkeyPos] == 1){
        //{
          TowerIsClicked = false;
          Towers.push(new DartMonkey(e.pageX-25, e.pageY-25));
          Money -= DartMonkeyPrice;
          document.body.style.cursor = "default";
        //}
      }
    }
  });
}


