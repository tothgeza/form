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
            console.log(formData);
            console.log(formData[0].value);
            showSpinner();
            fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: 'John@gmail.com',
                        username: 'johnd',
                        password: 'm38rmF$',
                        name: {
                            firstname: 'John',
                            lastname: 'Doe'
                        },
                        address: {
                            city: 'kilcoole',
                            street: '7835 new road',
                            number: 3,
                            zipcode: '12926-3874',
                            geolocation: {
                                lat: '-37.3159',
                                long: '81.1496'
                            }
                        },
                        phone: '1-570-236-7033'
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    showSuccess();
                })
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
    function showSuccess() {
        $('#spinner').css("display", "none");
        $('.card').css("display", "flex");
        $('.success').css("display", "block");
    }
})