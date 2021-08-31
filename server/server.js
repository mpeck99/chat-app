const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));

const server = app.listen(app.get('port'), function(){
    console.log('Running on port', app.get('port'));
})

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
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


