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

const baseURL = 'localhost';

$(function () {
    console.log(navigator.userAgent)

    $("#headingTwoButton").on('click', function () {
        // console.log(dateValidation('#dateInput'));
        // console.log("telszám: " + $('#phoneInput').val().replace(/[-+()\s]/g, ''))
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
            // console.log(formData);
            // console.log(formData[0].value);
            showSpinner();
            let url = baseURL + '/uaa/user/create-parent';
            fetch('https://fakestoreapi.com/users', {
            // fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        firstName: formData[1].value,
                        lastName: formData[0].value,
                        password: formData[5].value,
                        username: formData[2].value !== '' ? formData[2].value : undefined,
                        dateOfBirth: formData[3].value,
                        phoneNumber: formData[4].value !== '' ? ('+36' + formData[4].value.replace(/[-+()\s]/g, '')) : undefined,
                        code: sessionStorage.getItem('code')
                    }
                )
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(data => {
                    // console.log(data);
                    showFinalMessage('Sikeres regisztráció!');
                })
                .catch((error) => {
                    showFinalMessage('Sikertelen regisztráció. Kérjük, próbáld meg később!');
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
        setConfirmPasswordValidationMessage()
    })

    function showSpinner() {
        $('.card').css("display", "none");
        $('.accordion').css("display", "none");
        $('#spinner').html(`<span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span> Küldés...`)
        $('#spinner').css("display", "block");
    }
    function showFinalMessage(message) {
        $('#spinner').css("display", "none");
        $('.card').css("display", "flex");
        $('.message').children('h5').html(message);
        $('.message').css("display", "block");
    }

})