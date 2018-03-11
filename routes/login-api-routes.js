// Requiring our models and passport as we've configured it
var db = require("../models");
var Login = require("../models/login");

//self calling function from server.js
module.exports = function(app) 
{
	 // GET route for getting all of the todos
  app.get("/api/loginList", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Login.findAll({}).then(function(dbLogin) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbLogin);
    });
  });
	// Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", /*passport.authenticate("local"),*/ function(req, res) {
  	console.log("user input email: "+req.body.email);
  	console.log("user input pw:    "+req.body.password);
  	// create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Login.create({
      email: req.body.text,
      password: req.body.password,
      userName:"Testing",
      avatar_image:"",
      message_color:"000000"
    }).then(function(dbLogin) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbLogin);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
 
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log("connected. not yet authenticated");
    

    //SUCESSFUL LOGIN edit path. I set it to main
    //redirect to index page 
    res.json("/");
  });


 // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
    	console.log("logged in @ api routes getting the Login model");
    	 	
    	 	Login.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

//end of exports
 };