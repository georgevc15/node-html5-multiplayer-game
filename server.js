var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');


var app = express();
var server  = http.Server(app);
var io = socketIO(server);



app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

//routing
app.get('/', function(request, response) {
	 response.sendFile(path.join(__dirname, '/static/index.html'));
    //console.log('dir name este'+__dirname);
});

//start server
server.listen(5000, function() {
	console.log('Starting server on port 5000');
});

//add WebSocket handlers
io.on('connection', function(socket) {

});


io.sockets.on('connection', function (socket) {

  socket.emit('start', 'start da game@!'); //emits to socket
  
});

setInterval(function() {
	io.sockets.emit('message', 'hi from console!');
}, 1000);

