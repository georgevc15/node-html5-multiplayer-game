var socket = io();


socket.on('start', function(data) {
	console.log(data);
});


socket.on('message', function(data) {
	console.log(data);
});

var movement = {
	up: false,
	down: false,
	left: false,
	right: false
}

document.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 37: //A
			movement.left = true;
			break;
		case 38: //W
			movement.up = true;
			break;
		case 39: //D
			movement.right = true;
		case 40: //
			movement.down = true;
			break;		
	}
});

document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 37: //left arrow
			movement.left = false;
			break;
		case 38: //up arrow
			movement.up = false;
			break;
		case 39: //right arrow
			movement.right = false;
		case 40: //down arrow
			movement.down = false;
			break;		
	}
});


socket.emit('new player');
setInterval(function() {
	socket.emit('movement', movement);
}, 1000 / 60);


var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
	
	socket.on('state', function(players) {
		var image = document.createElement("img");
		image.src = '../public/images/car.png';
		context.clearRect(0, 0, 800, 600);
   			
		for (var id in players) {
			var player = players[id];
			image.onload = function() {
			context.drawImage(image,player.x, player.y);
			context.drawImage(image,400, 400);
			  }
			}
	});







/*
		function rotatePlayer(degrees) {
			context.rotate(degrees*Math.PI/360);
			context.drawImage(image,player.x, player.y);
			//context.restore();
		}
*/