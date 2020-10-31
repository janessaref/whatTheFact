var mysql = require("mysql");
var connection;
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
// const axios = require("axios");
// axios
//     .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=flat%20earth&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
//     .then(function(res) {
//         console.log(res.data);
//     });



//Rachel's server.js

// // Requiring necessary npm packages
// var express = require("express");

// // Requiring passport as we've configured it


// // Setting up port and requiring models for syncing
// var PORT = process.env.PORT || 8080;
// var db = require("./models");

// // Creating express app and configuring middleware needed for authentication
// var app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));
// // We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// // Syncing our database and logging a message to the user upon success
// // listens to the PORT
// db.sequelize.sync().then(function() {
//     app.listen(PORT, function() {


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory
app.use(express.static("public"));
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
// require("./routes/autho-api-routes.js")(app);
require("./routes/html-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on https://localhost:" + PORT);
    });
});

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "factcheck_db"
    });
}