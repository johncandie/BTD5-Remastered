var DartMonkeyPrice = 200;
const DartMonkey = function(x, y){
  this.x = x; this.y = y;
  this.draw = function(){
      context.drawImage(DartMonkeySrc, x, y, 50, 50);
  };
  DartMonkeyPrice = 200*Difficulty.Prices;
};
var clickX;
var clickY;

var hoverX;
var hoverY;

var DartMonkeys = new Array();

var DartMonkeyIsClicked = false;

var DartMonkeyPos;

function ClickedOnDartMonkey(){
  window.addEventListener("click", function(e) {
    clickX = e.pageX;
    clickY = e.pageY;

    if(clickX >= (row*SquareSize)-(row*6)-15 && clickX <= ((row*SquareSize)-(row*6)-15)+50 && clickY >= 100 && clickY <=150 && Money >= DartMonkeyPrice ){
      DartMonkeyIsClicked = true;

      window.addEventListener("mousemove", function(e){
      hoverX = e.pageX;
      hoverY = e.pageY;
      //hoverX = Math.round((e.pageX / column) * SquareSize);
      //hoverY = Math.round((e.pageY / row) * SquareSize);
      //console.log((hoverY / SquareSize) * row + (hoverX / SquareSize))
     });
      window.addEventListener ("click", function(e) {
        
        if(DartMonkeyIsClicked === true){
          DartMonkeyPos = Math.round((e.pageY / SquareSize) * row + (e.pageX / SquareSize));
          if(e.pageX < (row*SquareSize)-(row*6)-15 && e.pageY < (column*SquareSize)-(3*SquareSize) ){
            console.log(DartMonkeyPos, MapSelected[DartMonkeyPos]);
            DartMonkeyIsClicked = false;
            DartMonkeys.push(new DartMonkey(e.pageX-25, e.pageY-25));
            Money -= DartMonkeyPrice;
          }
        }
      });
    }
  });
}
function DartMonkeyDraw(){
  if(DartMonkeyIsClicked === true) {
    context.drawImage(DartMonkeySrc, hoverX, hoverY, 50, 50);
  }
  for(let i = 0; i < DartMonkeys.length; i++){
    DartMonkeys[i].draw();
  }
}