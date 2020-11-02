const axios = require("axios");
//  app.get put inside of a route
var passport = require("../config/passport");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    // app.get("/api/search", function(req, res) {
    //     db.Search.findAll({}).then(function(dbSearch) {
    //         res.json(dbSearch);
    //     });
    // });

    //EXAMPLE

    // app.post("/api/posts", function(req, res) {
    //   db.Post.create(req.body).then(function(dbPost) {
    //     res.json(dbPost);
    //   });
    // });


    //Returning JSON data for all searches for a specific user -FROM THE API
    app.get("/api/user/:id/search", function(req, res) {
        //Returning JSON data for all searches for a specific user -FROM THE API
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Search]

        }).then(function(dbSearch) {
            res.json(dbSearch);
            console.log(dbSearch)
        });
    });

    app.post("/api/user/:id/search", function(req, res) {
        db.Search.create({
            title: req.body.title,
            body: req.body.body,
            url: req.body.url,
            rating: req.body.rating,
            UserId: req.params.id
        }).then(function(dbSearch) {
            res.json(dbSearch);
            console.log(dbSearch)
        });
    });

    app.delete("/api/user/:id/search", function(req, res) {
        db.Search.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbSearch) {
            res.json(dbSearch);
        });
    });
    //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}