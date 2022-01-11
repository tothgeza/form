export function setNameValidationMessage(nameId) {
    if (nameValidation(nameId)) {
        $(nameId).removeClass('is-invalid').removeClass('remove-ok').addClass('is-valid').addClass('glyphicon-ok');
    } else {
        $(nameId).removeClass('is-valid').removeClass('glyphicon-ok').addClass('is-invalid').addClass('glyphicon-remove');
    }
}

export function setDateValidationMessage() {
    if (dateValidation('#dateInput')) {
        $('#dateInput').removeClass('is-invalid').addClass('is-valid');
    } else {
        $('#dateInput').removeClass('is-valid').addClass('is-invalid');
    }
}

export function setPhoneValidationMessage() {
    if (phoneValidation()) {
        $('#phoneInput').removeClass('is-invalid').addClass('is-valid');
    } else {
        $('#phoneInput').removeClass('is-valid').addClass('is-invalid');
    }
}

export function setPasswordValidationMessage() {
    if (passwordValidation()) {
        $('#passwordInput').removeClass('is-invalid').addClass('is-valid');
    } else {
        // console.log(/^\S*$ /.test($('#passwordInput').val()));
        if (/^\S*$/.test($('#passwordInput').val())) {
            $("#pass-required").html("Kérjük, helyesen töltsd ki ezt a mezőt!")
        } else {
            $("#pass-required").html("A jelszó nem tartalmazhat szóközt!")
        }
        $('#passwordInput').removeClass('is-valid').addClass('is-invalid');
    }
}

export function setConfirmPasswordValidationMessage() {
    if (confirmPasswordValidation()) {
        $('#confirmPasswordInput').removeClass('is-invalid').addClass('is-valid');
    } else {
        $('#confirmPasswordInput').removeClass('is-valid').addClass('is-invalid');
    }
}

export function nameValidation(id) {
    return $(id).val().trim() !== ''
}

export function dateValidation(dateId) {
    var birthString = $(dateId).val().split(".");
    var birthDate = new Date((parseInt(birthString[0]) + 18), parseInt(birthString[1]) - 1, birthString[2])
    var today = new Date();
    return today >= birthDate;
}

export function phoneValidation() {
    return $('#phoneInput').val().replace(/-|\(|\)|\ /g, '').length == 9;
}

export function confirmPasswordValidation() {
    return $('#passwordInput').val() === $('#confirmPasswordInput').val();
}

// Password
let passwordInput = $('#passwordInput');
let letter = $('#letter');
let capital = $('#capital');
let number = $('#number');
let length = $('#length');
let message = $('#message');
let names = $('#names');

// When the user clicks on the password field, show the message box
passwordInput.focus(function () {
    message.collapse('show');
    // $('#message').show();
})

// When the user clicks outside of the password field, hide the message box
passwordInput.blur(function () {
    message.collapse('hide');
    // $('#message').hide();

})

// When the user starts to type something inside the password field
passwordInput.keyup(function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (passwordInput.val().match(lowerCaseLetters)) {
        letter.removeClass("invalid");
        letter.addClass("valid");
    } else {
        letter.removeClass("valid");
        letter.addClass("invalid");
    }
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (passwordInput.val().match(upperCaseLetters)) {
        capital.removeClass("invalid");
        capital.addClass("valid");
    } else {
        capital.removeClass("valid");
        capital.addClass("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (passwordInput.val().match(numbers)) {
        number.removeClass("invalid");
        number.addClass("valid");
    } else {
        number.removeClass("valid");
        number.addClass("invalid");
    }

    // Validate length
    if (passwordInput.val().length >= 8 && passwordInput.val().length <= 15) {
        length.removeClass("invalid").addClass("valid");
    } else {
        length.removeClass("valid").addClass("invalid");
    }

    // Validate name similarity
    if (passwordNotMatchName()) {
        names.removeClass("invalid").addClass("valid");
    } else {
        names.removeClass("valid").addClass("invalid");
    }
})

var makeSortString = (function () {
    var translate_re = /[éáűőúöüóíÉÁŰPŐÚÖÜÓÍ]/g;
    var translate = {
        "é": "e", "á": "a", "ű": "u", "ő": "o", "ú": "u",
        "ö": "o", "ü": "u", "ó": "o", "í": "i", "É": "E",
        "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O",
        "Ü": "U", "Ó": "O", "Í": "I"
    };
    return function (s) {
        return (s.replace(translate_re, function (match) {
            return translate[match];
        }));
    }
})();

export function passwordValidation() {
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[^-\s]{8,15}$/;
    let password = document.getElementById('passwordInput').value;
    return passwordNotMatchName() && password.match(regex);
}

function passwordNotMatchName() {
    let matchArray = [];
    let email = $("#emailInput").val();
    let firstName = $('#firstNameInput').val().trim();
    let lastName = $('#lastNameInput').val().trim();
    let password = document.getElementById('passwordInput').value;

    let nameOfEmail = email.substring(0, email.indexOf('@'));
    // if email contains more name (with dot)
    if (nameOfEmail.includes(".")) {
        matchArray = matchArray.concat(nameOfEmail.split('.').map(names => makeSortString(names)));
    } else {
        matchArray.push(makeSortString(nameOfEmail))
    }
    // if lastname contains more name
    if (lastName.includes(" ")) {
        matchArray = matchArray.concat(lastName.split(' ').map(names => makeSortString(names)));
    } else {
        matchArray.push(makeSortString(lastName))
    }
    // if first name contains more name
    if (firstName.includes(" ")) {
        matchArray = matchArray.concat(firstName.split(' ').map(names => makeSortString(names)));
    } else {
        matchArray.push(makeSortString(firstName))
    }
    return !matchArray.some(name => makeSortString(password.toLowerCase()).includes(name.toLowerCase()));
}