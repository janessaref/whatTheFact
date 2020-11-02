// const search = require("../../models/search");


$(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(JSON.stringify(data.username));
      });

    // When user hits enter
    $(document).on('click', "#searchterm", function(event) {
      

        // if (event.which == 13) {
        var userInput = $("#search-input").val();
        console.log(userInput);
        let apiKey = "AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI"
        var queryURL = "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=" + userInput + "&key=" + apiKey;
        // var userSearch = encodeURIComponent(userInput);

        event.preventDefault();
        // var search = $("#searchterm").val().trim();
        // let searchTerm = {
        //     search_term: userInput
        // }

        // // passes the data to post
        // $.ajax("/api/search", {
        //     type: "POST",
        //     data: searchTerm
        // }).then(
        //     function() {
        //         // Reload the page to get the updated list
        //         // location.reload();
        //     }
        // );

        $.get(queryURL, function(response) {
            console.log(response)

            if (response.claims.length !== 0) {
                for (var i = 0; i < 6; i++) {
                    var data = response.claims[i];
                    var title = data.claimReview[0].title;
                    var body = data.text;
                    var url = data.claimReview[0].url;
                    var rating = data.claimReview[0].textualRating;


                    var fact =
                        `<div class="card">
                        <div class="ui inverted segment id="${i}">
                                <P>${title}</P>
                                <div class="ui inverted divider"></div>
                                <p>${body}</p>
                                <i>${rating}</i>
                                <h4><a href=${url}><p>Read Article Here</p></a><h4>
                                <button type='submit' class='btn btn-default'>SAVE</button>
                            </div>   
                            </div>    
                        `

                    // <div class="ui three stackable cards">
                    $(".three").append(fact);




                    // var card = $("<div>")
                    // card.addClass("ui card");

                    // var content = $("<div>");
                    // content.addClass("content");
                    // card.append(content);

                    // var header = $("<div>")
                    // header.addClass("header");
                    // header.append("<h1>" + title + "</h1>");
                    // content.append(header);

                    // // var meta = $("<div>").html(data[i].publisher);
                    // // meta.addClass("meta");
                    // // content.append(meta);

                    // var description = $("<div>");
                    // description.addClass("description");
                    // description.append("<p>" + body + "</p>");
                    // content.append(description);

                    // var rating = $("<div>")
                    // rating.addClass("extra content");
                    // rating.append("<i>" + rating + "</i>");
                    // content.append(rating);

                    // var link = $("<a>").attr("href", url);
                    // link.append("<p>" + "Read article for " + userInput + " here")
                    // content.append(link);

                    // var saveBtn = $("<button>");
                    // saveBtn.attr("type", "submit");
                    // saveBtn.addClass("btn btn-default");
                    // saveBtn.append(`<p>"SAVE"</p>`);
                    // content.append(saveBtn);

                    // $("#factchecks").prepend(card);

                }
            }

            //create data variables
            //with for loop
            // append them to page
        });


        // // When the page loads, grab all of our searches
        // $.get("/api/search", function(data) {
        //     console.log(data);

        //     if (data.length !== 0) {

        //         for (var i = 0; i < data.length; i++) {

        //             var card = $("<div>")
        //             card.addClass("ui card");

        //             var content = $("<div>");
        //             content.addClass("content");
        //             card.append(content);

        //             var header = $("<div>")
        //             header.addClass("header");
        //             header.append("<h1>" + data[i].title + "</h1>");
        //             content.append(header);

        //             // var meta = $("<div>").html(data[i].publisher);
        //             // meta.addClass("meta");
        //             // content.append(meta);

        //             var description = $("<div>");
        //             description.addClass("description");
        //             description.append("<p>" + data[i].body + "</p>");
        //             content.append(description);

        //             var rating = $("<div>")
        //             rating.addClass("extra content");
        //             rating.append("<i>" + data[i].rating + "</i>");
        //             content.append(rating);

        //             var link = $("<a>").attr("href", data[i].url);
        //             link.append("<p>" + "Read article for " + data[i].search_term + " here")
        //             content.append(link);

        //             var saveBtn = $("<button>");
        //             saveBtn.attr("type", "submit");
        //             saveBtn.addClass("btn btn-default");
        //             saveBtn.append(`<p>"SAVE"</p>`);
        //             content.append(saveBtn);


        //             // card.append("<h2>" + "TITLE: " + data[i].title + " </h2>");
        //             // card.append("<p>" + "TEXT: " + data[i].body + "</p>");
        //             // card.append("<p>" + "URL: " + data[i].url + "</p>");
        //             // card.append("<p>" + "RATING: " + data[i].rating + "</p>");

        //             $("#factchecks").prepend(card);

        //         }

        //     }

        // });
        // }
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