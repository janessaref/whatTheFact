$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page updates the class text with date and email

    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(JSON.stringify(data.username));
    });

    $(document).on('keypress', function(enter) {
      if (enter.which == 13) {
          var userInput = $("#search").val().trim();
          var search = encodeURIComponent(userInput);
          // console.log(search);
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
  console.log(timesClicked);
  if (timesClicked % 2 == 0) {
      async function display() {
          document.getElementById("search").style.display = "inline-block";
      }
      display().then(function() {
          $("#search").focus();
      });
      display();
      // Remove any old one

      // Setup
      var posX = $(this).offset().left,
          posY = $(this).offset().top,
          buttonWidth = $(this).width(),
          buttonHeight = $(this).height();

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
      // console.log("removed");
  }
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
          $("#search-area").prepend(row);

      }

  }



  });
  