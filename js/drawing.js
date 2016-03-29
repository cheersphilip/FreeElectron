
// Background image
var drawBackground = function(){
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);
};

// electron image
var drawElectron = function(){
	ctx.fillStyle="#FF0000";
	ctx.beginPath();
	ctx.arc((electron.x + (b/2)),(electron.y + (b/2)),(oscillator/2),0,2*Math.PI);
	ctx.fill();
};

// exit image
var drawExit = function(){
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(exit.x+(b/5),exit.y,(4*b/5),b);
};
//wall images
var drawWall = function(wall){
	ctx.fillStyle="#FFFFFF";
	ctx.beginPath();
	ctx.arc((wall.x + (b/2)),(wall.y + (b/2)),(oscillator/2),0,2*Math.PI);
	ctx.fill();
};
//draw line between hero and nearby walls, using their 'active' property
var drawActive = function(wall){
	var lineWidth = wall.strength*b;
	if (lineWidth > b/2 ) {lineWidth = b/2;};
	ctx.beginPath();
    ctx.lineWidth = lineWidth;
	ctx.strokeStyle="#00ffff";
	ctx.moveTo((wall.x + (b/2)),(wall.y + (b/2)));
	ctx.lineTo((electron.x + (b/2)),(electron.y + (b/2)));
	ctx.stroke(); // Draw it
};
//score
var drawScore = function(){
	ctx.fillStyle = "#FFFFFF";
	ctx.font = b + "px Audiowide";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Level " + currentLevel, b, b);
};
//start screen
var drawStartScreen = function(){
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.font = (2*b) + "px Audiowide";
	//ctx.font = (2*b) + "px 'Share Tech Mono'";
	ctx.fillText("Free Electron", 10*b, 1.4*b);

	ctx.font = (9*b/10) + "px Audiowide";
	//ctx.fillText('"Avoid all that is negative!"', 10*b, 3.2*b);

	ctx.beginPath();
	ctx.strokeStyle="#00ffff";
    ctx.lineWidth = 8;
	ctx.moveTo(6*b,5.5*b);
	ctx.lineTo(14*b,5.5*b);
	ctx.moveTo(13*b,4.5*b);
	ctx.lineTo(14*b,5.5*b);
	ctx.lineTo(13*b,6.5*b);
	ctx.stroke(); // Draw it

	ctx.font = (2*b/3) + "px Audiowide";
	ctx.fillText("Arrow keys to move... any key to start", 10*b, 7*b);

	ctx.font = (b/4) + "px Audiowide";
	ctx.textBaseline = "bottom";
	ctx.textAlign = "left";
	ctx.fillText("A JavaScript game by cheersphilip, 2016", 1.2*b, 9.8*b);
};
//end screen
var drawEndScreen = function(){
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.font = (2*b) + "px Audiowide";
	//ctx.font = (2*b) + "px 'Share Tech Mono'";
	ctx.fillText("Free Electron", 10*b, 1.4*b);

	ctx.font = (9*b/10) + "px Audiowide";
	//ctx.fillText('"Avoid all that is negative"', 10*b, 3.2*b);

	ctx.font = (2*b/3) + "px Audiowide";
	//ctx.fillText("Yay, you finished the game!", 10*b, 7*b);
	ctx.fillText("Yay! Well done... space bar to play again", 10*b, 7*b);

	ctx.font = (b/2) + "px Audiowide";
	ctx.fillText("A game by cheersphilip", 10*b, 9	*b);
	ctx.fillText("Thanks for playing ;)", 10*b, 9.8*b);
};