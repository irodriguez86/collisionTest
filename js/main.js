/**
 * Created by IVY-CORP-PC001 on 17/12/13.
 */

var gameConfig = {
    pig: {
        width: 86,
        height: 64
    },
    maxPigs: 5
}

var pigs = [0];
var stage = undefined;
var canvas = undefined;
var circle,circle2,pig;
var queue;
var prueba = undefined;


function init(){

    canvas = document.getElementById("canvasTest");
    canvas.width = 1024;
    canvas.height = 768;
    stage = new createjs.Stage(canvas);

    //TODO Create decent preload
    queue = new createjs.LoadQueue();
    //queue.installPlugin(createjs.Sound);
    queue.on("complete", drawExample, this);
    //queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
    queue.loadManifest([
        {id: "pig1", src:"img/pig.png"},
        {id: "pig2", src:"img/Flying-Pig-Logo.png"},
        {id: "far",  src:"img/backgroundFarm.png"}
    ]);

    createjs.Ticker.setFPS(25);

}

function tick(event) {
    stage.update(event);
    pigs.forEach(function (pig){
       pig.restart++;
    })

}
function drawExample() {

    pigs[0] = new Pig().travel();
    stage.update(event);



//    createjs.Tween.get(pig).to({x: canvas.width + gameConfig.pig.width/2, y: gameConfig.pig.height/2 + 20, rotation: 360}, 2000);
    createjs.Ticker.addEventListener('tick',tick);
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
    init();
    //TODO create container
}
