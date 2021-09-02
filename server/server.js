const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '../dist/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {
    cors :  {
        origin: "*",
        methods: ["GET", "POST"],
        secure: false
    }
});



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





