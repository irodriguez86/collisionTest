var Pig = function () {
    this.img = undefined;
    this.container = undefined;
    this.finalX = 0;
    this.finalY = 0;
    this.restart = 0;
    this.animationTime = 1000;
    this.bounce = false;
    var self = this;

    this.travel = function () {
        if (this.restart < 0) setTimeout(function() { self.travel() }, getRandomInt(700,1400));
        else {
            //TODO change the algorithm to create new pigs
            if (this.finalX > canvas.width/2 && pigs.length < gameConfig.maxPigs) pigs[pigs.length] = new Pig().travel();
            if (this.finalX > canvas.width + gameConfig.pig.width){
                this.finalX = this.finalY = 0;
                this.container.scaleX = this.container.scaleY = getRandomInt(50,150)/100;
                this.container.x = -(gameConfig.pig.width*2);
                this.restart = -100;
                this.travel();
            } else {
                this.finalX += getRandomInt(180,200);
                if (this.bounce) {
                    this.finalY -= getRandomInt(20,80);
                        if (this.finalY - gameConfig.pig.height < 0) this.finalY = gameConfig.pig.height*this.container.scaleX;
                    this.bounce = false;
                } else {
                    this.bounce = true;
                    this.finalY += getRandomInt(20,80);
                    if (this.finalY + gameConfig.pig.height > 360) this.finalY = 360-gameConfig.pig.height;
                }
                createjs.Tween.get(this.container).to({x: this.finalX, y: this.finalY}, this.animationTime).call(this.travel,[],this);
            }

        }
        return this;
    };

    this.init = function() {
        this.container = new createjs.Container();
        this.img = new createjs.Bitmap(queue.getResult('pig1'));
        var width = gameConfig.pig.width/2;
        var height = gameConfig.pig.height/2;
        this.img.set({regX: width,regY: height,x: width + 20,y: height + 20})
        this.container.addChild(this.img);
        stage.addChild(this.container);
        this.container.addEventListener("click", function(event) { createjs.Sound.play("soundPig1"); })
        return this;
    };
    this.show = function() {
        this.container.visible = true;
        return this;
    };
    this.hide = function() {
        this.container.visible = false;
        return this;
    };
    this.checkIntersection = function(rect1,rect2) {
        if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height ||
             rect1.y + rect1.height <= rect2.y ) return false;
        return true;
    }
    this.init();
    return this;
}
