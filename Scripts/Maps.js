var Stone = new Image();
  Stone.src = "./Assets/Sprites/Stone.jpg";
var Grass = new Image();
  Grass.src = "./Assets/Sprites/Grass.jpg";
var Tree = new Image();
  Tree.src = "./Assets/Sprites/Tree.png";
var Lake = new Image();
  Lake.src = "./Assets/Sprites/Lake.jpg";
var Wood = new Image();
  Wood.src = "./Assets/Sprites/Wood.jpg";

var row = 31; //this explains to the computer the way I want to draw the map. so every 16 boxes drawn on the top it will go down. it will repeat it 9 times( column amount)
var column = 18;

var SquareSize =  50;

var MapSelected = Map1;

var Draw = Grass;

function DrawMap() {
   for (let y = 0; y < column; y++) {
     for (let x = 0; x < row; x++) {
        switch (MapSelected[((y * row) + x)]) {
          case 0: context.fillStyle = "white";
                  Draw = Stone;
            break;
          case 1: context.fillStyle = "green";
            Draw = Grass;
            break;
          case 2: context.fillStyle = "blue";
            Draw = Lake;
            break;
          case 3: context.fillStyle = "brown";
            Draw = Tree;
            context.drawImage(Grass,x*SquareSize, y*SquareSize, SquareSize, SquareSize);
            break;
          case 4: context.fillStyle = "yellow";
            Draw = Wood;
            break;
          
        }
        context.drawImage(Draw,x*SquareSize, y*SquareSize, SquareSize, SquareSize);
        //context.fillRect(x*SquareSize, y*SquareSize, SquareSize, SquareSize);
     }
   }
}