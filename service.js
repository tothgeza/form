const baseURL = 'localhost';

export function fillData(data) {
    $('#emailInput').val(data.content.receiverUsername);
    $('#familyName').html("Meghívtak a " + data.content.familyName + " családba!");
    $('#lastNameInput').val(data.content.lastName);
    $('#firstNameInput').val(data.content.firstName);
}

export function hideSpinner() {
    $('#spinner').css("display", "none");
    $('section').css("display", "block");
}

export function showForm() {
    $('.card').css("display", "flex");
}

export function showMessage(message) {
    $('.accordion').css("display", "none");
    $('.message').children('h5').html(message);
    $('.message').css("display", "block");
}

export function showSpinner() {
    $('.card').css("display", "none");
    $('.accordion').css("display", "none");
    $('#spinner').html(`<span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span> Küldés...`)
    $('#spinner').css("display", "block");
}

export function showFinalMessage(message) {
    $('#spinner').css("display", "none");
    $('.card').css("display", "flex");
    $('.message').children('h5').html(message);
    $('.message').css("display", "block");
}

export async function fecthInvitation(token) {
    const url = baseURL + '/uaa/user/check-invit-code';
    const response = await fetch(
        url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: token
        })
    } )
    return response;
}

export async function fetchSubmit(formData){
    const url = baseURL + '/uaa/user/create-parent';
    const response = await fetch(url, {
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
    return response;
}