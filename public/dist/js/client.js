$(function () {
	var socket = io();

         // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
         var pseudo = prompt('Quel est votre pseudo ?');
         
         if(pseudo == ''){
         	pseudo = 'Un chateur anonyme';
         }
         socket.emit('nouveau_client_vers_server', pseudo);
         socket.on('nouveau_client_vers_client', function(pseudo){
         	$('#messages').append('<li><em>'+ pseudo + ' est maintenant connecté(e) !</em></li>')
         });

         socket.emit('disconnect',pseudo);
         socket.on('bye_client_vers_client', function(pseudo){
         	$('#messages').append('<li><em>'+ pseudo + ' est maintenant déconnecté(e) !</em></li>')
         });

         $('form').submit(function(){
         	var input = $('#m').val();
         	if(input !== ''){	
         		socket.emit('msg_vers_server', pseudo, input);
         	// Affiche le message aussi sur notre page
         	$('#messages').append('<p class="mes-messages">'+ input +'</p>');
         	$('#m').val('').focus(); // Vide la zone de Chat et remet le focus dessus 
         	return false;//pour éviter que la page ne se recharge à chaque submit
         }else{
         	return false;
         }
     });

          // Quand on reçoit un message, on l'insère dans la page
          socket.on('msg_vers_client', function(data) {
          	$('#messages').append('<p><strong>' + data.pseudo + '</strong></p><p> '+ data.msg +'</p>');
          });

      });