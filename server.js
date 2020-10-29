const axios = require("axios");

axios
    .get("https://factchecktools.googleapis.com/v1alpha1/claims:search?query=flat%20earth&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI")
    .then(function(res) {
        console.log(res.data);
    });