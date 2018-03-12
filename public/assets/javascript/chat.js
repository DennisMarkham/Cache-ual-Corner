var socket;
$('#btnLogin').on("click",function(){
  event.preventDefault();
  var username = $("#userName").val().trim();

  socket = io.connect("http://localhost:8080/", {'forceNew': true});
  console.log("conected " +socket.id);
  sessionStorage.clear();
  sessionStorage.setItem("Cache-ual-Corner", username);

});

     

$(function () {
       
      //var socket = io() ;
      //var socket = io.connect("http://localhost:8080/", {'forceNew': true});
      //var socket =io.connect('http://localhost:8080');
      var chat_time = new Date();

      $('#btnLogout').on("click",function(){
        event.preventDefault();
        sessionStorage.removeItem("Cache-ual-Corner");

        socket.disconnect();

      });

      $('#btnSend').on("click",function(){

        var chat_messages = $('#m').val();
        var userName = sessionStorage.getItem("Cache-ual-Corner");
        //var socket_id = socket.id ;

        $.get("/api/user/" + userName, function(data) {  
        
            //console.log("chat data  " +data.id + "," + socket_id);  

            var chat ={id: data.id,user:userName,msg:chat_messages,time:chat_time};        

            //socket.set("username",username);
            socket.emit('chat message', chat);     
           //to store in db 
            $.post("/api/newChat", chat)
            // On success, run the following code
            .then(function(data) {
              // Log the data we found
              console.log("chat row inserted");
            });
            
            $('#m').val('');
            return false;
          }); 


        socket.on('chat message', function(msg){
        $('#messages').append("<p>" + msg.user + "  " + msg.msg+ "   " + msg.time + "</p>");
          window.scrollTo(0, document.body.scrollHeight);
          //console.log("dateitme " +msg.time);        
        });

  });      

      
});

// Make a get request to our api route that will return every chat
$.get("/api/all", function(data) {

console.log("chat data  " +data);  
  for (var i = 0; i < data.length; i++) {   
    $('#messages').append("<p>" +  data[i].Login.userName +"  "+data[i].chat_messages +"   "+data[i].chat_time+"</p>");    
    
  }
});
