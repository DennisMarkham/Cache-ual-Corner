
var path = require("path");

module.exports = function(app) {
	app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });

	app.get("/api/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });

	app.get("/api/newChat", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });

	app.get("/api/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });
};


