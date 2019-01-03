var DartMonkeyPrice = 200;
const DartMonkey = function(x, y, time){
  this.x = x; this.y = y; this.time = time;
  this.range = 200; this.coolDown = 60; this.pierce = 1;this.mapSpot = 1; this.dartRange = this.range*1.5; this.layers = 1;
  DartMonkeyPrice = 200*Difficulty.Prices;
  this.draw = function(){
      context.drawImage(dartMonkeyImg, x, y, 50, 50);
      //console.log(frame, this.time);
  };
  this.shoot = function(bx, by){
    if(frame > this.time){
      this.time = frame + this.coolDown;
      Darts.push(new Dart(this.x, this.y, bx + 25, by + 25, this.pierce, this.dartRange, this.layers));
    }
  };
};



function ClickedOnDartMonkey(){
  document.body.style.cursor = "none";
  
  towerIsClicked = true;
  placingTower = dartMonkeyImg;
  
  window.addEventListener("mousemove", function(e){
    hoverX = e.pageX;
    hoverY = e.pageY;
    placeTaken = checkSpot(e.pageX, e.pageY) !== undefined;
    });
  window.addEventListener ("click", function(e) {
    if(towerIsClicked){
      if(MapSelected[Math.floor(e.pageY/50)][Math.floor(e.pageX/50)] == 1){
        if(!placeTaken){
            towerIsClicked = false;
            towers.push(new DartMonkey(e.pageX-25, e.pageY-25, frame));
            Money -= DartMonkeyPrice;
            document.body.style.cursor = "default";
        }
      }
    }
  });
}
