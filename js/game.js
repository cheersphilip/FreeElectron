;(function(namespace, undefined){
	namespace.main = (function () {
		// Create the canvas
		var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d"),
			blockWidth = Math.floor(window.innerWidth/20),
			blockHeight = Math.floor(window.innerHeight/12),
			b = blockHeight > blockWidth ? blockWidth: blockHeight;

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
			canvas: canvas,
			ctx: ctx, //does this reference the right thing?
			b: b,
			currentLevel:0,
			deathStartTime: 0,
			deathElapsedTime: 0,
			deathDuration: 500, 
			then:0,
			iterator:0,
			oscillator:0
		};
		
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
			var levels = window.freeElectron.map.levels;
			
			//construct the level
			data.walls = [];
			for (var i = 0; i < 11; i++) {
				for (var j = 0; j < 20; j++) {
					if (levels[data.currentLevel][i][j] == 0) {
						data.walls.push({x:j*b,y:(i+1)*b});
					};
					if (levels[data.currentLevel][i][j] == 1) {
						data.electron.x = j*b;
						data.electron.y = (i+1)*b;
					};
					if (levels[data.currentLevel][i][j] == 2) {
						data.exit.x = j*b;
						data.exit.y = (i+1)*b;
					};
				};
			};
		};

		// Update game objects
		function update(modifier) {
			var levels = window.freeElectron.map.levels;

			if (data.currentLevel === 0) {
				for(var prop in keysDown) {
				    if (keysDown.hasOwnProperty(prop)) {//any key
						data.currentLevel=1;
						reset();
				    };
				};
			} else if (data.electron.health > 0){
				if(27 in keysDown){ // Player holding Escape
					//TODO: quite blunt - needs work
					window.location.reload();
				}
				if (38 in keysDown) { // Player holding up
					data.electron.y -= data.electron.speed * modifier;
				}
				if (40 in keysDown) { // Player holding down
					data.electron.y += data.electron.speed * modifier;
				}
				if (37 in keysDown) { // Player holding left
					data.electron.x -= data.electron.speed * modifier;
				}
				if (39 in keysDown) { // Player holding right
					data.electron.x += data.electron.speed * modifier;
				}
				if (data.currentLevel === levels.length-1) {
					if (32 in keysDown) { // Player holding space
						data.currentLevel = 0;
						keysDown = {};				
						reset();
					}
				}

				//iterate through an array of walls, creating a single vector that modifies electron.x and electron.y
				var vector = {x:0,y:0};
				data.activeWalls = [];
				for (var i = data.walls.length - 1; i >= 0; i--) {

					var xd, yd, distanceSqr, attraction = 8, speed = data.electron.speed;
					xd = data.walls[i].x - data.electron.x;
					yd = data.walls[i].y - data.electron.y;
					distanceSqr = (xd*xd) + (yd*yd);

					if (
						distanceSqr < (speed*speed) && //avoid Math.Sqrt as it's expensive
						distanceSqr > b/2) { //avoid low numbers as they will tend toward infinty when inverted
						var strength = speed/distanceSqr; //the closer the wall, the higher the strength
						if (Math.abs(xd) > 1) {
							vector.x += xd*strength*modifier*attraction;
						};
						if (Math.abs(yd) > 1) {
							vector.y += yd*strength*modifier*attraction;
						};
						//if walls are closer than a certain distance, set their 'active' property to true
						if (distanceSqr < (0.2*(speed*speed))) {
							data.activeWalls.push({x:data.walls[i].x, y:data.walls[i].y, strength:strength});
						};
					} else {
						data.walls[i].active = false;
					};
				};

				//set electron position, limit to game area
				data.electron.x += vector.x;
				if (data.electron.x < 0)
					data.electron.x = 0;
				if (data.electron.x > data.canvas.width-data.b)
					data.electron.x = data.canvas.width-data.b;

				data.electron.y += vector.y;
				if (data.electron.y < b)
					data.electron.y = b;
				if (data.electron.y > data.canvas.height-data.b)
					data.electron.y = data.canvas.height-data.b;

				//adjust electron.health
				if (data.activeWalls.length) {
					for (var i = 0; i < data.activeWalls.length; i++) {
						data.electron.health -= (data.activeWalls[i].strength * modifier*50);//50 is abitrary
						if (data.electron.health < 0) {
							data.electron.health = 0;
							data.deathStartTime = Date.now();
							data.deathElapsedTime = 0;
						};
					};
				} else {
					data.electron.health += modifier;
					if (data.electron.health > 100) {
						data.electron.health = 100;
					};
				};

				// Is it touching the exit?
				var dx, dy, exitDistSqr;
				dx = data.exit.x - data.electron.x;
				dy = data.exit.y - data.electron.y;
				exitDistSqr = (dx*dx) + (dy*dy);
				if (exitDistSqr < ((data.b/2)*(data.b/2)))
					data.exitIsActive = true;
				else
					data.exitIsActive = false;
				if (exitDistSqr < ((data.b/3)*(data.b/3))){
					data.exitIsActive = false;
					++data.currentLevel;
					if (data.currentLevel == levels.length) {data.currentLevel = 0};//until start and end screens are sorted!
					reset();
					//TODO: implement scene change graphic - fade out/in, flash on level number, etc.
				};
			} else { 
				data.deathElapsedTime += modifier*1000;
				if (data.deathElapsedTime > data.deathDuration) {
					window.freeElectron.cookies.checkScoreAgainstHighScores(data.currentLevel, data.then);
					data.currentLevel--;
					data.deathStartTime = 0;
					data.deathElapsedTime = 0;
					data.electron.health = 100;
					reset();
				};
			};
		};

		// Draw everything
		function render() {
			var draw = window.freeElectron.draw,
				levels = window.freeElectron.map.levels;
			
			if (fontsLoaded) {//TODO: I don't believe this works properly!
				if (data.currentLevel === 0) { // start screen
					draw.Background(data);
					draw.StartScreen(data);
					draw.Electron(data);
					for (var i = 0; i < data.walls.length; i++) {
						draw.Wall(data.walls[i], data);
					};
					draw.Exit(data);
				} else if (data.currentLevel === levels.length-1) { // end screen
					data.electron.health = 100;
					draw.Background(data);
					draw.EndScreen(data);
					draw.Electron(data);
				} else {
					draw.Background(data);
					draw.Score(data);
					draw.Health(data);
					for (var i = 0; i < data.walls.length; i++) {
						draw.Wall(data.walls[i], data);
					};
					draw.Electron(data);
					for (var i = 0; i < data.activeWalls.length; i++) {
						draw.Active(data.activeWalls[i], data);
					};
					draw.Exit(data);
					if (data.electron.health == 0){
						draw.DeathScene(data);
					};
				};
			};
		};

		// The main game loop
		function main() {
			var now = Date.now(),
				delta = now - data.then || 1;

			//pulse oscillator for render()
			data.iterator++;
			data.oscillator = Math.sin(data.iterator*2*Math.PI/delta)*(data.b/8) + (7*data.b/8);//oscillator will be between b*0.75 and b
			//delta is used as the update period here, but any number between 20 (fast) and 200 (slow) will do

			update(delta / 1000);
			render();

			data.then = now;

			// Request to do this again ASAP
			requestAnimationFrame(main);
		};

		// Cross-browser support for requestAnimationFrame
		var w = window;
		requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

		// Let's play this game!
		window.onload = function(){
			data.then = Date.now(),
			data.iterator = 1,
			data.oscillator = 1;
			reset();
			main();
		};

		return {
			data: data
		};

	})();
})(window.freeElectron = window.freeElectron || {});