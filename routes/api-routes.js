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
    /* axios
     .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query=flat%20earth&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
     .then(function(res) {
         console.log(res.data);
     }); */

    // Add sequelize code to get all books and return them as JSON
    // app.get("/api/all", function(req, res) {
    //   db.findAll({}).then(function(results){
    //         //axios/ajax call goes here?
    //     res.json(results);
    //   })
    // });




    //Returning JSON data for ALL Posts -READ!
    // app.get("/api/posts", function(req, res) {
    //   var query = {};
    //   if (req.query.author_id) {
    //     query.AuthorId = req.query.author_id;
    //   }
    //   // Here we add an "include" property to our options in our findAll query
    //   // We set the value to an array of the models we want to include in a left outer join
    //   // In this case, just db.Author
    //   db.Post.findAll({
    //     where: query,
    //     include: [db.Author]
    //   }).then(function(dbPost) {
    //     res.json(dbPost);
    //   });

    // });
    //Returning JSON data for the main page
    //rachael's idea
    // app.get("/api/search", function(req,res) {

    // });

    //Returning JSON data for a specific user -SAVED DATA
    // app.get("/api/user/:id", function(req,res){
    //   db.User.findOne({Where:{id: req.params.id}}).then(function(dbUser){
    //     res.json(dbUser);
    //   })

    //get from the userdb

    // });
    // Post route for creating a new user
    //   app.post("/api/user/new", function(req,res){
    // //to the user db
    // db.User.create(
    //   {username:req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,

    //    }


    //   ).then(function(dbUser) {
    //   res.json(dbUser);
    // });

    //   });
    //EXAMPLE

    // app.post("/api/posts", function(req, res) {
    //   db.Post.create(req.body).then(function(dbPost) {
    //     res.json(dbPost);
    //   });
    // });

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log(req.body)
        db.User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
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


    //this one might be weird, might need changing --??

    // Route for getting some data about our user to be used client side
    // app.get("/api/user_data", function(req, res) {
    //   if (!req.user) {
    //     // The user is not logged in, send back an empty object
    //     res.json({});
    //   } else {
    //     // Otherwise send back the user's email and id
    //     // Sending back a password, even a hashed password, isn't a good idea
    //     res.json({
    //       email: req.user.email,
    //       id: req.user.id
    //     });
    //   }
    // });


  //Returning JSON data for all searches for a specific user -FROM THE API

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });



  //Returning JSON data for all searches for a specific user -FROM THE API
  app.get("/api/user/:id/search", function(req,res){

    db.User.findOne({Where: {
      id: req.params.id
    },
     include: [db.Search] 

    });


//Returns JSON DATA for a specific search belonging to a specific user

  app.get("/api/user/:id/search/:searchId", function(req,res){
    db.User.findOne({Where: {
      id: req.params.id
    },
     include: [db.SearchId] 
//this needs more
    }).then(function(dbUser) {
      res.json(dbUser);
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

