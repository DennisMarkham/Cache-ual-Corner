var db = require("../models");

module.exports = function(app) {

	// Get all chats
  app.get("/api/all", function(req, res) {
    
    db.Chat.findAll({attributes: ['chat_messages','chat_time'],    	
    	include: [{model:db.Login, attributes: ['userName']}],
      order: [
            ['id', 'ASC']
          ]
    
    }).then(function(results) {
      res.json(results);
      //console.log("results" +JSON.stringify(results));
    });
  });

  // Get userid for the username
  app.get("/api/user/:userName", function(req, res) {
    db.Login.findOne({attributes : ['id'],
      where: {
        userName: req.params.userName,
        logged: true
      }
    }).then(function(user) {
      res.json(user);
    });

  });

	// Add a chat row
  app.post("/api/newChat", function(req, res) {
    //console.log("chat Data: " + req.body.time);
   
    db.Chat.create({
      LoginId: req.body.id,
      chat_messages: req.body.msg,
      chat_time:req.body.time 
    });
    
  });

  /*// Delete chats for 500 msgs
  app.post("/api/delete", function(req, res) {
    console.log("chat Data: " +req.body);
    
    Chat.destroy({
      where: {
        id: req.body.id
      }
    });
  });*/

  // Get all logged users
  app.get("/api/users", function(req, res) {
    
    db.Login.findAll({
      where: {
        logged: true
      }
    
    }).then(function(results) {
      res.json(results);
      //console.log("results" +JSON.stringify(results));
    });
  });

};

