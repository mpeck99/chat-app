

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

var app = express(),
server = require('http').createServer(app),
io = socketIO.listen(server);

server.listen(process.env.PORT || 3000);



io.on('connection', function(socket) {
    socket.join('chat');
    console.log('connected');console.log(PORT);
 
    // io.emit('connected');
    socket.on('send', function(data) {
        io.to('chat').emit('message', data);
    });
  
    socket.on("typing", function(data) {
       io.to('chat').emit("typing", data);
    });

    socket.on('join', function(data){
        var users = io.sockets.adapter.rooms.get('chat').size;
        
        if(users <= 2 ) {
            socket.join('chat');
            io.to('chat').emit('join', data);  
        }
        else {
           socket.join('queue');
           io.to('queue').emit('queue', data);
        }

        

       

        
    })
});





