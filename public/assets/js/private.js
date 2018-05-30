$(document).ready(function () {
    var $this = $(this);
    $this.find('.message:first').text('');

    $(".register").on("click", function (event) {
        var id = $(this).data("id");
        var enrollFunc = $(this).data("register");
        event.preventDefault();

        if (enrollFunc == 'true') {
            $.ajax("/api/unenroll/" + id, {
                type: "POST",
            }).then(function (response) {
                console.log("here");
                // Reload the page to get the updated list
                location.reload();
            });
        } else {
            $.ajax("/api/register/" + id, {
                type: "POST",
            }).then(function (response) {
                console.log("here");
                // Reload the page to get the updated list
                location.reload();
            });
        }
    });

});