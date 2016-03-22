
// Background image
var drawBackground = function(){
	ctx.fillStyle="#FFFFFF";
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
	ctx.fillStyle="#000000";
	ctx.fillRect(exit.x,exit.y,b,b);
};
//wall images
var drawWall = function(wall){
	ctx.fillStyle="#000000";
	ctx.beginPath();
	ctx.arc((wall.x + (b/2)),(wall.y + (b/2)),(oscillator/2),0,2*Math.PI);
	ctx.fill();
};
//draw line between hero and nearby walls, using their 'active' property
var drawActive = function(wall){
	ctx.beginPath();
	ctx.strokeStyle="#00ffff";
	ctx.moveTo((wall.x + (b/2)),(wall.y + (b/2)));
	ctx.lineTo((electron.x + (b/2)),(electron.y + (b/2)));
	ctx.stroke(); // Draw it
};
//score
var drawScore = function(){
	ctx.fillStyle = "#000000";
	ctx.font = b + "px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Level " + (currentLevel + 1), b, b);
};