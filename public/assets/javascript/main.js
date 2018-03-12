//chatroom//

$("#settingsModal").on("click", function() {
	$("#modalContent").empty();
	$("#modalContent").html('<h1>h1: Username</h1><div><input name="nameChange" type="text" maxlength="20" size="20"><button name="nameSubmit">Change username</button><button name="avatarSubmit">Change avatar</button></div><div><input name="hexChange" type="text" maxlength="6" size="6"><button name="hexSubmit">Change color (Hex value)</button><button name="hexReset">Reset color</button><a href="https://tinyurl.com/hexpicker" target="_blank">a: What is a hex value?</></div>');
	$(".modal").show();
});

$("#skinModal").on("click", function() {
	$("#modalContent").empty();
	$("#modalContent").html('<form><input type="radio">Choice A <br><input type="radio">Choice B <br><input type="radio">Choice C <br><button type="submit">Choose New Skin</button></form>')
	$(".modal").show();
})

$(".modalBackground").on("click", function() {
	$(".modal").hide();
});

$("#hideModal").on("click", function() {
	$(".modal").hide();
});

//new user sign in
$(document).ready(function() {
// Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#newEmail");
  var passwordInput = $("input#newPw");
  var newUser = $("input#newName");
  var avatar ="defaultimg";
  var messageColor="000000";

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) 
  {
    event.preventDefault();
     alert("clicked");

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      userName: newUser.val().trim(),
      avatar_image: avatar,
      message_color: messageColor
    };
    console.log("Name: "+userData.userName);
  	console.log("email: "+userData.email);
  	console.log("pw: "+userData.password);
  	console.log("pic: "+userData.avatar_image);
  	console.log("color: "+userData.message_color);

    if (!userData.email || !userData.password || !userData.userName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName, userData.avatar_image, userData.message_color);
    //once signed up clear data
    emailInput.val("");
    passwordInput.val("");
    newUser.val("");
  });

    // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username, avatar, messagecolor) {
    $.post("/api/signup", {
      email: email,
      password: password,
      userName:username,
      avatar_image:avatar,
      message_color: messagecolor
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

/*
//login area
// Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#usernameLogin");
  var passwordInput = $("input#passwordLogin");

// When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    alert("login clicked");
    var userData = 
    {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
      
    };
    console.log("email: "+userData.email);
    console.log("password: "+userData.password);

    if (!userData.email || !userData.password) {
    	console.log("totally wrong pw!");
      return;
    }
    
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    console.log("hello member with correct email and pw");
  });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

*/

 });


