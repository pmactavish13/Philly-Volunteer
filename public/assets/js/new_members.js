// Make sure to wait to attach handlers until the DOM is fully loaded.
$(document).ready(function () {
    if ($(".modal-title").text() == "My Profile") {
        $("#newEmail").attr("readonly", true);
    }
    $("#newMemberRegistration").on("click", function (event) {
        event.preventDefault();

        var $this = $(this);
        $this.find('.message:first').text('');

        if ($(this).data("action") == 'create') {
            methodType = "POST";
        } else {
            methodType = "PUT";
        }
        
        var newMember = validateForm();

        if (newMember) {
            // Send the POST request.
            $.ajax("/api/signup", {
                type: methodType,
                data: newMember
            }).then(
                function (response) {
                    window.location.href = response.redirectTo;
                },
                function (error) {
                    $('.message').text('That email account is already in use.');
                }
            );
        }
    });

    function validateForm() {
        if ($.trim($("#newPassword").val()) === "" || $.trim($("#newPassword").val()) === "Password" || $.trim($("#newPassword").val()) === "Please enter a Password") {
            $("#newPassword").val(" Please enter a Password");
            return false;
        }
        if ($.trim($("#newEmail").val()) === "" || $.trim($("#newEmail").val()) === "jDoe@email.com" || $.trim($("#newEmail").val()) === "Please enter a valid e-mail Address") {
            $("#newEmail").val(" Please enter your e-mail Address");
            return false;
        }
        if ($.trim($("#firstName").val()) === "" || $.trim($("#firstName").val()) === "First Name" || $.trim($("#firstName").val()) === "Please enter your First Name") {
            $("#firstName").val(" Please enter your First Name");
            return false;
        }
        if ($.trim($("#lastName").val()) === "" || $.trim($("#lastName").val()) === "Last Name" || $.trim($("#lastName").val()) === "Please enter your Last Name") {
            $("#lastName").val(" Please enter your Last Name");
            return false;
        }    
        if ($.trim($("#phone").val()) === "" || $.trim($("#phone").val()) === "123-456-7890" || $.trim($("#phone").val()) === "Please enter your Contact Number") {
            $("#phone").val(" Please enter your Contact Number");
            return false;
        }

        var newMember = {
            password: $("#newPassword").val().trim(),
            email: $("#newEmail").val().trim(),
            first_name: $("#firstName").val().trim(),
            last_name: $("#lastName").val().trim(),
            phone: $("#phone").val().trim(),
            inOrOut: $("#selectInOrOut option:selected").text(),
        };

        $('input[name="skills"]:checked').each(function () {
            newMember[this.value] = true;
        });
        return newMember;
    }
});