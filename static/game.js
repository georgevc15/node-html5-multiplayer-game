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
		case 65: //A
			movement.left = true;
			break;
		case 87: //W
			movement.up = true;
			break;
		case 68: //D
			movement.right = true;
		case 83: //
			movement.down = true;
			break;		
	}
});

document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 65: //A
			movement.left = false;
			break;
		case 87: //W
			movement.up = false;
			break;
		case 68: //D
			movement.right = false;
		case 83: //
			movement.down = false;
			break;		
	}
});


socket.emit('new player');
setInterval(function() {
	socket.emit('movement', movement);
}, 1000 / 60)


var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
	socket.on('state', function(players) {
		console.log("sunt in on state!");
		context.clearRect(0, 0, 800, 600);
		context.fillStyle = 'green';
		for (var id in players) {
			var player = players[id];
			context.beginPath();
			context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
			context.fill();
		}
	})