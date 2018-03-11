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


//login area
// Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#usernameLogin");
  var passwordInput = $("input#passwordLogin");

// When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    alert("clicked");
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
      
    };

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

