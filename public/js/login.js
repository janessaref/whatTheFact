$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $(".login");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's an username and password entered
    loginForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            username: usernameInput.val(),
            password: passwordInput.val()
        };

        if (!userData.username || !userData.password) {
            return;
        }

        // If we have an username and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        //sets the values equal to blank strings
        usernameInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
        //goes to api logins and sends "posts" the username and password
        $.post("/api/login", {
                username: username,
                password: password
            })
            //only after that run this function
            .then(function(data) {
                //replace the whole window (everything you see in the browser with the members)
                window.location.replace("/user");
            })
            .catch(function(err) {
                console.log(err);
            });
    }
});