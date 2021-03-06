const express = require("express");
const port = process.env.PORT || 5000;
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const users = [];
const usersConnected = [];

// Express to run the server
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Socket.io connection
io.on("connection", function(socket) {
  // Listening for the users connection and then checking to see what type of user is conencted to push the correct data. 


  socket.on("users", function(data) {
    //on connect checking if users not an agent
  
    if (data.type != "Agent") {
      users.push({
        id: socket.id,
        name: data.name,
      });
      //adding the user to the waiting room to wait for an agent
      socket.join(socket.id);
    } 
  });

  // Need to work on this disconnect
  socket.on("disconnect", function() {
    //on disconnect will remove the user from the users list
    users.pop(socket.id);
    io.to(socket.id).emit('disconnected', socket.id);
    usersConnected.pop(socket.id);
    console.log(socket.id + " has left");
  });
 
  socket.emit('connected', users)

  // Checking the variables to send message to the correct socket
  socket.on('send', function(data) {
    if(data.user) {
      io.to(data.user).emit('message', data);
    }
    else {
      io.to(data.socket).emit('message', data);
    }
  });
  
  // Sending things over to the client that the agent is typing
  socket.on("agentTyping", function(data) {
    io.to(data.user).emit("agentTyping", data);
  });

  // Sending things over to the agent that the client is typing
  socket.on("clientTyping", function(data) {
    io.to(data.agent).emit("clientTyping", data);
  });

  socket.on('join', function(data){
    socket.join(socket.id);
    io.to(socket.id).emit('join', data);  
  });

  socket.on('usersConnected', function(data){
    io.sockets.emit('usersReload', data);
  });

  socket.on('agent', function(data){
    socket.join(data.user);
    io.to(data.user).emit('agentJoin', data);
  });
});
