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

    // app.post("/api/search", function(req, res) {
    //             let search_term = req.body.search_term;
    //             let apiKey = "AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI"

    //             axios({
    //                     url: `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=${search_term}&key=${apiKey}`,
    //                     method: 'GET',
    //                     responseType: 'json',
    //                 })
    //                 .then(function(response) {
    //                     console.log(response)

    //                     for (var i = 0; i < 4; i++) {
    //                         var data = response.data.claims[i]
    //                         let title = data.claimReview[0].title;
    //                         let body = data.text;
    //                         let url = data.claimReview[0].url;
    //                         let rating = data.claimReview[0].textualRating;

    //                         app.post("/api/search", function(req, res) {
    //                             title: req.title,
    //                             body: req.body,

    //                         }).catch(err => {
    //                             console.error(err);
    //                         });
    //                     }
    //                     // db.Search.create({
    //                     //     search_term: search_term,
    //                     //     title: title,
    //                     //     body: body,
    //                     //     url: url,
    //                     //     rating: rating
    //                     // }).then(function(dbSearch) {
    //                     //     res.json(dbSearch);
    //                     // });


    //                 });

    //EXAMPLE

    // app.post("/api/posts", function(req, res) {
    //   db.Post.create(req.body).then(function(dbPost) {
    //     res.json(dbPost);
    //   });
    // });


    //Returning JSON data for all searches for a specific user -FROM THE API
    app.get("/api/user/:id/search", function(req, res) {


        //Returning JSON data for all searches for a specific user -FROM THE API
        app.get("/api/user/:id/search", function(req, res) {

            db.User.findOne({
                Where: {
                    id: req.params.id
                },
                include: [db.Search]

            });

            //Returns JSON DATA for a specific search belonging to a specific user

            app.get("/api/user/:id/search/:searchId", function(req, res) {
                db.User.findOne({
                    Where: {
                        id: req.params.id
                    },
                    include: [db.SearchId]
                        //this needs more
                }).then(function(dbUser) {
                    res.json(dbUser);
                });
            });
        })
    });
    //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}