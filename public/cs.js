window.onload=function(){

  var socket=io.connect("http://127.0.0.1:3000");

  var name=document.querySelector("#name"),
      message=document.querySelector("#message"),
      send=document.querySelector("#send"),
      chatwin=document.querySelector("#window"),
      chats=document.querySelector("#chats");
      typing=document.querySelector("#typing");

      d=new Date();
      h=(d.getHours()+24)%12;
      m=d.getMinutes();
  send.onclick=function() {


    //message.value=null;
    socket.emit("sent",{
      name: name.value,
      message:message.value
    });
    message.value="";
  };
  //typing
  message.addEventListener("keypress",function(){
    socket.emit("typing",name.value);
  });

  socket.on("sent",function(data){
     typing.innerHTML='';
     time = "<span id='time'>" + h + ":" + m + "</span>";
     chats.innerHTML+= "<p class='chat'><strong>"+ data.name + " : "+ "</strong>" + data.message+ time +"</p>" ;
  });
  socket.on("typing",function(x){
    typing.innerHTML="<p><em>"+ x+ " is typing..." + "</em></p>";
  });

};
