var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ent = require('ent');

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
	  	//broadcast pour envoyer le message à tous les autres présents sur le serveur sauf toi
	  	socket.broadcast.emit('nouveau_client_vers_client',pseudo);
	  	socket.emit('nouveau_client_vers_client', pseudo);
	  });

	  socket.on('disconnect', function(pseudo){
	  	socket.broadcast.emit('bye_client_vers_client', socket.pseudo);
	  	socket.emit('bye_client_vers_client', socket.pseudo);
	  })

	  socket.on('chat message', function(msg){
	  	io.emit('chat message', msg);
	  });
	  // socket.on('disconnect', function(){
	  // 	console.log('user disconnected');
	  // });


    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur 
    // et on le transmet aux autres personnes
    socket.on('message', function (message) {
    	message = ent.encode(message);
    	socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 



});

http.listen(3000, function(){
	console.log('listening on *:3000');
});