var socket = io();


socket.on('start', function(data) {
	console.log(data);
});


socket.on('message', function(data) {
	console.log(data);
});