const express = require('express');


const app = express();



const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.join('chat');
    
    console.log(socket.rooms)
    socket.on('send', function(data) {
        io.to('chat').emit('message', data);
        // io.to('chat').emit('user joined', socket.id);
    });
    socket.on('connected', function(msg){
        io.emit('connected', msg);
    })
});


