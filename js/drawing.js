;(function(namespace, undefined){
	namespace.draw = (function () {
		var ctx = window.freeElectron.main.context,
		canvas = window.freeElectron.main.canvas;

		function shadeColor2(color, percent) {   //http://stackoverflow.com/a/13542669
		    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		}
		// Background image
		function drawBackground(){
			ctx.fillStyle="#000000";
			ctx.fillRect(0,0,canvas.width,canvas.height);
		};

		// electron image
		function drawElectron(){
			var gradient = ctx.createRadialGradient((electron.x + (b/2)),(electron.y + (b/2)),oscillator/2,(electron.x + (b/2)),(electron.y + (b/2)),0);
			gradient.addColorStop(0,"transparent");
			gradient.addColorStop(1,"red");
			ctx.fillStyle = gradient;
			ctx.fillRect(electron.x,electron.y, b, b);
		};

		// exit image
		function drawExit(){
			var ex = exit.x + b/2,
				ey = exit.y + b/2;
			ctx.strokeStyle="#00ffff";
			if (exitIsActive){
				ctx.setLineDash([10, 20]);
				ctx.lineWidth = 10;
			} else {
				ctx.setLineDash([10, 5]);
		    	ctx.lineWidth = 2;
			};
			ctx.beginPath();
			ctx.arc(ex,ey,b/2-1,0,2*Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);
		};
		//wall images
		function drawWall(wall){
			ctx.fillStyle="#FFFFFF";
			ctx.beginPath();
			ctx.arc((wall.x + (b/2)),(wall.y + (b/2)),b/2-1,0,2*Math.PI);
			ctx.fill();
		};
		//draw line between hero and nearby walls, using their 'active' property
		function drawActive(wall){
			var lineWidth = wall.strength*b;
			if (lineWidth > b/4 ) {lineWidth = b/4;};
			ctx.beginPath();
		    ctx.lineWidth = lineWidth;
			ctx.lineCap = "round";
			ctx.strokeStyle="#00ffff";
			ctx.moveTo((wall.x + (b/2)),(wall.y + (b/2)));
			ctx.lineTo((electron.x + (b/2)),(electron.y + (b/2)));
			ctx.stroke(); // Draw it

			var gradient = ctx.createRadialGradient((wall.x + (b/2)),(wall.y + (b/2)),(oscillator/2)+lineWidth,(wall.x + (b/2)),(wall.y + (b/2)),lineWidth);
			gradient.addColorStop(0,"transparent");
			gradient.addColorStop(1,"cyan");
			ctx.fillStyle = gradient;
			ctx.fillRect(wall.x,wall.y, b, b);
		};
		//score
		function drawScore(){
			ctx.fillStyle = "#FFFFFF";
			ctx.font = b*0.8 + "px Audiowide";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.fillText(" Level " + currentLevel, 0, b*0.6);
		};
		//health
		function drawHealth(){
			ctx.fillStyle = "#FFFFFF";
			ctx.font = b*0.8 + "px Audiowide";
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			ctx.fillText("Energy ", 11.1*b, b*0.6);

		    ctx.lineWidth = 1;
			ctx.strokeStyle="#ffffff";
			ctx.strokeRect(11*b,0.2*b,8.6*b,0.7*b);
			ctx.fillStyle = shadeColor2("#00ffff",electron.health/100);
			ctx.fillRect((11*b)+2,(0.2*b)+2,(((8.6*b)-4)*(electron.health/100)),(0.7*b)-4);
		};
		function drawDeathScene(){	
			ctx.fillStyle = "red";
			var radius = (deathElapsedTime / deathDuration)*100*20;//the screen is 20*b wide
			ctx.beginPath();
			ctx.arc((electron.x + (b/2)),(electron.y + (b/2)),radius,0,2*Math.PI);
			ctx.fill();
			if (radius > (2*b)) {
				ctx.fillStyle = "black";
				ctx.beginPath();
				ctx.arc((electron.x + (b/2)),(electron.y + (b/2)),radius-(2*b),0,2*Math.PI);
				ctx.fill();
			};
		};
		//start screen
		function drawStartScreen(){
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = (2*b) + "px Audiowide";
			ctx.fillText("Free Electron", 10*b, 2.4*b);

			//draw the arrow
			ctx.beginPath();
			ctx.strokeStyle="#00ffff";
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
		    ctx.lineWidth = 8;
			ctx.moveTo(6*b,6.5*b);
			ctx.lineTo(14*b,6.5*b);
			ctx.moveTo(13*b,5.5*b);
			ctx.lineTo(14*b,6.5*b);
			ctx.lineTo(13*b,7.5*b);
			ctx.stroke(); // Draw it

			ctx.font = (2*b/3) + "px Audiowide";
			ctx.fillText("Arrow keys to move... any key to start", 10*b, 8*b);

			ctx.font = (b/4) + "px Audiowide";
			ctx.textBaseline = "bottom";
			ctx.textAlign = "left";
			ctx.fillText("A JavaScript game by cheersphilip, 2016", 1.2*b, 10.8*b);

			//cover up that annoying black dot over the electron
			ctx.fillStyle="#FF0000";
			ctx.beginPath();
			ctx.arc((electron.x + (b/2)),(electron.y + (b/2)),b/8,0,2*Math.PI);
			ctx.fill();
		};
		//end screen
		function drawEndScreen(){
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = (2*b) + "px Audiowide";
			ctx.fillText("Free Electron", 10*b, 2.4*b);

			ctx.font = (2*b/3) + "px Audiowide";
			ctx.fillText("Yay! Well done... space bar to play again", 10*b, 8*b);

			ctx.font = (b/2) + "px Audiowide";
			ctx.fillText("A game by cheersphilip", 10*b, 10*b);
			ctx.fillText("Thanks for playing ;)", 10*b, 10.8*b);
		};

		window.onload = function(){

		};

		return {
			drawStartScreen: drawStartScreen,
			drawDeathScene: drawDeathScene,
			drawEndScreen: drawEndScreen,
			drawHealth: drawHealth,
			drawScore: drawScore,
			drawActive: drawActive,
			drawWall: drawWall,
			drawExit: drawExit,
			drawElectron: drawElectron,
			drawBackground: drawBackground
		};

	}();
})(window.freeElectron = window.freeElectron || {});