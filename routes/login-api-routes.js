// Requiring our models and passport as we've configured it
var db = require("../models");
var Login = require("../models/login");

//self calling function from server.js
module.exports = function(app) 
{
	// Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login",/* passport.authenticate("local"), */function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");
  });
	 // GET all of the login data
 	 app.get("/api/loginList", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Login.findAll({}
    ).then(function(dbLogin) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbLogin);
      console.log("Login Data: " +JSON.stringify(dbLogin));
    });
  });

 	    // Route for signing up a user. 
  app.post("/api/signup", function(req, res) 
  {
    db.Login.create(
    {
      email: req.body.email,
      password: req.body.password,
      userName:req.body.userName,
      avatar_image:req.body.avatar_image,
      message_color: req.body.message_color
    }).then(function(dbSignup) 
    {
    	//res.json(dbSignup);
    	//redirect for now
      //res.redirect(307, "/api/login");
    }).catch(function(err) 
    {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
    console.log("new user added");
  });










//end of exports
 };