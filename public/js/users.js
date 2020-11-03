$(document).ready(function() {
    // hide the container
    $(".searchCardsContainer").css("display", "none");
    // welcomes members
    $.get("/api/user_data").then(function(data) {
        // grabbing the username from the route to display in the users page
        let username = JSON.stringify(data.username);
        username = username.replace(/"/g, "")
        $(".member-name").text(` ${username}!`);
    });

    // When user hits enter for the search button
    $(document).on('click', "#searchterm", function(event) {
        $(".three").empty();
        // shows the container for results
        $(".searchCardsContainer").css("display", "block");
        // variable for user input
        var userInput = $("#search-input").val();
        // variables for api key and query url for API
        let apiKey = "AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI"
        var queryURL = "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=" + userInput + "&key=" + apiKey;

        event.preventDefault();

        // grabs and displays the information from the API
        $.get(queryURL, function(response) {
            // loops through the responses
            if (response.claims.length !== 0) {
                for (var i = 0; i < 6; i++) {
                    var data = response.claims[i];
                    var title = data.claimReview[0].title;
                    var body = data.text;
                    var url = data.claimReview[0].url;
                    var rating = data.claimReview[0].textualRating;

                    // displays the facts in cards
                    var fact =
                        `    
                            <div class="card inverted searchCard">
                        <div class="ui inverted segment">
                                <p id="title-${i}">${title}</p>
                                <div class="ui inverted divider"></div>
                                <p id="body-${i}">${body}</p>
                                <i id="rating-${i}">Rating: ${rating}</i>
                                <h4><a href=${url} data-url${i}="${url}"><p>Read Article Here</p></a><h4>
                                <button type="submit" id ="saveBtn" class="ui inverted teal basic button" data-id="${i}">SAVE FACT</button>
                            </div>   
                            </div>    
                        `
                        // appends to the html
                    $(".userSearches").append(fact);
                };
            };
        });
    });

    // event listener for save button
    $(document).on('click', "#saveBtn", function(event) {
        event.preventDefault();
        // grabs the clicked card data that will be saved to the user's profile page where you will find the user's saved facts
        var savedTitle = $("#title-" + $(this).data("id"));
        var savedBody = $("#body-" + $(this).data("id"));
        var savedRating = $("#rating-" + $(this).data("id"));
        var savedURL = $("#title-" + $(this).data("id"));

        // an object to hold our results to be passed into our route
        var savedResults = {
            title: savedTitle[0].innerHTML,
            body: savedBody[0].innerHTML,
            url: savedURL[0].parentElement.children[4].outerHTML,
            rating: savedRating[0].innerHTML,
        };

        // get request for the ID of the user
        $.get("/api/user_data").then(function(data) {
            var id = data.id
                // posts our object savedResults into the route for the specific user
            $.post("/api/user/" + id + "/search", savedResults);
        });
    });
});