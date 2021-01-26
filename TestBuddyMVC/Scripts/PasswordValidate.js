// Tooltips
// -----------------------------------------

// Only initialise tooltips if devices is non touch
if (!('ontouchstart' in window)) {
    $('.tip').tooltip();
}

// Password Validation
// -----------------------------------------

$(function passwordValidation() {

    var pwdInput = $('#password');
    var pwdInputText = $('#confirm_password'); // This is the input type="text" version for showing password
    var pwdValid = false;

    function validatePwdStrength() {

        var pwdValue = $(this).val(); // This works because when it's called it's called from the pwdInput, see end

        // Validate the length
        if (pwdValue.length > 7) {
            $('#length').removeClass('invalid').addClass('valid');
            pwdValid = true;
        } else {
            $('#length').removeClass('valid').addClass('invalid');
        }

        // Validate capital letter
        if (pwdValue.match(/[A-Z]/)) {
            $('#capital').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#capital').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }

        // Validate lowercase letter
        if (pwdValue.match(/[a-z]/)) {
            $('#lowercase').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#lowercase').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }

        // Validate number or special character
        if (pwdValue.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)) {
            $('#number-special').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#number-special').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }
    }

    function validatePwdValid(form, event) {
        if (pwdValid === true) {
            form.submit();
        } else {
            $('#alert-invalid-password').removeClass('hide');
            event.preventDefault();
        }
    }

    pwdInput.bind('change keyup input', validatePwdStrength); // Keyup is a bit unpredictable
    pwdInputText.bind('change keyup input', validatePwdStrength); // This is the input type="text" version for showing password

    // jQuery Validation
    $(".validate-password").validate({
        // Add error class to parent to use Bootstrap's error styles
        highlight: function (element) {
            $(element).parent('.form-group').addClass('error');
        },
        unhighlight: function (element) {
            $(element).parent('.form-group').removeClass('error');
        },

        rules: {
            // Ensure passwords match
            "passwordCheckMasked": {
                equalTo: "#input-password"
            }
        },

        errorPlacement: function (error, element) {
            if (element.attr("name") == "password" || element.attr("name") == "passwordMasked") {
                error.insertAfter("#input-password");
            } else {
                error.insertAfter(element);
            }
            if (element.attr("name") == "passwordCheck" || element.attr("name") == "passwordCheckMasked") {
                error.insertAfter("#input-password-check");
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form, event) {
            //this runs when the form validated successfully
            validatePwdValid(form, event);
        }
    });

}); // END passwordValidation()