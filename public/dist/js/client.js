$(function () {
  var socket = io();

         // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
         var pseudo = prompt('Quel est votre pseudo ?');
         socket.emit('nouveau_client_vers_server', pseudo);
         document.title = pseudo + ' - ' + document.title;//titre de l'onglet

          // Quand un nouveau client se connecte, on affiche l'information
          socket.on('nouveau_client_vers_client', function(pseudo) {
            $('#messages').append('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
          })

          //Quand un client se déconnecte
          socket.emit('disconnect', pseudo);
          socket.on('bye_client_vers_client', function(pseudo) {
            $('#messages').append('<p><em>' + pseudo + ' a quitté le Chat !</em></p>');
          })
          

      $('form').submit(function(){//quand j'envoies le formulaire
        //signale qu'un evenement est enclenché et récupère la valeur
        socket.emit('chat message', $('#m').val());
        $('#m').val('');//vide l'input


        return false;
      });

      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(pseudo + " : " + msg));//affiche la valeur de l'input un fois submité
      });
    });