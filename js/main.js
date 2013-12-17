/**
 * Created by IVY-CORP-PC001 on 17/12/13.
 */

var stage = undefined;

function init(){
    var canvas = document.getElementById("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    stage = createjs.Stage(canvas);
}
function main() {
    init();
    drawExample();
}
function drawExample() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill('brown').drawCircle(0,0,50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
}

main();