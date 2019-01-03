var dartMonkeyImg = new Image();
dartMonkeyImg.src = "./Assets/Sprites/DartMonkey.png";

var towers = new Array();

var Darts = new Array();

var towerIsClicked = false;

var placingTower;


var hoverX = 0;
var hoverY = 0;

var placeTaken = false;
var clickX;
var clickY;
window.addEventListener("click", function(e) {
    clickX = e.pageX;
    clickY = e.pageY;
    
    if(!towerIsClicked) {
      checkSpot(clickX, clickY);
      if(placeTaken){
        var tower = checkSpot(clickX, clickY);
        console.log(tower.x +", "+tower.y);
      }
    }

    if (clickX >= 1200 && clickX <= 1250 && clickY >= 100 && clickY <= 150 && Money >= DartMonkeyPrice) ClickedOnDartMonkey();
});
window.addEventListener("keydown", function(e) {
    if (e.keyCode === 81 && Money >= DartMonkeyPrice) {
        ClickedOnDartMonkey();
    }
    if (e.keyCode === 27) {
        document.body.style.cursor = "default";
        towerIsClicked = false;
    }
});



function checkSpot(x, y) {
    return towers.find(tower =>
        x >= tower.x && x <= tower.x + 50 && y >= tower.y && y <= tower.y + 50);
}


function towerSelcted(){
  
}


function displayTowers() {
    context.drawImage(dartMonkeyImg, 1200, 100, 60, 60);
    let shadeBlack = !placeTaken && MapSelected[Math.floor(hoverY/50)][Math.floor(hoverX/50)] == 1;
    var Color = 'rgb(255, 0, 0, 0.52)';
    if (towerIsClicked) {
        context.drawImage(placingTower, hoverX - 25, hoverY - 25, 50, 50);
        Color = 'rgb(0, 0, 0, 0.5)';
                switch (shadeBlack) {
            case false:
                Color = 'rgb(255, 0, 0, 0.52)';
                break;
            case true:
                Color = 'rgb(0, 0, 1, 0.5)';
        }
        if(shadeBlack) {color = "rgb(255, 0, 0, 0.52)"} else  Color = 'rgb(255, 0, 1, 0.52)';
        context.arc(hoverX, hoverY, 200, 0, 2 * Math.PI, false);
        context.fillStyle = Color;
        context.fill();
    }


}
function checkDarts(){
      for (let T = 0; T < towers.length; T++) {
        towers[T].draw();
        for (let B = 0; B < Bloons.length; B++) {
            let dx = towers[T].x - Bloons[B].x;
            let dy = towers[T].y - Bloons[B].y;
            let Distance = Math.sqrt(dx * dx + dy * dy);

            if (Distance <= towers[T].range + 50) {
                towers[T].shoot(Bloons[B].x, Bloons[B].y);
            }
        }
    }
    for (let D = 0; D < Darts.length; D++) {
        Darts[D].animate();
        for (let B = 0; B < Bloons.length; B++){

            context.font = "50px Comic Sans MS";
            if(Darts[D].Dx + 10 >= Bloons[B].x && Darts[D].Dx <= Bloons[B].x + 50 && Darts[D].Dy + 10>= Bloons[B].y && Darts[D].Dy <= Bloons[B].y + 50){
                Bloons[B].level--;
                Money++;
                Darts[D].pierce--;
                if(Darts[D].pierce <= 0) {Darts.splice(D, 1); break}
                  let dx = Darts[D].sx - Darts[D].Dx;
                  let dy = Darts[D].sy - Darts[D].Dy;
                  let Distance = Math.sqrt(dx * dx + dy * dy);
                if(Distance >= Darts[D].range) {Darts.splice(D, 1); break}
            }
        }
    }
}

const Dart = function(Sx, Sy, Bx, By, pierce, range, layers) {
        this.Dx = Sx;
        this.Dy = Sy; //Dx/Dy is where to draww
    this.animate = function() {
        this.pierce = pierce;this.range = range; this.layers = layers;
        this.sx = Sx; this.sy = Sy;
        var Nx = Bx - Sx; //Sx/Sy is where it starts, so from the dart monkey
        var Ny = By - Sy; //Nx/Ny is the new x/y, so t,he slope, here is where it misses because its not in simplest form
        var oneX = 0;
        var oneY = 0;
        
        this.Dx += Nx*0.1;
        this.Dy += Ny*0.1;
        
        context.fillRect(this.Dx, this.Dy, 10, 10);
    };
};
