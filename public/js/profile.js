$(document).ready(function() {

    var savedSearchContainer = $(".savedSearches");
    // var postCategorySelect = $("#category");

    // event listeners for delete and edit profile
    // $(document).on("click", "button.delete", handlePostDelete);
    // $(document).on("click", "button.edit", handlePostEdit);

    // var url = window.location.search;
    // var userId;
    // if (url.indexOf("?user_id=") !== -1) {
    //     userId = url.split("=")[1];
    //     getSearch(userId);
    // } else {
    //     getSearch();
    // }

    getSearch();
    // Variable to hold our searches
    var userSavedSearches;

    function getSearch() {
        $.get("/api/user_data").then(function(response) {
            console.log("response", response)
            $.get("/api/user/" + response.id + "/search", function(data) {
                // console.log("Searches", data);
                // console.log(data.Searches)
                userSavedSearches = data.Searches;
                if (!userSavedSearches || !userSavedSearches.length) {
                    displayEmpty();
                } else {
                    initializeRows();
                }
            });
        });



    };

    function initializeRows() {
        savedSearchContainer.empty();
        var searchesArray = [];
        for (var i = 0; i < userSavedSearches.length; i++) {
            searchesArray.push(createNewRow(userSavedSearches[i]));
        }
        savedSearchContainer.append(searchesArray);
    }

    $("#savedCards").on("click", ".card", function() {
        // console.log($(this).find(".title")[0].innerHTML);
        let title = $(this).find(".title")[0].innerHTML;
        deleteSearch(title);

    });

    function deleteSearch(title) {
        $.get("/api/user_data").then(function({ id }) {
            $.ajax({
                method: "DELETE",
                url: "/api/user/search/delete",
                data: title

            }).then(function() {

            });
        });

    }

    function createNewRow(search) {
        console.log(search)

        var savedSearchCards =
            `    
        <div class="card">
         <div class="ui inverted segment">
            <p class="title">${search.title}</p>
            <div class="ui inverted divider"></div>
            <p class="text">${search.body}</p>
            <i class="rating">${search.rating}</i>
            ${search.url}
            <button type='submit' class="btn btn-default editBtn">EDIT</button>
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