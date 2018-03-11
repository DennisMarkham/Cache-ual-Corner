
$(function () {
      var socket = io();
      var chat_time = new Date();

      $('#btnSend').on("click",function(){

        var chat_messages = $('#m').val();
        var socket_id = socket.id ;  
        var login_id ="1";      
        var chat ={user:login_id,socket_id:socket_id,msg:chat_messages,time:chat_time};        

        //socket.set("username",username);
       socket.emit('chat message', chat);     
       //to store in db 
        $.post("/api/new", chat)
        // On success, run the following code
        .then(function(data) {
          // Log the data we found
          console.log("chat row inserted");
        });
        
        $('#m').val('');
        return false;
      });

      socket.on('chat message', function(msg){
       $('#messages').append("<p>" + msg.socket_id + "  " + msg.msg+ "   " + msg.time + "</p>");
        window.scrollTo(0, document.body.scrollHeight);

        console.log("dateitme " +msg.time);        
      });

      //socket.emit('end');
});

// Make a get request to our api route that will return every chat
$.get("/api/all", function(data) {

console.log("chat data  " +data);  
  for (var i = 0; i < data.length; i++) {   
    $('#messages').append("<p>" +  data[i].Login.userName +"  "+data[i].chat_messages +"   "+data[i].chat_time+"</p>");    
    
  }
});


$('#btnLogin').on("click",function(){
      console.log("logged in");
      
});

$('#btnLogout').on("click",function(){
      console.log("logged out");

});





