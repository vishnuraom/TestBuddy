//$('#confirm_password','#password').on('keyup', function () {
//    if ($('#password').val() == $('#confirm_password').val()) {
//        $('#message').html('Matching').css('color', 'green');
//    } else
//        $('#message').html('Not Matching').css('color', 'red');
//});
$('#login').click(function () {
    $('#imgLoading').show();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:59257/Token",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        },
        "data": {
            "grant_type": "password",
            "username": $('#emailid').val(),
            "Password": $('#password').val()
        }
    }

    $.ajax(settings).done(function (response) {
        localStorage.setItem('Token', response.access_token);
        localStorage.setItem('emaillayout', response.userName);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:59257/api/Role",
            "method": "GET",
            "headers": {
                "authorization": "Bearer " + response.access_token,
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (data) {
            $('#lresult').append('Login successful!\n Redirecting...');
            if (data.Role == "Student")
                window.location.href = "/Student/Test";
            else if (data.Role == "Admin")
                window.location.href = "/College/StartTest";
            else if (data.Role == "Recruiter")
                window.location.href = "/Recruiter/Performance";
        });
    }).fail(function () {
        $('#imgLoading').hide();
        $('#lresult').html("Check your Credientials").css('color', 'red')
        $('#emailid').val("");
        $('#password').val("");
    });     
});

$('#signup').click(function () {
    $('#imgLoading2').show();
    var email = $('#emailId').val();
       
    var signup_value = {
        //"Name": $('name').val(),
        "Email": $('#emailId').val(),
        "Password": $('#confirm_password').val(),
        "ConfirmPassword": $('#confirm_password').val(),
        "Role": $('#typeOfUser').val()
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:59257/api/Account/Register",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(signup_value)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#sresult').append('Sign up successful!\n Login Now.');

    }).fail(function () {
        $('#sresult').append('Have you signed up already!\n Try Logging In.');

    });
       
});

