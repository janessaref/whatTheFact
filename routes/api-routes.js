const axios = require("axios");


//  app.get put inside of a route


var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.author_id) {
    
      // axios
   .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query="+ search + "&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
   .then(function(res) {
       console.log(res.data.claims[1,2]);
       //sequelize 


   });


   //

      query.AuthorId = req.query.author_id;
    }
    db.Post.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


 /* axios
  .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query=flat%20earth&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
  .then(function(res) {
      console.log(res.data);
  });

//category
