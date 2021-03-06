﻿function Level() {

    this.style = "cloud"; // options : cloud, cave, rainbow 
    this.last_bg = 3; //last added image-part  0 = start, 1 = middle, 2 = end, 3 = wiese
    this.last_mg = 2; // 0 = start, 1 = middle, 2 = end
    this.last_fg = 2; // 0 = start, 1 = middle, 2 = end
    this.bg_im; //last added image
    this.mg_im;
    this.fg_im;

    /* The old way to do it
    this.bg = new createjs.Bitmap(queue.getResult("bg"));
    //this.mg = new createjs.Bitmap(queue.getResult("mg"));
    this.fg = new createjs.Bitmap(queue.getResult("fg"));
    */

    this.bg = new Array();
    this.mg = new Array();
    this.fg = new Array();

    this.BG_ELEMENTS = 2;
    this.PL_ELEMENTS = 7;
   
    this.platforms = new Array();
    this.plat;
    this.lastYPlat;

    this.coins = new Array();
    this.coin;

    this.bubbles = new Array();
    this.bubble;


    this.initialize();
}

Level.prototype.initialize = function () {

    //setup Background
    this.bg_im = new createjs.Bitmap(queue.getResult("bg_wiese"));
    this.bg[0] = this.bg_im;
    this.bg_im.name = "bg_wiese";
    this.mg_im = new createjs.Bitmap(queue.getResult("mg_wiese"));
    this.mg[0] = this.mg_im;
    this.mg_im.name = "mg_wiese";
    this.fg_im = new createjs.Bitmap(queue.getResult("fg_wiese"));
    this.fg_im.name = "fg_wiese";
    this.fg[0] = this.fg_im;
    stage.addChildAt(this.bg[0], 0);
    stage.addChildAt(this.mg[0], 1)
    stage.addChildAt(this.fg[0],2);
    

    //Startplatform
    this.plat = new Platform(352 / SCALE, 500 / SCALE, 10,"wiese"); 
    this.platforms.push(this.plat);

    //StartCoin
    this.coin = new Coin(700 / SCALE, 300 / SCALE); 
    this.coins.push(this.coin);

    //this.bubble = new Bubble(352 / SCALE, 500 / SCALE); 
    //this.bubbles.push(this.bubble);
}

Level.prototype.generateLevel = function () {

    while (this.platforms.length <= this.PL_ELEMENTS) {
        var randomSign = Math.random();
        var lastXPlat = this.plat.body.GetPosition().x * SCALE;
        this.lastYPlat = this.plat.body.GetPosition().y * SCALE;
        var tiles = Math.floor(Math.random() * (game.tiles_max - game.tiles_min + 1) + game.tiles_min);
        var newXPlat = lastXPlat + Math.floor(Math.random() * (game.horizontal_max - game.horizontal_min + 1)) + game.horizontal_min
            + (this.plat.tiles * this.plat.segmentSize) / 2 + (tiles * this.plat.segmentSize) / 2;

        if (randomSign < this.lastYPlat / stage.canvas.height) {
            var newYPlat = this.lastYPlat - Math.random() * game.vertical;
        }
        else {
            var newYPlat = this.lastYPlat + Math.random() * game.vertical;
        }

        if (newYPlat > stage.canvas.height - this.plat.segmentHeight) {
            newYPlat -= game.vertical;
        }
        else if (newYPlat < this.plat.segmentHeight + 4 * game.vertical) {
            newYPlat += 2 * game.vertical;
        }
        this.plat = new Platform(newXPlat / SCALE, newYPlat / SCALE, tiles, this.getPlatStyleAt(newXPlat));
        this.platforms.push(this.plat);
    }

        //Coins
        this.generateCoins();
     
        //Bubbles

        this.generateBubble();

     
}

Level.prototype.generateBubble = function() {
            /*
        var randomSign = Math.random();

        var lastXBubble = this.bubble.body.GetPosition().x * SCALE;
        var lastYBubble = this.bubble.body.GetPosition().y * SCALE;
        var newXBubble = lastXBubble + Math.floor(Math.random() * (game.HORIZONTAL_MAX - game.HORIZONTAL_MIN + 1)) + game.HORIZONTAL_MIN
            + (this.bubble.segmentSize) / 2 + (this.bubble.segmentSize) / 2;     

        var newYBubble = lastYBubble; */
        while(this.bubbles.length <= 1){        
        
        this.bubble = new Bubble(9000 / SCALE, 500 / SCALE);
        this.bubbles.push(this.bubble);
     
    }
}

Level.prototype.generateCoins = function() {
    while(this.coins.length < 20){
        var randomSign = Math.random();

        var lastXCoin = this.coin.body.GetPosition().x * SCALE;
        var lastYCoin = this.coin.body.GetPosition().y * SCALE;
        var newXCoin = lastXCoin + Math.floor(Math.random() * (game.HORIZONTAL_MAX - game.HORIZONTAL_MIN + 1)) + game.HORIZONTAL_MIN
            + (this.coin.segmentSize) / 2 + (this.coin.segmentSize) / 2;     

        newYCoin = this.lastYPlat - 200;

        var randomCoins = Math.floor(Math.random() * 6)+1;
        var newXCoinRand = newXCoin;
        for(var i = 0; i<randomCoins; i++){
        newXCoinRand +=80;
        this.coin = new Coin(newXCoinRand / SCALE, newYCoin / SCALE);
        this.coins.push(this.coin);
    }
}
}

Level.prototype.updatePlatforms = function () {
    for (var i = 0; i < this.platforms.length; i++) {
        this.platforms[i].update();
        if (this.platforms[i].body.bitmaps[0].x < -this.plat.segmentSize * (game.tiles_max+3) ) {
            this.platforms[i].remove();        
            this.platforms.splice(i, 1);
        }
    }
}

Level.prototype.updateCoins = function () {
    for (var i = 0; i < this.coins.length; i++) {
        this.coins[i].update();
        if (this.coins[i].body.bitmap.x < -100) {
            this.coins.splice(i, 1);
            this.coins[i].remove();
        }
    }
}

Level.prototype.updateBubbles = function () {

    for (var i = 0; i < this.bubbles.length; i++) {
        this.bubbles[i].update();
        if (this.bubbles[i].body.bitmap.x < -50) {        
            stage.removeChild(this.bubbles[i]);            
            deleteArray.push(this.bubbles[i]);
            this.bubbles.splice(i,1);
            
        }
    }
}

Level.prototype.generateBackground = function () {

    //add new Background
    while (this.bg.length < this.BG_ELEMENTS) { 
        var newX = this.bg_im.x + this.bg_im.image.width - 1;
        if (this.last_bg == 1 || this.last_bg == 3) {
            this.last_bg = Math.floor(this.last_bg + Math.random() + 0.5)%4;
        }
        else this.last_bg = (this.last_bg + 1)%4 ;
        var url;
        if (this.last_bg == 1) {	
            url = "bg_" + this.style;
        }
        else if (this.last_bg == 0) {
            var random = Math.random();
            //Sobald alle stile verfügbar !
            if (random > 0.66) this.style = "cloud";
            else if (random > 0.33) this.style = "rainbow";
            else this.style = "cave"; 
            url = "bg_" + this.style + "_start";
        }
        else if (this.last_bg == 3) {
            url = "bg_wiese";
        }
        else {
            url = "bg_" + this.style + "_end";
        }
        this.bg_im = new createjs.Bitmap(queue.getResult(url));
        this.bg_im.name = url;
        console.log(url);
        this.bg.push(this.bg_im);
        stage.addChildAt(this.bg_im,0);
        this.bg_im.x = newX;
    }

    //add new midground
    while (this.mg.length < this.BG_ELEMENTS) {
        var newX = this.mg_im.x + this.mg_im.image.width - 9;
        var lastStyle;
        if (this.mg_im.name.indexOf("end") != -1)
            lastStyle = "wiese";
        else if (this.mg_im.name.indexOf("rainbow") != -1)
            lastStyle = "rainbow";
        else if (this.mg_im.name.indexOf("cloud") != -1)
            lastStyle = "cloud";
        else if (this.mg_im.name.indexOf("cave") != -1)
            lastStyle = "cave";
        else 
            lastStyle = "wiese"; //more to come
        var url;
        if (lastStyle != this.getStyleAt(newX)) {
            if (lastStyle == "wiese") {
                url = "mg_" + this.getStyleAt(newX) + "_start";
                this.last_mg = 0;
            }
            else {
                if (this.last_mg == 0) {
                    url = "mg_" + this.getStyleAt(newX) + "_start"; //Cahnged
                    this.last_mg = 0;
                }
                else {
                    if (this.getStyleAt(newX) == "wiese") {
                        url = "mg_" + lastStyle + "_end";
                        this.last_mg = 2
                    }
                    else {
                        url = "mg_" + this.getStyleAt(newX) + "_start";
                        this.last_mg = 0;
                    }
                }
            }
        }
        else {
            url = "mg_" + lastStyle;
            this.last_mg = 1;
        }
        console.log(url);
        this.mg_im = new createjs.Bitmap(queue.getResult(url));
        this.mg_im.name = url;
        this.mg.push(this.mg_im);
        stage.addChildAt(this.mg_im, 2);
        this.mg_im.x = newX;
    }


    //add new forground
    while (this.fg.length < this.BG_ELEMENTS) {
        var newX = this.fg_im.x + this.fg_im.image.width - 1;
        var lastStyle;
        if (this.fg_im.name.indexOf("end") != -1)
            lastStyle = "wiese";
        else if (this.fg_im.name.indexOf("rainbow") != -1)
            lastStyle = "rainbow";
        else if (this.fg_im.name.indexOf("cloud") != -1)
            lastStyle = "cloud";
        else if (this.fg_im.name.indexOf("cave") != -1)
            lastStyle = "cave";
        else
            lastStyle = "wiese"; //more to come
        var url;
      
        if (lastStyle != this.getStyleAt(newX)) {
            if (lastStyle == "wiese") {
                url = "fg_" + this.getStyleAt(newX) + "_start";
                this.last_fg = 0;
            }
            else {
                if (this.last_fg == 0) {
                    url = "fg_" + this.getStyleAt(newX) + "_start";
                    this.last_fg = 0;
                }
                else {
                    if (this.getStyleAt(newX) == "wiese") {
                        url = "fg_" + lastStyle + "_end";
                        this.last_fg = 2;
                    }
                    else {
                        url = "fg_" + this.getStyleAt(newX) + "_start";
                        this.last_fg = 0;
                    }
                }
            }
        }
        else {
            url = "fg_" + lastStyle;
            this.last_fg = 1;
        }
        console.log(url);
        this.fg_im = new createjs.Bitmap(queue.getResult(url));
        this.fg_im.name = url;
        this.fg.push(this.fg_im);
        stage.addChildAt(this.fg_im, 4); 
        this.fg_im.x = newX;
    }
}

Level.prototype.updateBackground = function () {

    //move images
    for (var i = 0; i < this.BG_ELEMENTS; i++) {
        this.bg[i].x += game.bg_speed;
        this.mg[i].x += game.mg_speed;
        this.fg[i].x += game.fg_speed;
    }

    //remove images out of bounds
    for (var i = 0; i < this.BG_ELEMENTS ; i++) {
        if (this.bg[i] != undefined && this.bg[i].x < -(this.bg[0].image.width)) {
            stage.removeChild(this.bg[i]);
            this.bg.splice(i, 1);
            deleteArray.push(this.bg[i]);
        }
        if (this.mg[i] != undefined && this.mg[i].x < -this.bg[0].image.width) {
            stage.removeChild(this.mg[i]);
            this.mg.splice(i, 1);
            deleteArray.push(this.mg[i]);
        }
        if (this.fg[i] != undefined && this.fg[i].x < -(this.bg[0].image.width)) {
            stage.removeChild(this.fg[i]);
            this.fg.splice(i, 1);
            deleteArray.push(this.fg[i]);
        }
    }
}

Level.prototype.getStyleAt = function (pos) {
    var str = this.bg_im.image.src.split("/")[this.bg_im.image.src.split("/").length - 1]
    if (str.indexOf("end") != -1)
        return "wiese";
    if (str.indexOf("rainbow") != -1)
        return "rainbow";
    else if(str.indexOf("cloud") != -1)
        return "cloud";
    else if(str.indexOf("cave") != -1)
        return "cave";
    else return "wiese";
}

Level.prototype.getPlatStyleAt = function (pos) {
    var offset = 100; var mg = this.mg_im;
    for (var i = 0; i < this.BG_ELEMENTS ; i++) {
        if (this.mg[i].x < pos && this.mg[i].x + this.mg[i].image.width >= pos) {
            mg = this.mg[i];
        }
        }
    var str = mg.image.src.split("/")[mg.image.src.split("/").length - 1]
    if (pos < mg.x + mg.image.width / 3) {
        if (str.indexOf("start") != -1)
            return "wiese";
    }
    else if (pos > mg.x + mg.image.width / 2) {
    if (str.indexOf("end") != -1)
        return "wiese";
    }
    if (str.indexOf("rainbow") != -1)
        return "rainbow";
    else if (str.indexOf("cloud") != -1)
        return "cloud";
    else if (str.indexOf("cave") != -1)
        return "cave";
    else return "wiese";
    
}