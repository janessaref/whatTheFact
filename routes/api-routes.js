// require our models and passport.js file
var passport = require("../config/passport");
var db = require("../models");

// Routes
module.exports = function(app) {
    // this route grabs the data of a specific user
    app.get("/api/user/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // If the user has valid login credentials, send them to the user page
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // when the user signs up, save their credentials into the user database
    app.post("/api/signup", function(req, res) {
        db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            // after that redirect to the login 
            .then(function() {
                res.redirect(307, "/api/login");
            }, function(err) {
                res.status(401).json({ msg: "Invalid email or password. Password must be 8 characters long" });
            });
    });

    // Route for logging the user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // grabs the info of a user who is currently logged in
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            res.json({
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        };
    });
    //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}