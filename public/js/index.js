$(document).ready(function() {

    $(document).on('keypress', function(enter) {
        if (enter.which == 13) {
            var userInput = $("#search").val().trim();
            var search = encodeURIComponent(userInput);
            console.log(search);
        }
    });

    // CARD FLIP

    var $num = $('.cardContainer .card').length;

    var $even = $num / 2;
    var $odd = ($num + 1) / 2;

    if ($num % 2 == 0) {
        $('.cardContainer .card:nth-child(' + $even + ')').addClass('active');
        $('.cardContainer .card:nth-child(' + $even + ')').prev().addClass('prev');
        $('.cardContainer .card:nth-child(' + $even + ')').next().addClass('next');
    } else {
        $('.cardContainer .card:nth-child(' + $odd + ')').addClass('active');
        $('.cardContainer .card:nth-child(' + $odd + ')').prev().addClass('prev');
        $('.cardContainer .card:nth-child(' + $odd + ')').next().addClass('next');
    }

    $('.cardContainer .card').on('click', function() {
        if ($('.cardContainer').is(':animated')) {
            return;
        }

        var $slide = $('.cardContainer .active').width();

        if ($(this).hasClass('next')) {
            $('.cardContainer').animate({ left: '-=' + $slide });
        } else if ($(this).hasClass('prev')) {
            $('.cardContainer').animate({ left: '+=' + $slide });
        }

        $(this).removeClass('prev next');
        $(this).siblings().removeClass('prev active next');

        $(this).addClass('active');
        $(this).prev().addClass('prev');
        $(this).next().addClass('next');
    });

    // Keyboard nav
    $('html body').keydown(function(e) {
        if (e.keyCode == 37) { // left
            $('.cardContainer .active').prev().trigger('click');
        } else if (e.keyCode == 39) { // right
            $('.cardContainer .active').next().trigger('click');
        }
    });
});



var timesClicked = 1;

$(".search").click(function(e) {
    timesClicked++;
    if (timesClicked % 2 == 0) {
        async function display() {
            document.getElementById("search").style.display = "inline-block";
        }
        display().then(function() {
            $("#search").focus();
        });
        display();

        document.querySelector("h2").style.color = "#141414";

        // Setup
        var posX = $(".search").offset().left,
            posY = $(".search").offset().top,
            buttonWidth = $(".search").width(),
            buttonHeight = $(".search").height();

        // Add the element
        $(".search").append("<span class='ripple'></span>");

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;


        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");

    } else {
        $(".ripple").remove();
        document.getElementById("search").style.display = "none";
        document.querySelector("h2").style.color = "#ffff";
    }
});

const axios = require("axios");


// searchterm is the name of the ID in the html
// this should all the be inside the search button click

// AJAX CALL FOR FACT CHECKER
$.ajax({
    url: "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=" + search + "&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI",
    method: "GET"
}).then(function(response) {
    // console.log(response);
    // console.log(response.claims[0].text)

    // setting results into an object to be passed into API route
    let results = {
        search_term: $("#search").val().trim(),
        title: response.claims[0].claimReview[0].title,
        body: response.claims[0].text,
        url: response.claims[0].claimReview[0].url,
        rating: response.claims[0].claimReview[0].textualRating
    }

    // Posts the data into the route
    $.ajax("/api/search", {
        type: "POST",
        data: results
    }).then(
        function() {
            // Reload the page to get the updated list
            location.reload();
        }
    );


});

// idk if u need this but leaving it here and it grabs the saved searches to stay on the page
// NOT INSIDE ANY BUTTON CLICK, should be outside and at the bottom of page!
// When the page loads, grab all of our searches
$.get("/api/search", function(data) {

    // however many searches the user has, it will display the data
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            // appends a new row for each search
            var row = $("<div>");
            // adding a css styling class named "search" to the row
            row.addClass("search");

            // appends all data in p tags inside the div
            row.append("<p>" + "TITLE: " + data[i].title + " </p>");
            row.append("<p>" + "TEXT: " + data[i].body + "</p>");
            row.append("<p>" + "URL: " + data[i].url + "</p>");
            row.append("<p>" + "RATING: " + data[i].rating + "</p>");

            // searches will be stacked over each other hence prepend
            $("#featured").prepend(row);

        }

    }

});


// searchterm is the name of the ID in the html
// this should all the be inside the search button click

// AJAX CALL FOR FACT CHECKER
$.ajax({
    url: "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=" + search + "&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI",
    method: "GET"
}).then(function(response) {
    // console.log(response);
    // console.log(response.claims[0].text)

    // setting results into an object to be passed into API route
    let results = {
        search_term: $("#search").val().trim(),
        title: response.claims[0].claimReview[0].title,
        body: response.claims[0].text,
        url: response.claims[0].claimReview[0].url,
        rating: response.claims[0].claimReview[0].textualRating
    }

    // Posts the data into the route
    $.ajax("/api/search", {
        type: "POST",
        data: results
    }).then(
        function() {
            // Reload the page to get the updated list
            location.reload();
        }
    );


});

// idk if u need this but leaving it here and it grabs the saved searches to stay on the page
// NOT INSIDE ANY BUTTON CLICK, should be outside and at the bottom of page!
// When the page loads, grab all of our searches
$.get("/api/search", function(data) {

    // however many searches the user has, it will display the data
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            // appends a new row for each search
            var row = $("<div>");
            // adding a css styling class named "search" to the row
            row.addClass("search");

            // appends all data in p tags inside the div
            row.append("<p>" + "TITLE: " + data[i].title + " </p>");
            row.append("<p>" + "TEXT: " + data[i].body + "</p>");
            row.append("<p>" + "URL: " + data[i].url + "</p>");
            row.append("<p>" + "RATING: " + data[i].rating + "</p>");

            // searches will be stacked over each other hence prepend
            $("#featured").prepend(row);

        }

    }

});