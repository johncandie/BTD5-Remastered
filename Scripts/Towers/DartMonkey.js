var DartMonkeyPrice = 200;
const DartMonkey = function(x, y){
  this.x = x; this.y = y;
  this.draw = function(){
      context.drawImage(DartMonkeySrc, x, y, 50, 50);
  };
  DartMonkeyPrice = 200*Difficulty.Prices;
};



function ClickedOnDartMonkey(){
  document.body.style.cursor = "none";
  
  TowerIsClicked = true;
  TowerSelected = DartMonkeySrc;
  
  window.addEventListener("mousemove", function(e){
    hoverX = e.pageX;
    hoverY = e.pageY;
  });
  
  window.addEventListener ("click", function(e) {
    if(TowerIsClicked){
      if(MapSelectedPlace[Math.floor(e.pageY/50)][Math.floor(e.pageX/50)] == 1){
        MapSelectedPlace[Math.floor(e.pageY/50)][Math.floor(e.pageX/50)] = 0;
          TowerIsClicked = false;
          Towers.push(new DartMonkey(e.pageX-25, e.pageY-25));
          Money -= DartMonkeyPrice;
          document.body.style.cursor = "default";
      }
    }
  });
}