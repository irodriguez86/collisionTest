/**
 * Created by IVY-CORP-PC001 on 17/12/13.
 */

var stage = undefined;

function init(){
    var canvas = document.getElementById("canvasTest");
    canvas.width = 1024;
    canvas.height = 768;
    stage = new createjs.Stage(canvas);
}
function drawExample() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill('brown').drawCircle(0,0,50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
}

function main() {
    init();
    drawExample();
}