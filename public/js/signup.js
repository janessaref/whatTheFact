$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var usernameInput = $("input#username-input");

    // When the signup button is clicked, we validate the email and password are not blank as well as the username
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password);
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
        $.post("/api/signup", {
                username: username,
                email: email,
                password: password
            })
            .then(function(data) {
                window.location.replace("/user");
            })
            // If there's an error, handle it by throwing up a bootstrap alert
            .catch(handleLoginErr);
    }

    // sends error to the user on the signup page
    function handleLoginErr(err) {
        $("#alert .msg").text(JSON.stringify(err.responseJSON.msg).replace(/"/g, ""));
        $("#alert").fadeIn(500);
    }
});