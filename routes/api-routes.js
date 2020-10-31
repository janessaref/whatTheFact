const axios = require("axios");
var db = require("../models");

module.exports = function(app) {

    app.get("/api/posts", function(req, res) {
        var query = {};
        if (req.query.author_id) {

            // axios
            axios.get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query=" + search + "&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
                .then(function(res) {
                    console.log(res.data.claims[1, 2]);
                    //sequelize 


                });


            query.AuthorId = req.query.author_id;
        }
        db.Post.findAll({
            where: query
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });
}