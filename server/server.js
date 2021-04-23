const express = require('express');


const app = express();



const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    
});