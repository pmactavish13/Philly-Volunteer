$(document).ready(function () {

    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });

    (function ($) {
        "use strict"; // Start of use strict
        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').click(function () {
            $('.navbar-collapse').collapse('hide');
        });
    })(jQuery); // End of use strict
    
    $("#signin").on("submit", function (event) {
        
        var $this = $(this);
        $this.find('.message:first').text('');
        
        event.preventDefault();
        if ($.trim($("#email").val()) === "" || $.trim($("#email").val()) === "jDoe@email.com" || $.trim($("#email").val()) === "Please enter a valid e-mail Address") {
            $("#email").val(" Please enter your e-mail Address");
            return false;
        }
        if ($.trim($("#password").val()) === "" || $.trim($("#password").val()) === "Password" || $.trim($("#password").val()) === "Please enter a Password") {
            $("#password").val(" Please enter a Password");
            return false;
        }
        var signin = {
            password: $("#password").val().trim(),
            email: $("#email").val().trim(),
        }

        // Send the POST request.
        $.ajax("/api/signin", {
            type: "POST",
            data: signin
        }).then(
            function (response) {
                window.location.href = response.redirectTo;
            },
            function(error) {
                $this.find('.message:first').text('Username and/or password incorrect');
            }
        );
    });
});