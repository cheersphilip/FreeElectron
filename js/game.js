// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//canvas.width = 512;//16 lots of 32px
//canvas.height = 480;//15 lots of 32px
var blockWidth = Math.floor(window.innerWidth/20);
var blockHeight = Math.floor(window.innerHeight/11);
var b = blockHeight > blockWidth ? blockWidth: blockHeight;
canvas.width = b*20;
canvas.height = b*11;
document.body.appendChild(canvas);


// Game objects
var electron = {
	speed: b*8, // movement in pixels per second
	health: 100
};
var exit = {};
var walls = [];
var activeWalls = [];

//TODO: put in logic so that there is a start and end screen/level
var currentLevel = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {

	//construct the level
	walls = [];
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 20; j++) {
			if (levels[currentLevel][i][j] == 0) {
				walls.push({x:j*b,y:i*b});
			};
			if (levels[currentLevel][i][j] == 1) {
				electron.x = j*b;
				electron.y = i*b;
			};
			if (levels[currentLevel][i][j] == 2) {
				exit.x = j*b;
				exit.y = i*b;
			};
		};
	};
};

// Update game objects
var update = function (modifier) {
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

	//iterate through an array of walls, creating a single vector that
	//modifies electron.x and electron.y
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
			//if walls are closer than a certain distance, set their 'active' proprty to true
			if (distanceSqr < (0.2*(electron.speed*electron.speed))) {
				activeWalls.push({x:walls[i].x, y:walls[i].y});
			};
		} else {
			walls[i].active = false;
		};

		// if (13 in keysDown) { 
		// 	debugger;
		// }
	};
	//console.log(vector)
	electron.x += vector.x;
	electron.y += vector.y;

	//TODO: Detect collision with the walls
	//TODO: implement health feature i.e if activeWalls.length ? health++ : health--

	// Is it touching the exit?
	if (
		electron.x <= (exit.x + b)
		&& exit.x <= (electron.x + b)
		&& electron.y <= (exit.y + b)
		&& exit.y <= (electron.y + b)
	) {
		++currentLevel;
		if (currentLevel == levels.length) {currentLevel = 0};//until start and end screens are sorted!
		reset();
	};
};

// Draw everything
var render = function () {

	drawBackground();
	drawScore();
	drawElectron();
	for (var i = 0; i < walls.length; i++) {
		drawWall(walls[i]);
	};
	for (var i = 0; i < activeWalls.length; i++) {
		drawActive(activeWalls[i]);
	};
	drawExit();
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	//pulse oscillator for render()
	iterator++;
	oscillator = Math.sin(iterator*2*Math.PI/200)*(b/4) + (b*0.75);//200 is just plucked out of nowhere

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
var then = Date.now(),
	iterator = 0,
	oscillator = 0;
reset();
main();