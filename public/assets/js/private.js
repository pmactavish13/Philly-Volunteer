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


    $("#newOpportunityForm").on("submit", function (event) {
        event.preventDefault();

        var $this = $(this);
        $this.find('.message:first').text('');

        if ($.trim($("#organizationName").val()) === "" || $.trim($("#organizationName").val()) === "Organization Name" || $.trim($("#organizationName").val()) === "Please enter your Organization Name") {
            $("#organizationName").val(" Please enter your Organization Name");
            return false;
        }
        if ($.trim($("#opportunityName").val()) === "" || $.trim($("#opportunityName").val()) === "Event Name" || $.trim($("#opportunityName").val()) === "Please enter your Event Name") {
            $("#opportunityName").val(" Please enter your Event Name");
            return false;
        }
        if ($.trim($("#tagLine").val()) === "" || $.trim($("#tagLine").val()) === "To be used with your Event listing" || $.trim($("#tagLine").val()) === "Please enter information about your Event") {
            $("#tagLine").val(" Please enter a tag line for your Event");
            return false;
        }
        if ($.trim($("#organizationPhone").val()) === "" || $.trim($("#organizationPhone").val()) === "123-456-7890" || $.trim($("#organizationPhone").val()) === "Please enter your Contact Number") {
            $("#organizationPhone").val(" Please enter your Contact Number");
            return false;
        }
        if ($.trim($("#eMail").val()) === "" || $.trim($("#eMail").val()) === "jDoe@email.com" || $.trim($("#eMail").val()) === "Please enter a valid e-mail Address") {
            $("#eMail").val(" Please enter your e-mail Address");
            return false;
        }
        if ($.trim($("#opportunityPhotoUrl").val()) === "" || $.trim($("#opportunityPhotoUrl").val()) === "URL Address" || $.trim($("#opportunityPhotoUrl").val()) === "Please enter a valid URL address") {
            $("#opportunityPhotoUrl").val(" Please enter the URL address of your photo");
            return false;
        }
        if ($.trim($("#address").val()) === "" || $.trim($("#address").val()) === "1234 Main St." || $.trim($("#address").val()) === "Please enter the Address of your Event") {
            $("#address").val(" Please enter the Address of your Event");
            return false;
        }
        if ($.trim($("#city").val()) === "" || $.trim($("#city").val()) === "City" || $.trim($("#city").val()) === "Please enter a valid City") {
            $("#city").val(" Please enter a valid City");
            return false;
        }
        if ($.trim($("#zip").val()) === "" || $.trim($("#zip").val()) === "12345" || $.trim($("#zip").val()) === "Please enter a valid Zip Code") {
            $("#zip").val(" Please enter a valid Zip Code");
            return false;
        }
        if ($.trim($("#volunteersNeeded").val()) === "" || $.trim($("#volunteersNeeded").val()) === "0" || $.trim($("#volunteersNeeded").val()) === "Please enter a valid Number") {
            $("#volunteersNeeded").val(" Please enter a valid Number");
            return false;
        }
        var newOpportunity = {
            organization_name: $("#organizationName").val().trim(),
            opportunity_name: $("#opportunityName").val().trim(),
            tag_line: $("#tagLine").val().trim(),
            organization_phone: $("#organizationPhone").val().trim(),
            organization_email: $("#eMail").val().trim(),
            opportunity_photo_Url: $("#opportunityPhotoUrl").val().trim(),
            organization_address: $("#address").val().trim(),
            organization_city: $("#city").val().trim(),
            organization_state: $("#selectState option:selected").text(),
            organization_zip: $("#zip").val().trim(),
            opportunity_date: $("#date").val().trim(),
            opportunity_start_time: $("#startTime").val().trim(),
            opportunity_end_time: $("#endTime").val().trim(),
            opportunity_inOrOut: $("#opportunitySelectInOrOut option:selected").text(),
            volunteers_needed: $("#volunteersNeeded").val().trim(),
        };

        $('input[name="skills"]:checked').each(function () {
            newOpportunity[this.value] = true;
        });

        // Send the POST request.
        if (newOpportunity) {
            $.ajax("/api/new_opportunity", {
                type: "POST",
                data: newOpportunity
            }).then(
                function (response) {
                    // Reload the page to get the updated list
                    // location.reload();
                    $(location).attr('href', '/private')
                },
                function (error) {
                    console.log(error);
                    $this.find('.message:first').text('Sorry your event did not post, please try again.');
                }
            );
        }
    });

    // var handlebarsEventData = {
    //     eventData: {
    //         eventForm: "Event Registration",
    //         formAction: "create",
    //         buttonName: "Create Evnet",
    //         deactivateButton: '',
    //         usernameReadOnly: 'false',
    //         organizationName: "Organization Bame",
    //         organizationNameFocus: "",
    //         opportunityName: "Event Name",
    //         opportunityNameFocus: "",
    //         tagLine: "Your Event Tag",
    //         tagLineFocus: "",
    //         phone: "123-456-7890",
    //         phoneFocus: "",
    //         email: "jdoe@email.com",
    //         emailFocus: "",
    //         opportunityPhotoUrl: "URL address",
    //         opportunityPhotoUrlFocus: "",
    //         address: "1234 Main St",
    //         addressFocus: "",
    //         city: "city",
    //         cityFocus: "",
    //         state: "ST",
    //         stateFocus: "",
    //         zip: "12345",
    //         zipFocus: "",
    //         date: "mm/dd/yy",
    //         dateFocus: "",
    //         startTime: "HHmm",
    //         startTime: "",
    //         endTime: "HHmm",
    //         endTime: "",
    //         selectInOrOut: "Choose",
    //         selectInOrOutFocus: "",
    //         volunteersNeeded: "",
    //         volunteerNeededFocus: "",
    //         cooking: "",
    //         gardening: "",
    //         painting: "",
    //         carpentry: "",
    //         plumbing: "",
    //         electrical: "",
    //         publicRelations: "",
    //         marketing: "",
    //         fundRaising: "",
    //         programming: "",
    //         sales: "",
    //         teaching: "",
    //     },
    // }

    // var eventHandlebarsData = {
    //     eventData: {
    //       formName: "My Event",
    //       formAction: "update",
    //       buttonName: "Update",
    //       deactivateButton: '<button id="deactivate" data-id="' + req.user.id + '" class="btn btn-primary btn-xl text-uppercase" value="deactivate">Deactivate</button>',
    //       userameReadOnly: 'readonly',
    //       organizationName: req.user.organization_name,
    //       organizationNameFocus: req.user.organization_name,
    //       opportunityName: req.user.opportunity_name,
    //       opportunityNameFocus: req.user.opportunity_name,
    //       tagLine: req.user.tagLine,
    //       tagLineFocus: req.user.tagLine,
    //       phone: req.user.organization_phone,
    //       phoneFocus: req.user.organization_phone,
    //       email: req.user.organization_email,
    //       emailFocus: req.user.organization_email,
    //       opportunityPhotoUrl: req.user.opportunity_photo_Url,
    //       opportunityPhotoUrlFocus: req.user.opportunity_photo_Url,
    //       address: req.user.organization_address,
    //       addressFocus: req.user.organization_address,
    //       city: req.user.organization_city,
    //       cityFocus: req.user.organization_city,
    //       state: req.user.organization_state,
    //       stateFocus: req.user.organization_state,
    //       zip: req.user.organization_zip,
    //       zipFocus: req.user.organization_zip,
    //       date: req.user.opportunity_date,
    //       dateFocus: req.user.opportunity_date,
    //       startTime: req.user.opportunity_start_time,
    //       startTime: req.user.opportunity_start_time,
    //       endTime: req.user.opportunity_end_time,
    //       endTime: req.user.opportunity_end_time,
    //       selectInOrOut: req.user.opportunity_inOrOut,
    //       selectInOrOutFocus: req.user.opportunity_inOrOut,
    //       volunteersNeeded: req.user.volunteers_needed,
    //       volunteerNeededFocus: req.user.volunteers_needed,
    //       cooking: req.user.cooking ? "checked" : "",
    //       gardening: req.user.gardening ? "checked" : "",
    //       painting: req.user.painting ? "checked" : "",
    //       carpentry: req.user.carpentry ? "checked" : "",
    //       plumbing: req.user.plumbing ? "checked" : "",
    //       electrical: req.user.electrical ? "checked" : "",
    //       publicRelations: req.user.publicRelations ? "checked" : "",
    //       marketing: req.user.marketing ? "checked" : "",
    //       fundRaising: req.user.fundRaising ? "checked" : "",
    //       programming: req.user.programming ? "checked" : "",
    //       sales: req.user.sales ? "checked" : "",
    //       teaching: req.user.teaching ? "checked" : "",
    //     },
    // }    

});