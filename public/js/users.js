// const search = require("../../models/search");


$(document).ready(function() {
    $(".searchCardsContainer").css("display", "none");
    // welcomes members
    $.get("/api/user_data").then(function(data) {
        let username = JSON.stringify(data.username);
        username = username.replace(/"/g, "")
        $(".member-name").text(` ${username}!`);
    });

    // When user hits enter
    $(document).on('click', "#searchterm", function(event) {
        $(".three").empty();
        $(".searchCardsContainer").css("display", "block");
        // if (event.which == 13) {
        var userInput = $("#search-input").val();
        console.log(userInput);
        let apiKey = "AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI"
        var queryURL = "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=" + userInput + "&key=" + apiKey;

        event.preventDefault();

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


    $(document).on('click', "#saveBtn", function(event) {
        event.preventDefault();
        var savedTitle = $("#title-" + $(this).data("id"));
        var savedBody = $("#body-" + $(this).data("id"));
        var savedRating = $("#rating-" + $(this).data("id"));
        var savedURL = $("#title-" + $(this).data("id"));

        var savedResults = {

            title: savedTitle[0].innerHTML,
            body: savedBody[0].innerHTML,
            url: savedURL[0].parentElement.children[4].outerHTML,
            rating: savedRating[0].innerHTML,
        };

        console.log(savedResults)

        $.get("/api/user_data").then(function(data) {
            var id = data.id
            $.post("/api/user/" + id + "/search", savedResults);
        });
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