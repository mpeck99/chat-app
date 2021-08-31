const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000');
});
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://radiant-atoll-76864.herokuapp.com/',
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


