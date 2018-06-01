var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);


//création et liaison avec le dossier public
app.use(express.static('public'));

//routage
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	 // Dès qu'on nous donne un pseudo, on le stocke en variable de session
	  // et on informe les autres personnes
	  socket.on('nouveau_client_vers_server', function(pseudo) {
	  	socket.pseudo = pseudo;

	  	console.log(socket.pseudo+' connecté ')
	  });

	  

    socket.on('disconnect', function(pseudo){
	
		console.log(socket.pseudo+' disconnected');
		
	});




});

http.listen(3000, function(){
	console.log('listening on *:3000');
});