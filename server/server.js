

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {
    cors :  {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket) {
    socket.join('chat');
 
    // io.emit('connected');
    socket.on('send', function(data) {
        io.to('chat').emit('message', data);
    });
  
    socket.on("typing", function(data) {
       io.to('chat').emit("typing", data);
    });

    socket.on('joined', function(data){
        io.to('chat').emit('joined', data);
    })
    // io.emit('joined', 'user joined');
});





