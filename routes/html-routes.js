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

<<<<<<< HEAD
  // user route loads blog.html
  // app.get("/user", authentication, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/user.html"));
  // });
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });
=======
    // user route loads blog.html
    app.get("/user", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });
>>>>>>> 14e4e9e8c149f432922788495c9356a239dc3649

    app.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
    });
    app.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/contact.html"));
    });


    // signup route loads author-manager.html
    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

};