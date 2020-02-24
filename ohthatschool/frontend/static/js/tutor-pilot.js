(function ($) {
    "use strict"; // Start of use strict

    // Collapse Navbar
    let navbarCollapse = function () {
        let mainNav = $("#mainNav");
        if (mainNav.offset().top > 100) {
            mainNav.addClass("navbar-shrink");
        } else {
            mainNav.removeClass("navbar-shrink");
        }
    };

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

        // Smooth scrolling using jQuery easing
    $('.js-scroll-trigger[data-href*="#"]:not([data-href="#"])').click(function () {
        let target = $($(this).attr('data-href'));
        console.log("I'm in js-scroll-trigger");
        // first hide the pages
        $('.index-info').fadeOut(500);
        // then show the target page
        target.fadeIn(500, function () {
            // move to the page
            $('html, body').animate({
                scrollTop: ($('#info').offset().top - 70)
            }, 500, "easeInOutExpo");
            $('.go-to-top').show(500);
        });
        return false;
    });


    $('.go-to-top').click(function () {
        $('html, body').animate({
            scrollTop: ($('#page-top').offset().top - 140)
        }, 500, "easeInOutExpo");
        $('.go-to-top').hide(500);
        $('.index-info').fadeOut(1200);

        return false;
    });

})(jQuery); // End of use strict