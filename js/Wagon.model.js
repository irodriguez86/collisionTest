/**
 * Created with JetBrains PhpStorm.
 * User: Socket
 * Date: 8/01/14
 * Time: 21:28
 * To change this template use File | Settings | File Templates.
 */
var Wagon = function () {
    this.img        = undefined;
    this.animation  = undefined;
    this.container  = undefined;

    this.init = function () {
        this.container = new createjs.Container();
        //this.img = new createjs.Bitmap(queue.getResult('wagon'));
        //this.container.addChild(this.img);

        var data = {
            images: ['img/sprite_car.png'],
            frames: {width:230, height:150},
            animations:  {
                run:{ frames : [0,1,2], speed:.4, next: "run" },
                stopped: { frames : [0] }
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        this.animation = new createjs.Sprite(spriteSheet, "run");

        this.container.addChild(this.animation);
        this.container.x = 100;
        this.container.y = 870;
        stage.addChild(this.container);
        this.animation.stop();
    };

    this.move = function (side){
        this.animation.play();
        if(side == 'left'){
            this.animation.x -= 12;
        }else if(side == 'right'){
            this.animation.x += 12;
        }
        return this;
    };

    this.stop = function () {
        this.animation.stop();
    };

    this.init();
    return this;
};