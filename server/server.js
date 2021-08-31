const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
    console.log('server running on port 3000');
});
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"]
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


