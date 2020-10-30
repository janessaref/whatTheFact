var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/main.html"));
//   });

  // index route loads cms.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // user route loads blog.html
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  // signup route loads author-manager.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

};