var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;



http.listen(PORT,function(){
    console.log("Listening to port " + PORT);
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





