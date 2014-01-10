
/* ANIMATION ELEMENT */

var AnimElement = function(attr) {
    attr = typeof attr === "string" ? {id: attr} : attr;
    attr = typeof attr === "undefined" ? {} : attr;

    this.id = undefined
    this.src = undefined

    return this.extend(attr)
}
AnimElement.prototype = new BaseObject()

AnimElement.prototype.getElement = function () {
    return (this.id) ? wingo.loader.getElement(this.id) : false
}

AnimElement.prototype.getAnimation = function (start, data) {
    var config = {x: 0, y: 0}

    if (this.src) return this.src
    else {
        if (!data.images && this.id) data.images = [queue.getResult('wagon')]
        var spriteSheet = new createjs.SpriteSheet(data)
        var animation = new createjs.Sprite(spriteSheet, start)
        if (config[this.id]) animation.set(this.cleanConfig(config[this.id]))
        return animation
    }
}

AnimElement.prototype.animate = function (start, data, stage) {
    stage = stage || window.stage

    if (!this.src) this.src = this.getAnimation(start, data)
    this.stageObj = stage.addChild(this.src)

    return this
}

AnimElement.prototype.play = function (animation) {
    this.stageObj.gotoAndPlay(animation)
    return this
}

AnimElement.prototype.stop = function (animation) {
    this.stageObj.gotoAndStop(animation)
    return this
}
