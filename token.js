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
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // let mainScript = document.createElement("script");
        // mainScript.setAttribute("src", "main.js");
        // document.body.appendChild(mainScript);
        fillData(data);
        hideSpinner();
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
    $('.card').css("display", "flex");
}