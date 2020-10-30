const axios = require("axios");


//  app.get put inside of a route


var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

     // Add sequelize code to get all books and return them as JSON
  app.get("/api/all", function(req, res) {
    Book.findAll({}).then(function(results){
          //axios/ajax call goes here?
      res.json(results);
    })
  });




  //Returning JSON data for ALL Posts -READ!
  app.get("/api/posts", function(req, res) {


  });
//Returning JSON data for the main page
app.get("/api/search", function(req,res) {

});

//Returning JSON data for a specific User -SAVED DATA
  app.get("/api/user/id", function(req,res){

  });
//Post route for creating a new user
  app.Post("/api/user/new", function(req,res){

  });
//EXAMPLE

// app.post("/api/posts", function(req, res) {
//   db.Post.create(req.body).then(function(dbPost) {
//     res.json(dbPost);
//   });
// });




  //Returning JSON data for all searches for a specific user -FROM THE API
  app.get("/api/user/:id/search", function(req,res){

  });
  

  // GET route for getting all of the posts
  // app.get("/api/posts", function(req, res) {
  //   var query = {};
  //   if (req.query.author_id) {
    
  //     // axios
  //  .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query="+ search + "&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
  //  .then(function(res) {
  //      console.log(res.data.claims[1,2]);
  //      //sequelize 


  //  });


  //  //

  //     query.AuthorId = req.query.author_id;
  //   }
  //   db.Post.findAll({
  //     where: query
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });


  // axios
  // .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query=flat%20earth&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
  // .then(function(res) {
  //     console.log(res.data);
  // });

  //END OF MODULES, DELETE AND SOMEONE MIGHT CRY!!!
}
