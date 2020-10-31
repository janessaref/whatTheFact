$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var usernameInput = $("input#username-input");
    // var firstnameInput = $("input#firstname-input");
    // var lastnameInput = $("input#lastname-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            // firstname: firstnameInput.val().trim(),
            // lastname: lastnameInput.val().trim(),
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.firstname, userData.lastname, userData.username, userData.email, userData.password);
        // firstnameInput.val("");
        // lastnameInput.val("");
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstname, lastname, username, email, password) {
        $.post("/api/signup", {
                // firstname: firstname,
                // lastname: lastname,
                username: username,
                email: email,
                password: password
            })
            .then(function(data) {
                window.location.replace("/user");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err, response) {
        $("#alert .msg").text(err.response.JSON);
        $("#alert").fadeIn(500);
    }
});