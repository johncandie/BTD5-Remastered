
var Bloon0 = new Image();
  Bloon0.src = "./Assets/Sprites/Bloon.png";
var BloonSrc = new Image();
    

const Bloon = function(Level, x, y) {

  this.Level = Level;

  this.x = x;
  this.y = y;

  this.speed;
  
  this.positions = [[-1, -1]];
    
    switch(Level){
      case 5: this.speed = 2.4; break;
      case 4: this.speed = 2.0; break;
      case 3: this.speed = 1.8; break;
      case 2: this.speed = 1.2; break;
      case 1: this.speed = 1.0; break;
    }


  this.draw = function(){

    BloonSrc.src = `./Assets/Sprites/Bloon${Level}.png`;
    
    context.drawImage(BloonSrc, this.x , this.y, 50, 50);
    
    BloonSrc = new Image();

    context.drawImage(Bloon0, this.x, this.y, 50, 50);
  };


  this.move = function(){
    
      let right = 0;
      let down  = 0;
      let left  = 0;
      let up    = 0;
      
      var DownPos = MapSelected[Math.floor(this.y/SquareSize)+1][Math.floor(this.x/50)];
      var RightPos = MapSelected[Math.floor(this.y/SquareSize)][Math.floor(this.x/50)+1];
      var UpPos = MapSelected[Math.floor(this.y/SquareSize)-1][Math.floor(this.x/50)];
      var LeftPos = MapSelected[Math.floor(this.y/SquareSize)][Math.floor(this.x/50)-1];
      
      const lastPos = this.positions[this.positions.length - 1];
      
      var x = this.x; 
      var y = this.y; 
      
      if(DownPos === 0 && (x !== lastPos[0] || y !== lastPos[1])){
        down = SquareSize;
        this.positions.push([x, y]);
      }
      
      if(RightPos === 0 && (x !== lastPos[0] || y !== lastPos[1])){
        right = SquareSize;
        this.positions.push([x, y]);
      }
        
      //if(UpPos === 0){
      //  up = this.speed;
      //} else {up = 0;}
      //if(LeftPos === 0){
      //  left = this.speed;
      //} else {left = 0}
      
      console.log(`down ${DownPos} right ${RightPos} up ${UpPos} left ${LeftPos}`);

      this.x -= left;
      this.y -= up;
      this.x += right;
      this.y += down;
      
    
  };
};

//var bloon = new Bloon(3, 0, -50);

var Bloons = new Array();


var key = [];

onkeydown = onkeyup = function(e){
  e = e || event;
  key[e.keyCode] = e.type == 'keydown';
  if(key[49])Bloons.push(new Bloon(1, 0, 50));
  if(key[50])Bloons.push(new Bloon(2, 0, 50));
  if(key[51])Bloons.push(new Bloon(3, 0, 50));
  if(key[52])Bloons.push(new Bloon(4, 0, 50));
  if(key[53])Bloons.push(new Bloon(5, 0, 50));
  if(key[48])Bloons.splice(0, Bloons.length);
};


function CheckBloons(){
    for (let i = 0; i < Bloons.length; i++){
    Bloons[i].draw();

    Bloons[i].move();
    
    if(MapSelected == Map1 && Bloons[i].x == 200 && Bloons[i].y == 700){
       Lifes -= Bloons[i].Level;
       Bloons.splice(i,1);
      
    }
  }
}
