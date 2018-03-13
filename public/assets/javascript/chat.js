$(function () {

  var socket = io();
  var chat_time = new Date();

  $('#btnLogin').on("click", function () {
    event.preventDefault();
    sessionStorage.clear();
    var username = $("#userName").val().trim();

    //socket = io();
    /*socket =io.connect("http://localhost:8080/", {
      'forceNew': true
    });*/
    //console.log("conected " + socket.id);    
    sessionStorage.setItem("Cache-ual-Corner", username);
    $('#userName').val('');

  });

  $('#btnLogout').on("click", function () {
    event.preventDefault();
    sessionStorage.removeItem("Cache-ual-Corner");

    socket.disconnect();

  });

  $('#btnSend').on("click", function () {
    event.preventDefault();
    var chat_messages = $('#m').val().trim();
    var userName = sessionStorage.getItem("Cache-ual-Corner");

    console.log("name " + userName);
    if (userName) {
      $.get("/api/user/" + userName, function (data) {

        var chat = {
          id: data.id,
          user: userName,
          msg: chat_messages,
          time: chat_time
        };
      

      socket.emit('chat message', chat);
      //to store in db 
      $.post("/api/newChat", chat)
        // On success, run the following code
        .then(function (data) {
          // Log the data we found
          console.log("chat row inserted");
        });
        });
    }
    $('#m').val('');
    return false;
  });

  if (socket) {
    socket.on('chat message', function (msg) {
      //$('#currentMsg').text("");
      $('#currentMsg').append("<p>" + msg.user + "  " + msg.msg + "   " + moment(msg.time).format('h:mm a') + "</p>");
      window.scrollTo(0, document.body.scrollHeight);
      //console.log("dateitme " +msg.time);        
    });
  }

});

// Make a get request to our api route that will return every chat
$.get("/api/all", function (data) {

  console.log("chat data  " + data);
  for (var i = 0; i < data.length; i++) {
    $('#messages').append("<p>" + data[i].Login.userName + "  " + data[i].chat_messages + "   " + moment(data[i].chat_time).format('h:mm a') + "</p>");

  }
});

// Make a get request to our api route that will return every chat
$.get("/api/users", function (data) {

  //console.log("chat data  " + data);
  for (var i = 0; i < data.length; i++) {
    $('#userList').append("<li>" + data[i].userName + "</li>");

  }
});