var dartMonkey = {
  shop: {
    x: 1862,
    y: 934,
    w: 68,
    h: 74
  },
  avatars:  {
  left :[
    {
      l: 1,
      L: [0],
      x: 432,
      y: 1357,
      w: 55,
      h: 57,
      dw: 48,
      dh: 50,
      ax: function(x){
        let dx = x;
        return dx;
      },
      ay: function(y){
        let dy = y;
        return dy;
      }
    },
    {
      l: 2,
      L: [0, 1],
      x: 1428,
      y: 669,
      w: 41,
      h: 13,
      dw: 37,
      dh: 13,
      ax: function(x){
        let dx = x + 5.5;
        return dx;
      },
      ay: function(y){
        let dy = y + 7.5;
        return dy;
      }
    }
  ],
  right: [
    {
      l: 1,
      L: [0],
      x: 432,
      y: 1357,
      w: 55,
      h: 57,
      dw: 48,
      dh: 50,
      ax: function(x){
        let dx = x;
        return dx;
      },
      ay: function(y){
        let dy = y;
        return dy;
      }
    },
    {
      l: 2,
      L: [0, 1],
      x: 1428,
      y: 669,
      w: 41,
      h: 13,
      dw: 37,
      dh: 13,
      ax: function(x){
        let dx = x + 5.5;
        return dx;
      },
      ay: function(y){
        let dy = y + 7.5;
        return dy;
      }
    }
  ]
  },
  profilePictures: {
    left:[
      {
        x:1359,
        y:1137,
        w:78,
        h:77,
        dw:78,
        dh:77
      }
      ],
    right:[
      {
        x:1359,
        y:1137,
        w:78,
        h:77,
        dw:78,
        dh:77
      }
      ]
  },
  price: 200*Difficulty.Prices,
  range: 200,
  coolDown: 60,
  pierce: 1,
  mapSpot: 1,
  layers: 1,
  dartRange: this.range*1.5
};

const DartMonkey = function(x, y, time, number){
  this.number = number; this.x = x; this.y = y; this.time = time;
  this.range = dartMonkey.range;
  this.coolDown = dartMonkey.coolDown;
  this.pierce = dartMonkey.pierce;
  this.mapSpot = dartMonkey.mapSpot;
  this.dartRange = dartMonkey.range*1.5;
  this.layers = dartMonkey.layers;
  this.upgrade1 = 0;
  this.upgrade2 = 0;
  this.price = dartMonkey.price;
  
  this.draw = function(){
    if(this.upgrade2 > this.upgrade1){
      for(let i = 0; i < dartMonkey.avatars.left[this.upgrade2].l; i++){
        let layers = dartMonkey.avatars.left[dartMonkey.avatars.left[this.upgrade2].L[i]];
        context.drawImage(inGame, layers.x, layers.y, layers.w, layers.h, layers.ax(this.x), layers.ay(this.y), layers.dw, layers.dh);
      }
    }
    if(this.upgrade1 >= this.upgrade2){
      for(let i = 0; i < dartMonkey.avatars.right[this.upgrade1].l; i++){
        let layers = dartMonkey.avatars.right[dartMonkey.avatars.right[this.upgrade1].L[i]];
        context.drawImage(inGame, layers.x, layers.y, layers.w, layers.h, layers.ax(this.x), layers.ay(this.y), layers.dw, layers.dh);
      }
    }
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
  placingTower = dartMonkey;
  
  window.addEventListener("mousemove", function(e){
    hoverX = e.pageX;
    hoverY = e.pageY;
    placeTaken = checkSpot(e.pageX, e.pageY) !== undefined;
    });
  window.addEventListener ("click", function(e) {
      placeTaken = checkSpot(e.pageX, e.pageY) !== undefined;
    if(towerIsClicked){
      if(MapSelected[Math.floor(e.pageY/50)][Math.floor(e.pageX/50)] == 1){
        if(!placeTaken){
            towerIsClicked = false;
            towers.push(new DartMonkey(e.pageX-25, e.pageY-25, frame, towers.length));
            Money -= dartMonkey.price;
            document.body.style.cursor = "default";
        }
      }
    }
  });
}
