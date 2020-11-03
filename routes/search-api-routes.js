// var passport = require("../config/passport");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // when user clicks the save button, saves the search data into the database
    app.post("/api/user/:id/search", function(req, res) {
        db.Search.create({
            title: req.body.title,
            body: req.body.body,
            url: req.body.url,
            rating: req.body.rating,
            UserId: req.params.id
        }).then(function(dbSearch) {
            res.json(dbSearch);
        });
    });
    //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}