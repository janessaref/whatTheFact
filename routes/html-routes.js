// require path and our authentication.js file for users
var path = require("path");
var authentication = require("../config/middleware/authentication");

module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to

    // index route loads index.html
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // about route loads about.html
    app.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
    });
    // contact route loads contact.html
    app.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/contact.html"));
    });

    // signup route loads signup.html
    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    // profile route loads profile.html
    app.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    // login route loads login.html and redirects users to the user route
    app.get("/login", function(req, res) {
        if (req.user) {
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // user route loads user.html but the user has to be authenticated first before the next function can be executed, otherwise they would be directed to the index.html
    app.get("/user", authentication, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });
};