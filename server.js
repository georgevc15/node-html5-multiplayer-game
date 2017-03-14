var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');


var app = express();
var server  = http.Server(app);
var io = socketIO(server);

var Game =  require('./lib/Game');


var port = process.env.PORT || 5000;

app.set('port', port);
app.use('/public', express.static(__dirname + '/public'));

//routing
app.get('/', function(request, response) {
	 response.sendFile(path.join(__dirname, '/public/index.html'));
});

//start server
server.listen(port, function() {
	console.log('Starting server on port '+port);
});


//add WebSocket handlers
var players = {};
io.on('connection', function(socket) {
	
	//add new player to the game
	socket.on('new player', function() {
		var playerId = socket.id; 
		players = Game.addNewPlayer(playerId);
		//console.log("new player: ");
		//console.log(players);
		io.sockets.emit('new player', "New player connected!");
	});

	
 // When a player disconnects, remove them from the game.
  socket.on('disconnect', function() {
    var playerId = socket.id; 
    Game.removePlayer(playerId, players);

	io.sockets.emit('remove player', "Player disconnected!");
  });


   //move player
   socket.on('movement', function(data) {
		var player = players[socket.id] || {};
		if(data.left) {
			player.x -= 5;
		}
		if(data.up) {
			player.y -= 5;
		}
		if(data.right) {
			player.x += 5;
		}
		if(data.down) {
			player.y += 5;
		}
	});

});//end on connection


server.multifn = function(x,y) {
  return x * y;
};


setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);

module.exports = server;
