﻿function Game() {

	this.bg_speed1 = -5;
	this.ground_speed = -25;

	this.bg = new createjs.Bitmap(queue.getResult("bg"));
	this.ground = new createjs.Bitmap(queue.getResult("ground"));
    this.c = new Char(); 
}

Game.prototype.handleTick = function () {

    this.bg.x += this.bg_speed1;
	this.ground.x += this.ground_speed;
   

    /*if (Key.isDown(Key.UP)) {
        char.jump();
        }
    if (Key.isDown(Key.DOWN)) {
        char.crouch();
        }
   if (Key.isDown(Key.RIGHT)) {
        char.run();
        }
    if (Key.isDown(Key.SPACE)) {
         char.special()
        }*/

}

Game.prototype.start = function(){

	stage.addChild(this.bg);
	stage.addChild(this.ground);
    stage.addChild(this.c.image);
	stage.update();

}