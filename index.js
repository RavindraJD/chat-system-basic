var express=require("express");
var socket=require("socket.io");

var app=express();
app.use(express.static("public"));

var server=app.listen(3000,function(){
  console.log("listening on 3000");
});
var io=socket(server);

io.on("connection",function(socket){
  console.log("socket connection made",socket.username);

  socket.on("sent",function(data){
    io.sockets.emit("sent",data);
  });

  socket.on("typing",function(x){
    socket.broadcast.emit("typing",x);
  });


});
