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


