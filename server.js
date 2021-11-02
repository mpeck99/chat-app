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
      // //adding user to a list to easily display
      // for (let [id] of io.of("/").sockets) {
      //   users.push({
      //     userID: id,
      //     username: data.name,
      //   });
      // }
      

      // io.to('waiting').emit("users",users);
      
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

/////
////  Continue looking into emitting message to the user that is in the room that they are in the queue, then I will need to add a date/time to the user so Agents can see who was first, then look into looping through them on the agents page so an agent can select the user and start a private chat. - may need to look into socket.io for the private chat stuff
////
 
  // socket.join('waiting-room');
  socket.emit('connected', users)
  // io.emit('connected', users);
  socket.on('send', function(data) {
      io.to(socket.id).emit('message', data);
  });

  socket.on("typing", function(data) {
     io.to(socket.id).emit("typing", data);
  });

  socket.on('join', function(data){
      socket.join(socket.id);
      io.to(socket.id).emit('join', data);

  });
  socket.on('agent', function(data){
    socket.join(data);
    console.log('Agent has joined');
    io.to(data).emit('join', 'Agent has joined. One moment and they will be with you.')
  })
});
