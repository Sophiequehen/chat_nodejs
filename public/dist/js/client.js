$(function () {
  var socket = io();

         // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
         var pseudo = prompt('Quel est votre pseudo ?');
         
         socket.emit('nouveau_client_vers_server', pseudo);
          socket.emit('disconnect',pseudo);
         

      
          
          

    });