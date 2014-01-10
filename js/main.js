/**
 * Created by IVY-CORP-PC001 on 17/12/13.
 */
//github with advanced collision detection https://github.com/olsn/Collision-Detection-for-EaselJS

var wagonObj;
var gameConfig = {
    pig: {
        width: 86,
        height: 64
    },
    maxPigs: 5,
    loader: {
        loadProgressLabel: undefined,
        loadingBarContainer: undefined,
        loadingBarHeight: 20,
        loadingBarWidth: 300,
        LoadingBarColor: createjs.Graphics.getRGB(0,0,0),
        frame: undefined,
        padding: undefined
    }
};

var pigs = [0];
var stage = undefined;
var canvas = undefined;
var queue;

function createPreloadScreen(){
    gameConfig.loader.loadProgressLabel = new createjs.Text("","18px Verdana","black"); // create the text
    gameConfig.loader.loadProgressLabel.lineWidth = 200;
    gameConfig.loader.loadProgressLabel.textAlign = "center";
    gameConfig.loader.loadProgressLabel.x = canvas.width/2;
    gameConfig.loader.loadProgressLabel.y = canvas.height/2 - 60;
    stage.addChild(gameConfig.loader.loadProgressLabel);
    gameConfig.loader.loadingBarContainer = new createjs.Container();

    //create the loading bar
    gameConfig.loader.loadingBar = new createjs.Shape();
    gameConfig.loader.loadingBar.graphics.beginFill(gameConfig.loader.LoadingBarColor).drawRect(0, 0, 1,
        gameConfig.loader.loadingBarHeight).endFill();

    //create the frame
    gameConfig.loader.frame = new createjs.Shape();
    gameConfig.loader.padding = 3;
    gameConfig.loader.frame.graphics.setStrokeStyle(1).beginStroke(gameConfig.loader.LoadingBarColor).
        drawRect(-gameConfig.loader.padding/2, -gameConfig.loader.padding/2, gameConfig.loader.
            loadingBarWidth+gameConfig.loader.padding, gameConfig.loader.loadingBarHeight+gameConfig.loader.padding);

    //create container and add it to canvas
    gameConfig.loader.loadingBarContainer.addChild(gameConfig.loader.loadingBar, gameConfig.loader.frame);
    gameConfig.loader.loadingBarContainer.x = Math.round(canvas.width/2 - gameConfig.loader.loadingBarWidth/2);
    gameConfig.loader.loadingBarContainer.y = Math.round(canvas.height/2 - gameConfig.loader.loadingBarHeight/2);
    stage.addChild(gameConfig.loader.loadingBarContainer);
}

function handleProgress(event) {
    gameConfig.loader.loadingBar.scaleX = queue.progress * gameConfig.loader.loadingBarWidth;

    var progressPercentage = Math.round(queue.progress*100);
    gameConfig.loader.loadProgressLabel.text = progressPercentage + "% Loaded" ;

    stage.update();
}
function handleComplete(event) {
    gameConfig.loader.loadProgressLabel.text = "Loading complete click to start";
    stage.update();

    canvas.addEventListener("click", init);
}

function preload() {
    createPreloadScreen();

    queue = new createjs.LoadQueue();

    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);

    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);

    queue.loadManifest([
        {id: "pig1", src:"img/pig.png"},
        {id: "background", src:"img/backgroundFarm.png"},
        {id: "pig2", src:"img/Flying-Pig-Logo.png"},
        {id:"soundPig1", src:"sound/pig1.mp3"},
        {id:"wagon", src:"img/sprite_car.png"}
    ]);
}

function init(){
    canvas.style.backgroundImage = "url('img/backgroundFarm.png')";
    canvas.style.backgroundSize = "cover";

    createjs.Ticker.setFPS(25);

    //remove preloadScreen and the bind
    stage.removeChild(gameConfig.loader.loadProgressLabel, gameConfig.loader.loadingBarContainer);
    canvas.removeEventListener("click", init);

    drawPig();
    wagonObj = new Wagon();
    createjs.Ticker.addEventListener('tick',tick);

}

function tick(event) {
    stage.update(event);
    pigs.forEach(function (pig){
       pig.restart++;
    })

    document.onkeydown = handleKeydown;
    document.onkeyup = handleKeyup;

}

function handleKeydown (e) {
    if(e.keyCode == 37){
        wagonObj.move('left')
    }else if(e.keyCode == 39){
        wagonObj.move('right')
    }
}

function handleKeyup () {
    wagonObj.stop();
}

function drawPig() {
    pigs[0] = new Pig().travel();
    //stage.update(event);
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
    canvas = document.getElementById("canvasTest");
    stage = new createjs.Stage(canvas);
    preload();
    //TODO create container
}
