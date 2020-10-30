$(document).ready(function() {

    $(document).on('keypress', function(enter) {
        if (enter.which == 13) {
            var userInput = $("#search").val().trim();
            var search = encodeURIComponent(userInput);
            console.log(search);
        }
    });

    $("#search").click(function(e) {

        // Remove any old one
        $(".search").click(function(e) {
                $(".ripple").remove();
            })
            // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(".search").append("<span class='ripple'></span>");

        console.log($(this));
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