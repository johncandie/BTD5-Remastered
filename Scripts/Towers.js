var DartMonkeySrc = new Image();
  DartMonkeySrc.src = "./Assets/Sprites/DartMonkey.png";


window.addEventListener("click", function(e) {
  ClickedOnDartMonkey();
});


function DisplayTowers(){
  context.drawImage(DartMonkeySrc, (row*SquareSize)-(row*6)-15, 100, 50, 50);
    DartMonkeyDraw();
}
