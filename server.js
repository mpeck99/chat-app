const express = require("express");
const port = process.env.PORT || 5000;
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const users = [];
/*
 *  Serve /dist/ folder
 */
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.on("connection", function(socket) {
  socket.on("users", function(data) {
    //on connect checking if users not an agent
    if (data.type != "Agent") {
      users.push({
        id: socket.id,
        name: data.name,
      });
      console.log(users);
      
      //adding the user to the waiting room
      socket.join(socket.id);
 
    } else {
      //if users is an agent will redirect to new page
      console.log("Your an agent");
    }
  });

  socket.on("disconnect", function() {
    //on disconnect will remove the user from the users list
    users.pop(socket.id);
    console.log(socket.id + " has left");
    console.log(users);
  });
 
  // socket.join('waiting-room');
  socket.emit('connected', users)
  // io.emit('connected', users);
  socket.on('send', function(data) {
    if(data.user) {
      io.to(data.user).emit('message', data);
    }
    else {
      io.to(data.socket).emit('message', data);
    }
    
  });

  socket.on("typing", function(data) {
     io.emit("typing", data);
    
  });

  socket.on('join', function(data){
      socket.join(socket.id);
      io.to(socket.id).emit('join', data);
  });

  socket.on('agent', function(data){
    socket.join(data);
    console.log('Agent has joined');
    io.to(data).emit('agentJoin', "Agent has joined the chat.");
  });
});
