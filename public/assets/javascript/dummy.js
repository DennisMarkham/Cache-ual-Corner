$('#btnLogin').on("click",function(){
	event.preventDefault();
	var username = $("#userName").val().trim();

	sessionStorage.clear();
	sessionStorage.setItem("Cache-ual-Corner", username);

	//set logged=true in db

});

$('#btnLogout').on("click",function(){
	event.preventDefault();
	sessionStorage.removeItem("Cache-ual-Corner");

	//set logged=false in db

});