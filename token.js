$(function() {
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('pass')
    // console.log(token);
    // const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const url = 'https://fakestoreapi.com/users/1';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
        // let mainScript = document.createElement("script");
        // mainScript.setAttribute("src", "main.js");
        // document.body.appendChild(mainScript);
    })
    .catch((error) => {
        console.log('Something went wrong.', error);
        hideSpinner();
        showForm();
        showErrorMessage();
        
    })
})

function fillData(data){
    $('#emailInput').val(data.email);
    $('#familyName').html("Meghívtak a " + data.name.lastname + " családba!");
    $('#lastNameInput').val(data.name.lastname);
    $('#firstNameInput').val(data.name.firstname);
}

function hideSpinner() {
    $('#spinner').css("display", "none");
}

function showForm() {
    $('.card').css("display", "flex");
}

function showErrorMessage() {
    $('.accordion').css("display", "none");
    $('.message').children('h5').html("Lejárt a regisztráció lehetőséged!");
    $('.message').css("display", "block");
}