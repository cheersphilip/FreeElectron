;(function(namespace, undefined){
	namespace.draw = (function () {
		var ctx = window.freeElectron.main.context,
		canvas = window.freeElectron.main.canvas;

		function shadeColor2(color, percent) {   //http://stackoverflow.com/a/13542669
		    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		}
		// Background image
		function drawBackground(d){
			d.ctx.fillStyle="#000000";
			d.ctx.fillRect(0,0,d.canvas.width,d.canvas.height);
		};

		// electron image
		function drawElectron(d){
			var b = d.b,
				gradient = d.ctx.createRadialGradient((d.electron.x + (b/2)),(d.electron.y + (b/2)),d.oscillator/2,(d.electron.x + (b/2)),(d.electron.y + (b/2)),0);
			gradient.addColorStop(0,"transparent");
			gradient.addColorStop(1,"red");
			d.ctx.fillStyle = gradient;
			d.ctx.fillRect(d.electron.x, d.electron.y, b, b);
		};

		// exit image
		function drawExit(d){
			var b = d.b,
				ex = d.exit.x + b/2,
				ey = d.exit.y + b/2;
			d.ctx.strokeStyle="#00ffff";
			if (d.exitIsActive){
				d.ctx.setLineDash([10, 20]);
				d.ctx.lineWidth = 10;
			} else {
				d.ctx.setLineDash([10, 5]);
		    	d.ctx.lineWidth = 2;
			};
			d.ctx.beginPath();
			d.ctx.arc(ex,ey,b/2-1,0,2*Math.PI);
			d.ctx.stroke();
			d.ctx.setLineDash([]);
		};
		//wall images
		function drawWall(wall, d){
			var b = d.b;
			d.ctx.fillStyle="#FFFFFF";
			d.ctx.beginPath();
			d.ctx.arc((wall.x + (b/2)),(wall.y + (b/2)),b/2-1,0,2*Math.PI);
			d.ctx.fill();
		};
		//draw line between hero and nearby walls, using their 'active' property
		function drawActive(wall, d){
			var b = d.b,
				lineWidth = wall.strength*b;
			if (lineWidth > b/4 ) {lineWidth = b/4;};
			d.ctx.beginPath();
		    d.ctx.lineWidth = lineWidth;
			d.ctx.lineCap = "round";
			d.ctx.strokeStyle="#00ffff";
			d.ctx.moveTo((wall.x + (b/2)),(wall.y + (b/2)));
			d.ctx.lineTo((d.electron.x + (b/2)),(d.electron.y + (b/2)));
			d.ctx.stroke(); // Draw it

			var gradient = d.ctx.createRadialGradient((wall.x + (b/2)),(wall.y + (b/2)),(d.oscillator/2)+lineWidth,(wall.x + (b/2)),(wall.y + (b/2)),lineWidth);
			gradient.addColorStop(0,"transparent");
			gradient.addColorStop(1,"cyan");
			d.ctx.fillStyle = gradient;
			d.ctx.fillRect(wall.x,wall.y, b, b);
		};
		//score
		function drawScore(d){
			var b = d.b;
			d.ctx.fillStyle = "#FFFFFF";
			d.ctx.font = b*0.8 + "px Audiowide";
			d.ctx.textAlign = "left";
			d.ctx.textBaseline = "middle";
			d.ctx.fillText(" Level " + d.currentLevel, 0, b*0.6);
		};
		//health
		function drawHealth(){
			var b = d.b;
			d.ctx.fillStyle = "#FFFFFF";
			d.ctx.font = b*0.8 + "px Audiowide";
			d.ctx.textAlign = "right";
			d.ctx.textBaseline = "middle";
			d.ctx.fillText("Energy ", 11.1*b, b*0.6);

		    d.ctx.lineWidth = 1;
			d.ctx.strokeStyle="#ffffff";
			d.ctx.strokeRect(11*b,0.2*b,8.6*b,0.7*b);
			d.ctx.fillStyle = shadeColor2("#00ffff",d.electron.health/100);
			d.ctx.fillRect((11*b)+2,(0.2*b)+2,(((8.6*b)-4)*(d.electron.health/100)),(0.7*b)-4);
		};
		function drawDeathScene(d){	
			var b = d.b,
				radius = (deathElapsedTime / deathDuration)*100*20;//the screen is 20*b wide
			d.ctx.fillStyle = "red";
			d.ctx.beginPath();
			d.ctx.arc((d.electron.x + (b/2)),(d.electron.y + (b/2)),radius,0,2*Math.PI);
			d.ctx.fill();
			if (radius > (2*b)) {
				d.ctx.fillStyle = "black";
				d.ctx.beginPath();
				d.ctx.arc((d.electron.x + (b/2)),(d.electron.y + (b/2)),radius-(2*b),0,2*Math.PI);
				d.ctx.fill();
			};
		};
		//start screen
		function drawStartScreen(d){
			var b = d.b;
			d.ctx.fillStyle = "#FFFFFF";
			d.ctx.textAlign = "center";
			d.ctx.textBaseline = "top";
			d.ctx.font = (2*b) + "px Audiowide";
			d.ctx.fillText("Free Electron", 10*b, 2.4*b);

			//draw the arrow
			d.ctx.beginPath();
			d.ctx.strokeStyle="#00ffff";
			d.ctx.lineJoin = "round";
			d.ctx.lineCap = "round";
		    d.ctx.lineWidth = 8;
			d.ctx.moveTo(6*b,6.5*b);
			d.ctx.lineTo(14*b,6.5*b);
			d.ctx.moveTo(13*b,5.5*b);
			d.ctx.lineTo(14*b,6.5*b);
			d.ctx.lineTo(13*b,7.5*b);
			d.ctx.stroke(); // Draw it

			d.ctx.font = (2*b/3) + "px Audiowide";
			d.ctx.fillText("Arrow keys to move... any key to start", 10*b, 8*b);

			d.ctx.font = (b/4) + "px Audiowide";
			d.ctx.textBaseline = "bottom";
			d.ctx.textAlign = "left";
			d.ctx.fillText("A JavaScript game by cheersphilip, 2016", 1.2*b, 10.8*b);

			//cover up that annoying black dot over the electron
			d.ctx.fillStyle="#FF0000";
			d.ctx.beginPath();
			d.ctx.arc((d.electron.x + (b/2)),(d.electron.y + (b/2)),b/8,0,2*Math.PI);
			d.ctx.fill();
		};
		//end screen
		function drawEndScreen(d){
			var b = d.b;
			d.ctx.fillStyle = "#FFFFFF";
			d.ctx.textAlign = "center";
			d.ctx.textBaseline = "top";
			d.ctx.font = (2*b) + "px Audiowide";
			d.ctx.fillText("Free Electron", 10*b, 2.4*b);

			d.ctx.font = (2*b/3) + "px Audiowide";
			d.ctx.fillText("Yay! Well done... space bar to play again", 10*b, 8*b);

			d.ctx.font = (b/2) + "px Audiowide";
			d.ctx.fillText("A game by cheersphilip", 10*b, 10*b);
			d.ctx.fillText("Thanks for playing ;)", 10*b, 10.8*b);
		};

		window.onload = function(){

		};

		return {
			StartScreen: drawStartScreen,
			DeathScene: drawDeathScene,
			EndScreen: drawEndScreen,
			Health: drawHealth,
			Score: drawScore,
			Active: drawActive,
			Wall: drawWall,
			Exit: drawExit,
			Electron: drawElectron,
			Background: drawBackground
		};

	}();
})(window.freeElectron = window.freeElectron || {});