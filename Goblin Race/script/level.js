﻿function Level() {

    this.style = "rainbow"; // options : sky, green,cave, rainbow 
    this.last_bg = "0"; //last added imagepart
    this.last_mg = "0"; // 0 = start, 1 = middle, 2 = end
    this.last_fg = "0";
    this.bg_im; //last added image
    this.mg_im;
    this.fg_im;

    /* The old way to do it
    this.bg = new createjs.Bitmap(queue.getResult("bg"));
    //this.mg = new createjs.Bitmap(queue.getResult("mg"));
    this.fg = new createjs.Bitmap(queue.getResult("fg"));
    */

    this.bg = new Array();
    //this.mg = new Array();
    this.fg = new Array();

    this.BG_ELEMENTS = 3;
    this.PL_ELEMENTS = 15;
   
    this.platforms = new Array();
    this.plat;
    this.initialize();
}

Level.prototype.initialize = function () {

    //setup Background
    this.bg_im = new createjs.Bitmap(queue.getResult("bg_rainbow_2"));
    this.bg[0] = this.bg_im;
    this.fg_im = new createjs.Bitmap(queue.getResult("fg"));
    this.fg[0] = this.fg_im;
    stage.addChildAt(this.bg[0],0);
    stage.addChildAt(this.fg[0],2);

    //Startplatform
    this.plat = new Platform(352 / SCALE, 500 / SCALE, 10); 
    this.platforms.push(this.plat);
}

Level.prototype.generateLevel = function () {

    while (this.platforms.length <= this.PL_ELEMENTS) {
        var randomSign = Math.random();
        //console.log(this.plat.x);
        //console.log(this.platforms.length);
        //console.log(this.plat.body.GetPosition().y);
        var lastX = this.plat.body.GetPosition().x * SCALE;
        var lastY = this.plat.body.GetPosition().y * SCALE;
        var tiles = Math.floor(Math.random() * (game.TILES_MAX - game.TILES_MIN + 1) + game.TILES_MIN);
        var newX = lastX + Math.floor(Math.random() * (game.HORIZONTAL_MAX - game.HORIZONTAL_MIN + 1)) + game.HORIZONTAL_MIN
            + (this.plat.tiles * this.plat.segmentSize) / 2 + (tiles * this.plat.segmentSize) / 2;

        if (randomSign < lastY / stage.canvas.height) {
            var newY = lastY - Math.random() * game.VERTICAL;
        }
        else {
            var newY = lastY + Math.random() * game.VERTICAL;
        }

        if (newY > stage.canvas.height - this.plat.segmentHeight) {
            newY -= game.VERTICAL;
        }
        else if (newY < this.plat.segmentHeight + 4 * game.VERTICAL) {
            newY += 2 * game.VERTICAL;
        }

        //console.log(lastX + " : " + lastY + " : " + newX + " : " + newY);
        this.plat = new Platform(newX / SCALE, newY / SCALE, tiles)
        this.platforms.push(this.plat);
    }
}

Level.prototype.updatePlatforms = function () {
    for (var i = 0; i < this.platforms.length; i++) {

        this.platforms[i].update();

        if (this.platforms[i].body.bitmaps[0].x < -stage.canvas.width) {
            stage.removeChild(this.platforms[i]);
            this.platforms.splice(i, 1);
        }
    }
}

Level.prototype.generateBackground = function () {

    //add new Background
    while (this.bg.length < this.BG_ELEMENTS) {
        var newX = this.bg_im.x + this.bg_im.image.width - 1;
        if (this.last_bg == 1) {
            this.last_bg = Math.floor(this.lst_bg + Math.random() + 0.5);
        }
        else this.last_bg = (this.last_bg + 1) % 3;
        var url;
        if (this.last_bg == 1) {
            var pic;
            var random = Math.random();
            if (random > 0.66)
                pic = 3;
            else if (random > 0.33)
                pic = 2;
            else pic = 1;	
            url = queue.getResult("bg_" + this.style +"_"+ pic);
        }
        else if (this.last_bg == 0) {
            var random = Math.random();
            /* Sobald alle stile verfügbar !
            if (random > 0.75) this.style = "green";
            else if (random > 0.5) this.style = "sky";
            else if (random > 0.25) this.style = "rainbow";
            else this.style = "cave"; */
            url = queue.getResult("bg_" + this.style + "_start");
        }
        else {
            url = queue.getResult("bg_" + this.style+"_end");
        }        
        this.bg_im = new createjs.Bitmap(url);
        this.bg.push(this.bg_im);
        stage.addChildAt(this.bg_im,0);
        this.bg_im.x = newX;
    }

    while (this.fg.length < 3) {
        this.fg_im = new createjs.Bitmap(queue.getResult("fg"));
        this.fg.push(this.fg_im);
        stage.addChildAt(this.bg_im, 2);
        this.bg_im.x = newX;
    }

    //setup correct order!!!

}

Level.prototype.updateBackground = function () {

    //move images
    for (i = 0; i < this.BG_ELEMENTS; i++) {
        this.bg[i].x += game.bg_speed;
        //this.mg[i].image.x += game.mg_speed;
        this.fg[i].x += game.fg_speed;
    }

    //remove images out of bounds
    for (i = 0; i < this.BG_ELEMENTS; i++) {
        if (this.bg[i].x <-4000 ){// -this.bg[i].image.width) {
            stage.removeChild(this.bg[i]);
            this.bg.splice(i, 1);
        }
        /*if (this.mg[i].x < -this.mg[i].image.width) {
            stage.removeChild(this.mg[i]);
            this.mg.splice(i, 1);
        }*/
        if (this.fg[i].x < -this.fg[i].image.width) {
            stage.removeChild(this.fg[i]);
            this.fg.splice(i, 1);
        }
    }

}