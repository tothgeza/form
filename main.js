import {
    setNameValidationMessage,
    setDateValidationMessage,
    setPhoneValidationMessage,
    setPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
    familyRelationValidation,
    familyRelationOtherValidation,
    setFamilyRelationValidationMessage,
    removeFamilyRelationValidationMessage,
    setFamilyRelationOtherValidationMessage,
    removeFamilyRelationOtherValidationMessage,
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
        if ($('#relationTypeInput').val() === "other") {
            setFamilyRelationOtherValidationMessage()
        }else {
            setFamilyRelationValidationMessage()
        }
        if ($('#phoneInput').val() !== '') {
            setPhoneValidationMessage()
        } else {
            $('#phoneInput').removeClass('is-invalid').removeClass('is-valid');
        }
        if (nameValidation('#firstNameInput') && nameValidation('#lastNameInput') && dateValidation('#dateInput') && (phoneValidation() || $('#phoneInput').val() === '')
            && familyRelationValidation() && ($('#relationTypeInput').val() !== "other" || familyRelationOtherValidation())) {
            $('#collapseOne').collapse();
            $('#collapseTwo').collapse();
            $('#headingTwo').remove();
        }
    })

    $("form").submit(function (event) {
        event.preventDefault();
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
        } else {
            setPasswordValidationMessage()
            if(passwordValidation()){
                setConfirmPasswordValidationMessage()
            }
        }
    });

    $('#relationTypeInput').change(function() {
        if ($('#relationTypeInput').val() === "other") {
            $('#otherRelationInput').show()
            $('#otherRelationInput').focus()
            removeFamilyRelationValidationMessage()
        } else {
            $('#otherRelationInput').hide()
            setFamilyRelationValidationMessage()
            removeFamilyRelationOtherValidationMessage()
        }
    })

    $('#otherRelationInput').on('blur input', function() {
        setFamilyRelationOtherValidationMessage()
    })

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