$(document).ready(function() {
    // Container where we append our saved cards on the profile.html
    var savedSearchContainer = $(".savedSearches");
    // calls our function to show all our saved searches
    getSearch();
    // Variable to hold the searches
    var userSavedSearches;

    function getSearch() {
        // grabs the id of the current logged in user
        $.get("/api/user_data").then(function(response) {
            // passes it into our route to grab the saved search data of our user
            $.get("/api/user/" + response.id + "/search", function(data) {
                // setting our empty variable to our search data
                userSavedSearches = data.Searches;
                // if the profile page is empty, display text and navigate them to the fact search page otherwise, display the user's saved searches
                if (!userSavedSearches || !userSavedSearches.length) {
                    displayEmpty();
                } else {
                    initializeRows();
                };
            });
        });
    };

    // function that pushes the saved cards to the profile.html
    function initializeRows() {
        // empties the container
        savedSearchContainer.empty();
        // empty array to push each saved search 
        var searchesArray = [];
        // loops through the user's saved search data and each saved fact search will have their own saved card as it's passing in the user's saved searches into the createNewRow function
        for (var i = 0; i < userSavedSearches.length; i++) {
            searchesArray.push(createNewRow(userSavedSearches[i]));
        };
        // appends our user's saved fact searches array to the container variable
        savedSearchContainer.append(searchesArray);
    };

    // listener for the div with the id of savedCards in our html
    $("#savedCards").on("click", ".card", function() {
        // variable that grabs the title information we want as our identifier for our user to delete any of their saved searches
        let title = $(this).find(".title")[0].innerHTML;
        deleteSearch(title);
    });

    // passes in the title we grabbed and this function will then delete a specific clicked saved search
    function deleteSearch(title) {
        // grabs the currently logged in user's id as our identifier to delete searches in the route as well as the title
        $.get("/api/user_data").then(function({ id }) {
            $.ajax({
                method: "DELETE",
                url: "/api/user/" + id + "/search",
                data: title
            }).then(function() {
                location.reload();
            });
        });
    };

    function createNewRow(search) {

        var savedSearchCards =
            `    
        <div class="card">
         <div class="ui inverted segment">
            <p id="title">${search.title}</p>
            <div class="ui inverted divider"></div>
            <p id="text">${search.body}</p>
            <i id="rating">${search.rating}</i>
            ${search.url}
            <button type='submit' class="btn btn-danger deleteBtn">X</button>
        </div>   
        </div>    
    `
        return savedSearchCards;

        // var newSaveSearchCard = $("<div>");
        // newSaveSearchCard.addClass("card");
        // var searchCardHeading = $("<div>");
        // searchCardHeading.addClass("ui inverted segment");
        // var deleteBtn = $("<button>");
        // deleteBtn.text("x");
        // deleteBtn.addClass("delete btn btn-danger");
        // var editBtn = $("<button>");
        // editBtn.text("EDIT");
        // editBtn.addClass("edit btn btn-default");
        // var searchTitle = $("<h4>");
        // // var searchPublisher = $("<h5>");
        // // searchPublisher.text("Published by: " + );
        // // searchPublisher.css({
        // //   float: "right",
        // //   color: "blue",
        // //   "margin-top":
        // //   "-10px"
        // // });
        // var newCardBody = $("<div>");
        // newCardBody.addClass("ui inverted divider");
        // var searchBody = $("<p>");
        // searchTitle.text(search.title);
        // searchBody.text(search.body);
        // searchCardHeading.append(deleteBtn);
        // searchCardHeading.append(editBtn);
        // searchCardHeading.append(searchTitle);
        // // searchCardHeading.append(searchPublisher);
        // newCardBody.append(searchBody);
        // newSaveSearchCard.append(searchCardHeading);
        // newSaveSearchCard.append(newCardBody);
        // newSaveSearchCard.data("search", search);
        // return newSaveSearchCard;
    }

    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for User #" + id;
        }
        savedSearchContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No saved searches yet" + partial + ", navigate <a href='/user" + query +
            "'>here</a> in order to get started.");
        savedSearchContainer.append(messageH2);
    }

});