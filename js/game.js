;(function(namespace, undefined){
	namespace.main = (function () {
		// Create the canvas
		canvas = document.createElement("canvas");
		ctx = freeElectron.canvas.getContext("2d");
		blockWidth = Math.floor(window.innerWidth/20);
		blockHeight = Math.floor(window.innerHeight/12);
		var b = blockHeight > blockWidth ? blockWidth: blockHeight;

		canvas.width = b*20;
		canvas.height = b*12;
		document.body.appendChild(canvas);

		// Game objects
		var data = {
			electron:{
				speed: b*8, // movement in pixels per second
				health: 100
			},
			exit: {},
			walls: [],
			activeWalls: [],
			exitIsActive: false,
			ctx: ctx,
			b: b,
			currentLevel:0,
			deathStartTime: 0,
			deathElapsedTime: 0,
			deathDuration: 500
		};
		
		 //TODO: you got as far as here!

		// //drawing reference
		// var drawActive = window.freeElectron.draw.drawActive,
		// 	drawBackground = window.freeElectron.draw.drawBackground,
		// 	drawDeathScene = window.freeElectron.draw.drawDeathScene,
		// 	drawElectron = window.freeElectron.draw.drawElectron,
		// 	drawEndScreen = window.freeElectron.draw.drawEndScreen,
		// 	drawExit = window.freeElectron.draw.drawExit,
		// 	drawHealth = window.freeElectron.draw.drawHealth,
		// 	drawScore = window.freeElectron.draw.drawScore,
		// 	drawStartScreen = window.freeElectron.draw.drawStartScreen,
		// 	drawWall = window.freeElectron.draw.drawWall;

		//levels
		var levels = window.freeElectron.map.levels,

		// Handle keyboard controls
		var keysDown = {};

		addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);

		addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
		}, false);

		// Reset the game when the player reaches the exit
		function reset() {

			//construct the level
			walls = [];
			for (var i = 0; i < 11; i++) {
				for (var j = 0; j < 20; j++) {
					if (levels[currentLevel][i][j] == 0) {
						walls.push({x:j*b,y:(i+1)*b});
					};
					if (levels[currentLevel][i][j] == 1) {
						electron.x = j*b;
						electron.y = (i+1)*b;
					};
					if (levels[currentLevel][i][j] == 2) {
						exit.x = j*b;
						exit.y = (i+1)*b;
					};
				};
			};
		};

		// Update game objects
		function update(modifier) {
			if (currentLevel === 0) {
				for(var prop in keysDown) {
				    if (keysDown.hasOwnProperty(prop)) {//any key
						currentLevel=1;
						reset();
				    };
				};
			} else if (electron.health > 0){
				if(27 in keysDown){ // Player holding Escape
					//TODO: quite blunt - needs work
					window.location.reload();
				}
				if (38 in keysDown) { // Player holding up
					electron.y -= electron.speed * modifier;
				}
				if (40 in keysDown) { // Player holding down
					electron.y += electron.speed * modifier;
				}
				if (37 in keysDown) { // Player holding left
					electron.x -= electron.speed * modifier;
				}
				if (39 in keysDown) { // Player holding right
					electron.x += electron.speed * modifier;
				}
				if (currentLevel === levels.length-1) {
					if (32 in keysDown) { // Player holding space
						currentLevel = 0;
						keysDown = {};				
						reset();
					}
				}

				//iterate through an array of walls, creating a single vector that modifies electron.x and electron.y
				var vector = {x:0,y:0};
				activeWalls = [];
				for (var i = walls.length - 1; i >= 0; i--) {

					var xd,yd,distanceSqr,attraction = 8;
					xd = walls[i].x - electron.x;
					yd = walls[i].y - electron.y;
					distanceSqr = (xd*xd) + (yd*yd);

					if (
						distanceSqr < (electron.speed*electron.speed) && //avoid Math.Sqrt as it's expensive
						distanceSqr > b/2) { //avoid low numbers as they will tend toward infinty when inverted
						var strength = electron.speed/distanceSqr; //the closer the wall, the higher the strength
						if (Math.abs(xd) > 1) {
							vector.x += xd*strength*modifier*attraction;
						};
						if (Math.abs(yd) > 1) {
							vector.y += yd*strength*modifier*attraction;
						};
						//if walls are closer than a certain distance, set their 'active' property to true
						if (distanceSqr < (0.2*(electron.speed*electron.speed))) {
							activeWalls.push({x:walls[i].x, y:walls[i].y, strength:strength});
						};
					} else {
						walls[i].active = false;
					};
				};

				//set electron position, limit to game area
				electron.x += vector.x;
				if (electron.x < 0)
					electron.x = 0;
				if (electron.x > canvas.width-b)
					electron.x = canvas.width-b;

				electron.y += vector.y;
				if (electron.y < b)
					electron.y = b;
				if (electron.y > canvas.height-b)
					electron.y = canvas.height-b;

				//adjust electron.health
				if (activeWalls.length) {
					for (var i = 0; i < activeWalls.length; i++) {
						electron.health -= (activeWalls[i].strength * modifier*50);//50 is abitrary
						if (electron.health < 0) {
							electron.health = 0;
							deathStartTime = Date.now();
							deathElapsedTime = 0;
						};
					};
				} else {
					electron.health += modifier;
					if (electron.health > 100) {
						electron.health = 100;
					};
				};

				// Is it touching the exit?
				var dx, dy, exitDistSqr;
				dx = exit.x - electron.x;
				dy = exit.y - electron.y;
				exitDistSqr = (dx*dx) + (dy*dy);
				if (exitDistSqr < ((b/2)*(b/2)))
					exitIsActive = true;
				else
					exitIsActive = false;
				if (exitDistSqr < ((b/3)*(b/3))){
					exitIsActive = false;
					++currentLevel;
					if (currentLevel == levels.length) {currentLevel = 0};//until start and end screens are sorted!
					reset();
					//TODO: implement scene change graphic - fade out/in, flash on level number, etc.
				};
			} else { 
				deathElapsedTime += modifier*1000;
				if (deathElapsedTime > deathDuration) {
					currentLevel--;
					deathStartTime = 0;
					deathElapsedTime = 0;
					electron.health = 100;
					reset();
				};
			};
		};

		// Draw everything
		function render() {
			//TODO: loading screen until fonts etc. are loaded
			if (fontsLoaded) {
				if (currentLevel === 0) { // start screen
					drawBackground();
					drawStartScreen();
					drawElectron();
					for (var i = 0; i < walls.length; i++) {
						drawWall(walls[i]);
					};
					drawExit();
				} else if (currentLevel === levels.length-1) { // end screen
					electron.health = 100;
					drawBackground();
					drawEndScreen();
					drawElectron();
				} else {
					drawBackground();
					drawScore();
					drawHealth();
					for (var i = 0; i < walls.length; i++) {
						drawWall(walls[i]);
					};
					drawElectron();
					for (var i = 0; i < activeWalls.length; i++) {
						drawActive(activeWalls[i]);
					};
					drawExit();
					if (electron.health == 0){
						drawDeathScene();
					};
				};
			};
		};

		// The main game loop
		function main() {
			var now = Date.now();
			var delta = now - then || 1;

			//pulse oscillator for render()
			iterator++;
			oscillator = Math.sin(iterator*2*Math.PI/delta)*(b/8) + (7*b/8);//oscillator will be between b*0.75 and b
			//delta is used as the update period here, but any number between 20 (fast) and 200 (slow) will do

			update(delta / 1000);
			render();

			then = now;

			// Request to do this again ASAP
			requestAnimationFrame(main);
		};

		// Cross-browser support for requestAnimationFrame
		var w = window;
		requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

		// Let's play this game!
		window.onload = function(){
			var then = Date.now(),
				iterator = 1,
				oscillator = 1;
			reset();
			main();
		};

		return {
			canvas: canvas,
			ctx: ctx,
			b: b,
			electron: electron,
			exit: exit,
			exitIsActive: exitIsActive,
			walls: walls,
			activeWalls: activeWalls,
			levels: levels,
			currentLevel : currentLevel,
			deathStartTime : deathStartTime,
			deathElapsedTime: deathElapsedTime,
			deathDuration: deathDuration,
			reset: reset,
			oscillator:oscillator
		};

	}();
})(window.freeElectron = window.freeElectron || {});