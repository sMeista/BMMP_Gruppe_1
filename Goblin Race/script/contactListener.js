function ContactListener(){
	
	this.listener = new b2d.b2ContactListener;
    
    this.listener.BeginContact = function(contact) {
        var shape1 = contact.GetFixtureA();
		var shape2 = contact.GetFixtureB();

		var dir1 = shape1.GetBody().GetLinearVelocity().y;
		var dir2 = shape2.GetBody().GetLinearVelocity().y;


		
		if(shape1.GetBody().GetUserData() =="coin"){
			if(localStorage.getItem("sound") == 1){
				game.coinSound.play();
			}
			
			deleteArray.push(shape1.GetBody());
			stage.removeChild(shape1.GetBody().bitmap);
			player.createCountParticle();
			level.count();
		}
		else if(shape2.GetBody().GetUserData() == "coin"){
			if(localStorage.getItem("sound") == 1){
				game.coinSound.play();
			}
			
			deleteArray.push(shape2.GetBody());
			stage.removeChild(shape2.GetBody().bitmap);
			player.createCountParticle();
			level.count();
		}


		else if(shape1.GetBody().GetUserData() =="bubble"){			
	
			deleteArray.push(shape1.GetBody());
			stage.removeChild(shape1.GetBody().bitmap);
			isFlying = true;
			console.log("preBubble-----:"+ dir2);
			//runter
			if(shape2.GetBody().GetLinearVelocity().y > 0){
				console.log("bubble2 - runter-----:"+ dir2);
					player.setFly(shape2.GetBody().GetLinearVelocity().x,dir2*-15);
					console.log("angewendet: "+shape2.GetBody().GetLinearVelocity().x + "___" + dir2*-15);
					dir2 = 0;
			}
			//rauf
			else if(shape2.GetBody().GetLinearVelocity().y < 0){
				console.log("bubble2 - rauf-----:"+ dir2);
					player.setFly(shape2.GetBody().GetLinearVelocity().x,dir2*-2);
					console.log("angewendet: "+shape2.GetBody().GetLinearVelocity().x + "___" + dir2*-5);
					dir2 = 0;
			//nach vorn/hinten	
			}
			else if (shape2.GetBody().GetLinearVelocity().y == 0){
				console.log("bubble2 - normal-----:"+ dir1);
				player.setFly(0,-20);
			}

		}

		else if(shape2.GetBody().GetUserData() == "bubble"){

			deleteArray.push(shape2.GetBody());
			stage.removeChild(shape2.GetBody().bitmap);
			isFlying = true;
			console.log("preBubble-----:"+ dir1);
			//runter
			if(shape1.GetBody().GetLinearVelocity().y > 0){
				console.log("bubble1 - runter-----:"+ dir1);
				player.setFly(shape1.GetBody().GetLinearVelocity().x,dir1*-15);
				console.log("angewendet: "+shape1.GetBody().GetLinearVelocity().x + "___" + dir1*-15);
				dir1 = 0;
			}
			//rauf
			else if(shape1.GetBody().GetLinearVelocity().y < 0){
				console.log("bubble1 - rauf-----:"+ shape1.GetBody().GetLinearVelocity().y);
				player.setFly(shape1.GetBody().GetLinearVelocity().x,dir1*-5);
				console.log("angewendet: "+shape1.GetBody().GetLinearVelocity().x + "___" + dir1*-5);
				dir1 = 0;
			//nach vorn/hinten	
			}
			else if (shape1.GetBody().GetLinearVelocity().y == 0){
				console.log("bubble1 - normal-----:"+ dir1);
				player.setFly(0,-20);
			}

		}

		else if(shape1.GetBody().GetUserData() =="candy"){
			if(localStorage.getItem("sound") == 1){
				if(Math.random() > 0.5){
					game.candySound1.play();
				}else{
					game.candySound2.play();
				}
			}
			
			deleteArray.push(shape1.GetBody());
			stage.removeChild(shape1.GetBody().bitmap);
			isCandy = true;
			console.log("candy!!");
		}
		else if(shape2.GetBody().GetUserData() == "candy"){
			if(localStorage.getItem("sound") == 1){
				if(Math.random() > 0.5){
					game.candySound1.play();
				}else{
					game.candySound2.play();
				}
			}
			
			deleteArray.push(shape2.GetBody());
			stage.removeChild(shape2.GetBody().bitmap);
			isCandy = true;
			console.log("candy!!");
		}

		else if(isFlying && shape1.GetBody().GetUserData() == "platform"){
			player.setRunning();
			isFlying = false;
			player.numFootContacts++;
			console.log(isFlying + "plattform");
		}
		else if(isFlying && shape2.GetBody().GetUserData() == "platform"){
			player.setRunning();
			isFlying = false;
			player.numFootContacts++;
			console.log(isFlying + "plattform");
		}

		else if(shape1.GetBody().GetUserData() == "platform"){
			player.numFootContacts++;	
		}else if(shape2.GetBody().GetUserData() == "platform"){
			player.numFootContacts++;
		}

    }

    this.listener.EndContact = function(contact) {
        var shape1 = contact.GetFixtureA();
		var shape2 = contact.GetFixtureB();

		if(shape1.GetBody().GetUserData() == "platform"){
			player.numFootContacts--;
		}else if(shape2.GetBody().GetUserData() == "platform"){
			player.numFootContacts--;
		}

    }

    this.listener.PostSolve = function(contact, impulse) {
    	var shape1 = contact.GetFixtureA();
		var shape2 = contact.GetFixtureB();
		


    }

    this.listener.PreSolve = function(contact, oldManifold) {
		
    }

    return this.listener;
}