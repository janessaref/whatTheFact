// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {

    app.get("/api/user/:id/search", function(req, res) {
        //Returning JSON data for all their saved searches for a specific user -FROM THE API
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Search]

        }).then(function(dbSearch) {
            res.json(dbSearch);
        });
    });
};