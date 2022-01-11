import {
    setNameValidationMessage,
    setDateValidationMessage,
    setPhoneValidationMessage,
    setPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
    nameValidation,
    dateValidation,
    phoneValidation,
    passwordValidation,
    confirmPasswordValidation
} from './validation.js';

import {
    showSpinner,
    showFinalMessage,
    fetchSubmit
} from './service.js';

$(function () {
    $("#headingTwoButton").on('click', function () {
        setNameValidationMessage('#lastNameInput');
        setNameValidationMessage('#firstNameInput');
        setDateValidationMessage();
        if ($('#phoneInput').val() != '') {
            setPhoneValidationMessage()
        } else {
            $('#phoneInput').removeClass('is-invalid').removeClass('is-valid');
        }
        if (nameValidation('#firstNameInput') && nameValidation('#lastNameInput') && dateValidation('#dateInput') && (phoneValidation() || $('#phoneInput').val() === '')) {
            $('#collapseOne').collapse();
            $('#collapseTwo').collapse();
            $('#headingTwo').remove();
        }
    })

    $("form").submit(function (event) {
        if (passwordValidation() && confirmPasswordValidation()) {
            let formData = $(this).serializeArray()
            showSpinner();
            fetchSubmit(formData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(data => {
                showFinalMessage("Sikeres regisztráció!");
            })
            .catch((error) => {
                showFinalMessage("Sikertelen regisztráció. Kérjük, próbáld meg később!")
            })
            sessionStorage.clear();
            event.preventDefault();
        } else {
            setPasswordValidationMessage()
            setConfirmPasswordValidationMessage()
        }
    });

    var phoneMask = IMask(
        document.getElementById('phoneInput'), {
        mask: '(00) 000-0000',
    });

    $("#datepicker").datepicker().on('changeDate', function (ev) {
        $('#dateInput').change();
    });

    $('#dateInput').change(function () {
        setDateValidationMessage();
    });

    $('#firstNameInput').on('blur input', function () {
        setNameValidationMessage('#firstNameInput');
    });

    $('#lastNameInput').on('blur input', function () {
        setNameValidationMessage('#lastNameInput');
    });

    $('#phoneInput').on('blur input', function () {
        if ($('#phoneInput').val() != '') {
            setPhoneValidationMessage()
        } else {
            $('#phoneInput').removeClass('is-invalid').removeClass('is-valid');
        }
    });

    $('#passwordInput').on('blur input', function () {
        setPasswordValidationMessage();
        if ($('#confirmPasswordInput').val() !== '') {
            setConfirmPasswordValidationMessage()
        }
    });

    $('#confirmPasswordInput').on('blur input', function () {
        if (passwordValidation())
            setConfirmPasswordValidationMessage()
    })
})