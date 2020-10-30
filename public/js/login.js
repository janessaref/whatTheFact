$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      //sets the values equal to blank strings
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      //goes to api logins and sends "posts" the email and password
      $.post("/api/login", {
        email: email,
        password: password
      })
      //only after that run this function
        .then(function() {
          //replace the whole window (everything you see in the browser with the members)
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  