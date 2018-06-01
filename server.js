var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var compteur = 0;

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
	  	//pour qu'il le garde en mémoire, comme il est stocké dans socket, pas besoin de le redéfinir dans les fonctions d'après
	  	socket.pseudo = pseudo;
	  	compteur ++;
	  	console.log(compteur);
	  	socket.emit('nouveau_client_vers_client', pseudo);
	  	//broadcast pour que tous les autres sur le serveur le voit
	  	socket.broadcast.emit('nouveau_client_vers_client', pseudo);
	  });

	//Quand un client se déconnecte
	socket.on('disconnect', function(pseudo){
		compteur --;
		console.log(compteur);
		console.log(socket.pseudo+' disconnected');
		socket.emit('bye_client_vers_client', socket.pseudo);
	  	//broadcast pour que tous les autres sur le serveur le voit
	  	socket.broadcast.emit('bye_client_vers_client', socket.pseudo);
	  });

	//Quand un message est submit
	socket.on('msg_vers_server', function(pseudo, msg){
		// socket.msg = msg;
		socket.broadcast.emit('msg_vers_client', {msg:msg, pseudo:socket.pseudo});
		// console.log(msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});