/**
 * Created by IVY-CORP-PC001 on 17/12/13.
 */

var stage = undefined;
var canvas = undefined;
var circle,circle2;
var prueba = undefined;


function handleComplete() {
    createjs.Sound.play("sound");
    var image = queue.getResult("pig1");
    document.body.appendChild(image);
}

function init(){

    canvas = document.getElementById("canvasTest");
    canvas.width = 1024;
    canvas.height = 768;
    stage = new createjs.Stage(canvas);

    var queue = new createjs.LoadQueue();
    //queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    //queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
    queue.loadManifest([
        {id: "pig1", src:"img/pig.png"},
        {id: "pig2", src:"img/Flying-Pig-Logo.png"},
        {id: "far",  src:"img/backgroundFarm.png"}
    ]);


    createjs.Ticker.setFPS(25);

}

function tick(event) {
    circle.alpha = .2;
    circle2.rotation += 3;

    var pt = circle2.localToLocal(96, 0, circle);
    if(circle.hitTest(pt.x, pt.y)) circle.alpha = 1;
    stage.update(event);
}
function drawExample    () {
    circle = stage.addChild(new createjs.Shape()) ;
    circle.graphics.beginFill('red').drawCircle(50, 50, 50);
    circle.set({x:0, y:0, alpha: 0.2});

    circle2 = stage.addChild(new createjs.Shape()) ;
    circle2.graphics.beginFill("black").drawRect(-2,-2,100,4)
           .beginFill("blue").drawCircle(100,0,8);

    circle2.set({x:200, y:250, alpha: 1});
    stage.update(event);

    createjs.Ticker.addEventListener('tick',tick);
}
function main() {
    init();
    drawExample();
}
