// const axios = require("axios");
//  app.get put inside of a route
var passport = require("../config/passport");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/api/user/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser)
        });
    });

    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.post("/api/signup", function(req, res) {
        // console.log(req.body)
        db.User.create({
                // firstname: req.body.firstname,
                // lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            //after that redirect to the login 
            .then(function() {
                res.redirect(307, "/api/login");
            }, function(err) {
                console.log(err)
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });


    //Returning JSON data for all searches for a specific user -FROM THE API

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}