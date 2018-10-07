
var Bloon0 = new Image();
  Bloon0.src = "./Assets/Sprites/Bloon.png";
var Bloon1 = new Image();
  Bloon1.src = "./Assets/Sprites/Bloon1.png";


const Bloon = function(Level, x, y) {

  this.Level = Level;
  this.positions = [-1]; // -1 'cuz initially there's no old position

  this.keyframe = 1;
  this.keyframes = [
    // [FRAME, X, Y]
    [0, x, y],
  ];

  this.x = x;
  this.y = y;

  this.animate = function(frame) {
    if (this.keyframe !== this.keyframes.length) {
      const cur = this.keyframes[this.keyframe - 1];
      const next = this.keyframes[this.keyframe];

      if (next[0] <= frame) {
        this.keyframe++;
        this.x = next[1];
        this.y = next[2];
      } else {
        const frames = next[0] - cur[0];
        const curFrame = next[0] - frame;

        this.x = cur[1] + (next[1] - cur[1]) * (1 - (curFrame / frames));
        this.y = cur[2] + (next[2] - cur[2]) * (1 - (curFrame / frames));
      }
    }

    var dur; // basically the speed. It checks something for animation
    
    if(Level == 1) dur = 24;
    if(Level == 2) dur = 20;
    if(Level == 3) dur = 18;
    if(Level == 4) dur = 12;
    if(Level == 5) dur = 10;
  
    if (!(frame % dur)) {
      const [x, y] = this.move();
      this.keyframes.push([
        frame + dur, x, y,
      ]);
    }
  };

  this.draw = function(){
    if(Level == 1)  context.fillStyle = "red";
    if(Level == 2)  context.fillStyle = "blue";
    if(Level == 3)  context.fillStyle = "green";
    if(Level == 4)  context.fillStyle = "yellow";
    if(Level == 5)  context.fillStyle = "deeppink";
    
    
    context.drawImage(Bloon0, this.x, this.y, 50, 50);

    //mask.globalCompositeOperation="source-in";
    
    //context.fillRect(this.x, this.y, 50, 50);
    
    //context.drawImage(Bloon1, this.x -2 , this.y -2, 52, 52);
  };

  this.move = function() {
 
 
    this.bloonPos = (this.y / SquareSize) * row + (this.x / SquareSize);


    const directions = [
      1,  // Right
      row, // Down
      -1, // Left
      -row // Up
    ];

    // Reset new directions
    let right = 0;
    let down  = 0;
    let left  = 0;
    let up    = 0;

    for (const dir of directions) {
      const newPos = this.bloonPos + dir;
      const lastPos = this.positions[this.positions.length - 1];

      if (newPos !== lastPos && MapSelected[newPos] === 0) {
        this.positions.push(this.bloonPos);

        switch (dir) {
          case 1:   right = SquareSize; break;
          case row:  down = SquareSize; break;
          case -1:  left = SquareSize; break;
          case -row: up = SquareSize; break;
        }

        break;
      }
    }

    const x = this.x - left + right;
    const y = this.y - up + down;

    return [x, y];
  };
};

//var bloon = new Bloon(3, 0, -50);

var Bloons = new Array();


var key = [];

onkeydown = onkeyup = function(e){
  e = e || event;
  key[e.keyCode] = e.type == 'keydown';
  if(key[49])Bloons.push(new Bloon(1, 0, -50));
  if(key[50])Bloons.push(new Bloon(2, 0, -50));
  if(key[51])Bloons.push(new Bloon(3, 0, -50));
  if(key[52])Bloons.push(new Bloon(4, 0, -50));
  if(key[53])Bloons.push(new Bloon(5, 0, -50));
};



function CheckBloons(){
    for (let i = 0; i < Bloons.length; i++){
    Bloons[i].draw();

    Bloons[i].animate(frame);
    
    if(MapSelected == Map1 && Bloons[i].x == 200 && Bloons[i].y == 700){
       Lifes -= Bloons[i].Level;
       Bloons.splice(i,1);
      
    }
  }
}