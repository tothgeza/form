const baseURL = 'localhost'

$(function() {

    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('code')
    // console.log(token);
    sessionStorage.setItem('code', token);
    const url = baseURL + '/uaa/user/check-invit-code';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: token
        })
    } )
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    } )
    .then((data) => {
        console.log(data);
            fillData(data);
            hideSpinner();
            showForm();
    })
    .catch((error) => {
        // console.log('Something went wrong.', error);
        hideSpinner();
        showForm();
        showErrorMessage();
        
    })
})

function fillData(data){
    $('#emailInput').val(data.content.receiverUsername);
    $('#familyName').html("Meghívtak a " + data.content.familyName + " családba!");
    $('#lastNameInput').val(data.content.lastName);
    $('#firstNameInput').val(data.content.firstName);
}

function hideSpinner() {
    $('#spinner').css("display", "none");
    $('section').css("display", "block");
}

function showForm() {
    $('.card').css("display", "flex");
}

function showErrorMessage() {
    $('.accordion').css("display", "none");
    $('.message').children('h5').html("Lejárt a meghívó érvényessége! Kérjük, lépj kapcsolatba a feladóval!");
    $('.message').css("display", "block");
}