
var Bloon0 = new Image();
  Bloon0.src = "./Assets/Sprites/Bloon.png";
var BloonSrc = new Image();
    

const Bloon = function(Level, x, y) {

  this.Level = Level;

  this.x = x;
  this.y = y;

  this.speed;
  
  this.positions = [[-1, -1]];
    this.keyframe = 1;
    this.keyframes = [
      // [FRAME, X, Y]
      [0, x, y],
    ];
    
    switch(Level){
      case 5: this.speed = 2.4; break;
      case 4: this.speed = 2.0; break;
      case 3: this.speed = 1.8; break;
      case 2: this.speed = 1.2; break;
      case 1: this.speed = 1.0; break;
    }
    
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
  
  const dur = 12;
  if (!(frame % dur)) {
    const [x, y] = this.move();
      this.keyframes.push([
        frame + dur, x, y,
      ]);
    }
  };



  this.draw = function(){

    BloonSrc.src = `./Assets/Sprites/Bloon${Level}.png`;
    
    context.drawImage(BloonSrc, this.x , this.y, 50, 50);
    
    BloonSrc = new Image();

    context.drawImage(Bloon0, this.x, this.y, 50, 50);
  };
  

  this.move = function(){
      const lastPos = this.positions[this.positions.length - 1];
      const curPos = [this.x, this.y];
      
      function samePos(pos1, pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1];
      }
      
      let newPos;
      const newPoses = [
        [curPos[0], curPos[1] + SquareSize], // Down
        [curPos[0] + SquareSize, curPos[1]], // Right
        [curPos[0], curPos[1] - SquareSize], // Up
        [curPos[0] - SquareSize, curPos[1]], // Left
      ];

      for (const pos of newPoses) {
        const cell = (MapSelected[pos[1] / SquareSize] || {})[pos[0] / SquareSize];

        if (cell === 0 && !samePos(pos, lastPos)) {
          newPos = pos;
          this.positions.push(curPos);
        }
      }

      if (newPos) {
        this.x = newPos[0];
        this.y = newPos[1];
        return [x, y];

      }
  };
};


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

    Bloons[i].animate(frame);
    if(MapSelected == Map1 && Bloons[i].x == 200 && Bloons[i].y == 700){
       Lifes -= Bloons[i].Level;
       Bloons.splice(i,1);
      
    }
  }
}
