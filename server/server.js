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
    socket.join('chat');

    socket.on('send', function(data) {
        io.to('chat').emit('message', data);
    });

    socket.on("typing", function(data) {
       io.emit("typing", data);
      });

});


