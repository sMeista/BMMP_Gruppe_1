function Player() {

	this.x = 5;
	this.y = 3;
	this.onGround = false;
	this.maxSpeed =100;
	this.numFootContacts = 0;
	this.jumpTimeout = 0;

	//Create the physical player body
	var bodyDef = new b2d.b2BodyDef();
	bodyDef.position.Set(this.x,this.y);
	bodyDef.type = b2d.b2Body.b2_dynamicBody;
	bodyDef.fixedRotation = true;
	this.body = world.CreateBody(bodyDef);

	var shape = new b2d.b2PolygonShape();
	this.fixDef = new b2d.b2FixtureDef();
	this.boxWidth = 30.0/SCALE;
	this.boxHeight = 50.0/SCALE;
	this.fixDef.density = 10;
	this.fixDef.friction = 0.2;
	this.fixDef.restitution = 0.0;
	this.fixDef.shape = shape;

	shape.SetAsBox(this.boxWidth,this.boxHeight);
	this.fixture = this.body.CreateFixture(this.fixDef);

 	//setup the graphics
	this.image = new createjs.Shape();
	this.image.graphics.beginFill("#0ff").rect(0,0,this.boxWidth*2*SCALE,this.boxHeight*2*SCALE);
	stage.addChild(this.image);

	this.body.SetUserData("player");
	this.body.SetBullet(true);
	this.mass = this.body.GetMass();

	this.body.SetUserData("player");
}


Player.prototype.draw = function(){
	this.image.x = (this.x-this.boxWidth)*SCALE;
	this.image.y = (this.y-this.boxHeight)*SCALE;
}

Player.prototype.jump = function(){
	player.body.SetAwake(true);
	//if(this.onGround && this.jumpTimeout<=0){
		    player.body.ApplyImpulse( new b2d.b2Vec2(0,-this.mass*10), this.body.GetWorldCenter() );
		    this.jumpTimeout = 15;		    	
	//}	
}

Player.prototype.moveLeft = function(){
	player.body.ApplyForce( new b2d.b2Vec2(-100,0), this.body.GetWorldCenter() );
}

Player.prototype.moveRight = function(){
	player.body.ApplyForce( new b2d.b2Vec2(100,0), this.body.GetWorldCenter() );		
}

Player.prototype.moveDown = function(){
	if(!this.onGround)
	this.body.ApplyForce( new b2d.b2Vec2(0,200), this.body.GetWorldCenter() );		
}


Player.prototype.update = function() {
	this.moveDown();
	this.jumpTimeout --;

	if(this.numFootContacts<1){
		this.onGround = false;
	}else{
		this.onGround = true;
	}

	if (Key.isDown(Key.UP)) player.jump();
	if (Key.isDown(Key.DOWN)) player.moveDown();
	if (Key.isDown(Key.LEFT)) player.moveLeft();
	if (Key.isDown(Key.RIGHT)) player.moveRight();
	if (Key.isEmpty() && !this.onGround) {
	}

  	this.x = this.body.GetPosition().x;
  	this.y = this.body.GetPosition().y;

  	this.image.x = this.body.GetPosition().x;
  	this.image.y = this.body.GetPosition().y;

};


