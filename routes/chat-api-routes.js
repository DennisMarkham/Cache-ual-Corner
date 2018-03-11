var db = require("../models");

module.exports = function(app) {

	// Get all chats
  app.get("/api/all", function(req, res) {
    
    db.Chat.findAll({attributes: ['chat_messages','chat_time'],    	
    	include: [{model:db.Login, attributes: ['userName']}]
    
    }).then(function(results) {
      res.json(results);
      console.log("results" +JSON.stringify(results));
    });
  });



	// Add a chat row
  app.post("/api/new", function(req, res) {
    console.log("chat Data: " + req.body.time);
   
    db.Chat.create({
      socket_id: req.body.socket_id,
      LoginId: req.body.user,
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
};

