var Bloon0 = new Image();
Bloon0.src = "./Assets/Sprites/Bloon0.png";
var BloonSrc = new Image();


const Bloon = function(level, x, y) {

  this.level = level;

  this.x = x;
  this.y = y;

  this.speed;
  
  this.positions = [[-1, -1]];
    this.keyframe = 1;
    this.keyframes = [
      [0, x, y],
    ];
        
    
  this.animate = function(frame) {
    var dur = this.speed;
    switch(level){
      case 1: this.speed = 24; break;
      case 2: this.speed = 20; break;
      case 3: this.speed = 18; break;
      case 4: this.speed = 12; break;
      case 5: this.speed = 10; break;
    }
    
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
  
  if ((frame % dur) === 0) {
    const [x, y] = this.move();
      this.keyframes.push([
        frame + dur, x, y,
      ]);
    }
      BloonSrc.src = `./Assets/Sprites/Bloon${this.level}.png`;
      
      context.drawImage(BloonSrc, this.x + 5 , this.y + 5, 40, 40);
      
      BloonSrc = new Image();
      
      context.drawImage(Bloon0, this.x + 5, this.y + 5, 40, 40);
      
    
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
        return [newPos[0], newPos[1]];
  };
};

var Bloons = new Array();




function CheckBloons() {
    for (let i = 0; i < Bloons.length; i++) {

        Bloons[i].animate(frame);
        if(Bloons[i].level <= 0) {Bloons.splice(i, 1); break}
        if (MapSelected == Map1 && Bloons[i].x == 200 && Bloons[i].y == 600) {
            Lifes -= Bloons[i].level;
            Bloons.splice(i, 1);

        }
    }
}
var key = [];

onkeydown = onkeyup = function(e) {
    e = e || event;
    key[e.keyCode] = e.type == 'keydown';
    if (key[49]) Bloons.push(new Bloon(1, 0, 0));
    if (key[50]) Bloons.push(new Bloon(2, 0, 0));
    if (key[51]) Bloons.push(new Bloon(3, 0, 0));
    if (key[52]) Bloons.push(new Bloon(4, 0, 0));
    if (key[53]) Bloons.push(new Bloon(5, 0, 0));
    if (key[48]) Bloons.splice(0, Bloons.length);
};
