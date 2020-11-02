var path = require("path");
var authentication = require("../config/middleware/authentication");

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
        if (req.user) {
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // user route loads blog.html
    // app.get("/user", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/user.html"));
    // });

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

    app.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/login", function(req, res) {
        if (req.user) {
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/user", authentication, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });


};